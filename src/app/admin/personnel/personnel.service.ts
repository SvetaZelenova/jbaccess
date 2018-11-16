import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  HandleError,
  HttpErrorHandler
} from '../../core/http-error-handler.service';
import { ApiResponse, Key, Person, Role } from '../common.interfaces';
import { Relation } from '../../shared/relations/relations.component';
import { RolesService } from '../roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly handleError: HandleError;
  private readonly personPath: string;
  private readonly rolesPath: string;
  constructor(
    private http: HttpClient,
    private rolesService: RolesService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('PersonService');
    this.personPath = environment.API_BASE_PATH + '/person/';
    this.rolesPath = environment.API_BASE_PATH + '/roles/';
  }
  getAllPersonnel(): Observable<Person[]> {
    return this.http.get<ApiResponse<Person[]>>(this.personPath).pipe(
      map(data => {
        return data.payload;
      })
    );
  }
  createPerson(person: Person): Observable<Person> {
    return this.http.post<ApiResponse<Person>>(this.personPath, person).pipe(
      map(data => ({
        id: data.payload.id,
        name: data.payload.name
      })),
      catchError(this.handleError<Person>('createPerson', person))
    );
  }
  updatePerson(person: Person): Observable<Person> {
    return this.http
      .put<ApiResponse<Person>>(this.personPath + person.id, person)
      .pipe(
        map(data => ({
          id: data.payload.id,
          name: data.payload.name
        })),
        catchError(this.handleError<Person>('updatePerson', person))
      );
  }
  deletePerson(id: number): Observable<number> {
    return this.http.delete<ApiResponse<any>>(this.personPath + id).pipe(
      map(data => (data.service.successful ? id : 0)),
      catchError(this.handleError<number>('deletePerson', id))
    );
  }
  getPerson(id: number): Observable<Person> {
    return this.http.get<ApiResponse<Person>>(this.personPath + id).pipe(
      map(data => ({
        id: data.payload.id,
        name: data.payload.name
      })),
      catchError(this.handleError<Person>('getPerson', { id, name }))
    );
  }
  getPersonKeys(id: number): Observable<{ keys: Key[] }> {
    return this.http
      .get<ApiResponse<Key[]>>(this.personPath + id + '/keys')
      .pipe(
        map(data => {
          const keys = data.payload as Key[];
          return { keys: keys };
        })
      );
  }

  updateRolePersonRelation(relation: Relation): Observable<boolean> {
    const url =
      this.personPath +
      relation.parentId +
      '/roles/' +
      relation.relatedEntityId;

    return relation.connected
      ? this.http.put<ApiResponse<any>>(url, null).pipe(
          map(() => true),
          catchError(
            this.handleError<boolean>('updateRolePersonRelation', false)
          )
        )
      : this.http.delete<ApiResponse<any>>(url).pipe(
          map(() => false),
          catchError(
            this.handleError<boolean>('updateRolePersonRelation', true)
          )
        );
  }

  getRolesRelationsByPersonId(id: number): Observable<Relation[]> {
    return zip(
      this.http.get<ApiResponse<Role[]>>(this.personPath + id + '/roles'),
      this.rolesService.getAllRoles()
    ).pipe(
      map(data => {
        const relations = Array<Relation>();
        const personRoles = data[0].payload;
        const roles = data[1];
        roles.forEach(role => {
          relations.push({
            parentId: id,
            relatedEntityId: role.id,
            relatedEntityDisplayName: role.id + ': ' + role.name,
            updating: false,
            connected: personRoles.some(d => d.id === role.id)
          });
        });
        return relations;
      }),
      catchError(
        this.handleError<Relation[]>('getRolesRelationsByPersonId', [])
      )
    );
  }
}
