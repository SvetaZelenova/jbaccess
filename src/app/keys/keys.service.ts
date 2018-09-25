import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import {zip, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {environment} from '../../environments/environment'
import { Key } from './key'
import { Person } from '../personnel/person'
import { PersonnelService as PersonnelServiceAPI,
  KeysService as KeysServiceAPI,
  KeyOutDto,
  PersonOutDto } from '@anatolyua/jbaccess-client-open-api';

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  constructor(private keysService: KeysServiceAPI, private  personnelService: PersonnelServiceAPI, private http: HttpClient) { }

  loadKeys(): Observable<{keys: Key[], persons: Person[]}> {
    return zip(this.keysService.getAllKeys(), this.personnelService.getAllPersonnel())
      .pipe(
        map((data) => {
          const keys = data[0].payload as KeyOutDto[];
          const persons = data[1].payload as Person[];
          const res = Array<Key>();
          keys.forEach(k => {
            res.push({
              id: k.id,
              name: k.name,
              accessKey: k.access_key,
              person: persons.find(p => p.id === k.person_id)
            })
          });
          return {keys: res, persons: persons};
        })
      );
  }
  createKey(key: Key): Observable<Key> {
    return this.http.post(environment.API_BASE_PATH + '/keys',
      {access_key: key.accessKey, name: key.name, person_id: key.person.id},
      {withCredentials: true})
      .pipe(
        catchError(this.handleError),
        map((data: any) => ({
          id: data.payload.id,
          name: data.payload.name,
          accessKey: data.payload.access_key,
          person: key.person}))
      );
  }
  private handleError(error) {
    console.log('---------- -------- ---------------');
    console.log(error);
    console.log('---------- -------- ---------------');
    return throwError('Errors happen');
  };
}
