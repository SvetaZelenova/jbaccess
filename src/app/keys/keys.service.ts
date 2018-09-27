import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {zip, Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {environment} from '../../environments/environment'
import { Key } from './key'
import { Person } from '../personnel/person'
import { PersonnelService as PersonnelServiceAPI,
  KeysService as KeysServiceAPI,
  KeyOutDto,
} from '@anatolyua/jbaccess-client-open-api';
import {HandleError, HttpErrorHandler} from '../core/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  private handleError: HandleError;
  private basePath: string;
  constructor(
    private keysService: KeysServiceAPI,
    private  personnelService: PersonnelServiceAPI,
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
      this.handleError = httpErrorHandler.createHandleError('KeysService');
      this.basePath = environment.API_BASE_PATH + '/keys';
  }

  loadKeys(): Observable<{keys: Key[], persons: Person[]}> {
    return zip(this.http.get<any>(this.basePath), this.personnelService.getAllPersonnel())
      .pipe(
        tap(console.log),
        map((data) => {
          const keys = data[0].payload as KeyOutDto[];
          const persons = data[1].payload as Person[];
          const res = Array<Key>();
          console.log(keys);
          keys.forEach(k => {
            res.push({
              id: k.id,
              name: k.name,
              accessKey: k.accessKey,
              person: persons.find(p => p.id === k.personId)
            })
          });
          return {keys: res, persons: persons};
        })
      );
  }
  createKey(key: Key): Observable<Key> {
    return this.http.post(this.basePath,
      {access_key: key.accessKey, name: key.name, person_id: key.person.id}
      )
      .pipe(
        map((data: any) => ({
          id: data.payload.id,
          name: data.payload.name,
          accessKey: data.payload.accessKey,
          person: key.person})),
        catchError(this.handleError<Key>('createKey', key))
      );
  }
}
