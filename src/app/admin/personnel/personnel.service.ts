import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {Observable, zip} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {HandleError, HttpErrorHandler} from '../../core/http-error-handler.service';
import {ApiResponse, Key, Person, Role} from '../common.interfaces';
import {RoleViewModel} from "../person-detail/role.viewmodel";
import {KeyViewModel} from "../keys/key.viewmodel";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly handleError: HandleError;
  private readonly personPath: string;
  private readonly rolesPath: string;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PersonService');
    this.personPath = environment.API_BASE_PATH + '/person/';
    this.rolesPath = environment.API_BASE_PATH + '/roles/'
  }
  getAllPersonnel(): Observable<{persons: Person[]}> {
    return this.http.get<ApiResponse<Person[]>>(this.personPath)
      .pipe(
        map((data) => {
          const persons = data.payload as Person[];
          return {persons: persons}
        })
      )
  }
  createPerson(person: Person): Observable<Person> {
    return this.http.post<ApiResponse<Person>>(this.personPath, person)
      .pipe(
        map( data => ({
          id: data.payload.id,
          name: data.payload.name})),
        catchError(this.handleError<Person>('createPerson', person))
      )
  }
  updatePerson(person: Person): Observable<Person> {
    return this.http.put<ApiResponse<Person>>(this.personPath + person.id, person)
      .pipe(
        map(data => ({
          id: data.payload.id,
          name: data.payload.name})),
        catchError(this.handleError<Person>('updatePerson', person))
      );
  }
  deletePerson(id: number): Observable<number> {
    return this.http.delete<ApiResponse<any>>(this.personPath + id)
      .pipe(
        map(data => data.service.successful ? id : 0),
        catchError(this.handleError<number>('deletePerson', id))
      );
  }
  getPerson(id: number): Observable<Person> {
    return this.http.get<ApiResponse<Person>>(this.personPath + id)
      .pipe(
        map(data => ({
          id: data.payload.id,
          name: data.payload.name})),
        catchError(this.handleError<Person>('getPerson', {id, name}))
      );
  }
  getPersonKeys(id: number): Observable<{keys: Key[]}> {
    return this.http.get<ApiResponse<Key[]>>(this.personPath + id + '/keys')
      .pipe(
        map((data) => {
          const keys = data.payload as Key[];
          return {keys: keys}
        })
      )
  }
  getPersonRoles(id: number): Observable<{roles: RoleViewModel[]}> {
    return zip(this.http.get<ApiResponse<Role[]>>(this.personPath + id + '/roles'), this.http.get<ApiResponse<Role[]>>(this.rolesPath))
      .pipe(
        map((data) => {
          const personRoles = data[0].payload as Role[];
          const allRoles = data[1].payload as Role[];
          const res = Array<RoleViewModel>();
          allRoles.forEach(role => {
            if (personRoles.indexOf(role) !== -1) {
              res.push({
                id: role.id,
                name: role.name,
                checked: true
              })
            } else {
              res.push({
                id: role.id,
                name: role.name,
                checked: false
              })
            }
          });
          return {roles: res}
        })
      )
  }
}
