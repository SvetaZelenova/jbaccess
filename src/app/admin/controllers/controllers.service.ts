import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import {
  HandleError,
  HttpErrorHandler
} from '../../core/http-error-handler.service';
import { Observable, zip } from 'rxjs';

import { ApiResponse, Controller, Door } from '../common.interfaces';
import { environment } from '../../../environments/environment';
import { DoorsService } from '../doors/doors.service';
import { Relation } from '../../shared/relations/relations.component';

@Injectable({
  providedIn: 'root'
})
export class ControllersService {
  private readonly handleError: HandleError;
  private readonly controllerPath: string;
  constructor(
    private http: HttpClient,
    private doorsService: DoorsService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('ControllersService');
    this.controllerPath = environment.API_BASE_PATH + '/controllers/';
  }
  getDoorsByControllerId(id: number): Observable<Door[]> {
    return this.http
      .get<ApiResponse<Door[]>>(this.controllerPath + id + '/doors')
      .pipe(
        map(response => response.payload),
        catchError(this.handleError<Door[]>('getDoorsByControllerId', []))
      );
  }
  updateDoorRelation(relation: Relation): Observable<boolean> {
    const url =
      this.controllerPath +
      relation.parentId +
      '/doors/' +
      relation.relatedEntityId;
    return relation.connected
      ? this.http.put<ApiResponse<any>>(url, null).pipe(
          map(() => true),
          catchError(this.handleError<boolean>('updateDoorRelation', false))
        )
      : this.http.delete<ApiResponse<any>>(url).pipe(
          map(() => false),
          catchError(this.handleError<boolean>('updateDoorRelation', true))
        );
  }
  getDoorsRelationsByControllerId(id: number): Observable<Relation[]> {
    return zip(
      this.doorsService.getAllDoors(),
      this.getDoorsByControllerId(id)
    ).pipe(
      map(data => {
        const relations = Array<Relation>();
        const doors = data[0];
        const relatedDoors = data[1];
        doors.forEach(door => {
          relations.push({
            parentId: id,
            relatedEntityId: door.id,
            relatedEntityDisplayName: door.id + ': ' + door.name,
            inProgress: false,
            connected: relatedDoors.some(d => d.id === door.id)
          });
        });
        return relations;
      }),
      catchError(
        this.handleError<Relation[]>('getDoorsRelationsByControllerId', [])
      )
    );
  }
  getAllControllers(): Observable<Controller[]> {
    return this.http.get<ApiResponse<Controller[]>>(this.controllerPath).pipe(
      map(data => {
        return data.payload as Controller[];
      })
    );
  }
  createController(controller: Controller): Observable<Controller> {
    return this.http
      .post<ApiResponse<Controller>>(this.controllerPath, controller)
      .pipe(
        map(data => ({
          id: data.payload.id,
          name: data.payload.name,
          controllerId: data.payload.controllerId
        })),
        catchError(this.handleError<Controller>('createController', controller))
      );
  }
  updateController(controller: Controller): Observable<Controller> {
    return this.http
      .put<ApiResponse<Controller>>(
        this.controllerPath + controller.id,
        controller
      )
      .pipe(
        map(data => ({
          id: data.payload.id,
          name: data.payload.name,
          controllerId: data.payload.controllerId
        })),
        catchError(this.handleError<Controller>('updateController', controller))
      );
  }
  deleteController(id: number): Observable<number> {
    return this.http.delete<ApiResponse<any>>(this.controllerPath + id).pipe(
      map(data => (data.service.successful ? id : 0)),
      catchError(this.handleError<number>('deleteController', id))
    );
  }
}
