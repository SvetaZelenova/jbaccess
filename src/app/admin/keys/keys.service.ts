import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { zip, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { KeyViewModel } from './key.viewmodel';
import {
  HandleError,
  HttpErrorHandler
} from '../../core/http-error-handler.service';
import { ApiResponse, Key, Person } from '../common.interfaces';

@Injectable({
  providedIn: 'root'
})
export class KeysService {
  private readonly handleError: HandleError;
  private readonly keysPath: string;
  private readonly personPath: string;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('KeysService');
    this.keysPath = environment.API_BASE_PATH + '/keys/';
    this.personPath = environment.API_BASE_PATH + '/person/';
  }

  loadKeys(): Observable<{ keys: KeyViewModel[]; persons: Person[] }> {
    return zip(
      this.http.get<ApiResponse<Key[]>>(this.keysPath),
      this.http.get<ApiResponse<Person[]>>(this.personPath)
    ).pipe(
      map(data => {
        const keys = data[0].payload as Key[];
        const persons = data[1].payload as Person[];
        const res = Array<KeyViewModel>();
        keys.forEach(k => {
          res.push({
            id: k.id,
            name: k.name,
            accessKey: k.accessKey,
            personId: k.personId,
            person: persons.find(p => p.id === k.personId)
          });
        });
        return { keys: res, persons: persons };
      })
    );
  }
  createKey(key: KeyViewModel): Observable<KeyViewModel> {
    return this.http.post<ApiResponse<Key>>(this.keysPath, key).pipe(
      map(data => ({
        id: data.payload.id,
        name: data.payload.name,
        accessKey: data.payload.accessKey,
        personId: data.payload.personId,
        person: key.person
      })),
      catchError(this.handleError<KeyViewModel>('createKey', key))
    );
  }
  updateKey(key: KeyViewModel): Observable<KeyViewModel> {
    return this.http.put<ApiResponse<Key>>(this.keysPath + key.id, key).pipe(
      map(data => ({
        id: data.payload.id,
        name: data.payload.name,
        accessKey: data.payload.accessKey,
        personId: data.payload.personId,
        person: key.person
      })),
      catchError(this.handleError<KeyViewModel>('updateKey', key))
    );
  }
  deleteKey(id: number): Observable<number> {
    return this.http.delete<ApiResponse<any>>(this.keysPath + id).pipe(
      map(data => (data.service.successful ? id : 0)),
      catchError(this.handleError<number>('deleteKey', id))
    );
  }
}
