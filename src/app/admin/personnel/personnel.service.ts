import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {environment} from '../../../environments/environment';
import {HandleError, HttpErrorHandler} from '../../core/http-error-handler.service';
import {ApiResponse, Person} from '../common.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private readonly handleError: HandleError;
  private readonly personPath: string;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PersonService');
    this.personPath = environment.API_BASE_PATH + '/person/';
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
}
