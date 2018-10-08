import { Injectable } from '@angular/core';
import {ApiResponse, Door} from "../common.interfaces";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {HttpErrorHandler, HandleError} from "../../core/http-error-handler.service";
import {catchError, map} from "rxjs/operators";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class DoorsService {

  private readonly handleError: HandleError;
  private readonly doorPath: string;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('DoorsService');
    this.doorPath = environment.API_BASE_PATH + '/doors/';
  }
  getAllDoors(): Observable<{doors: Door[]}> {
    return this.http.get<ApiResponse<Door[]>>(this.doorPath)
      .pipe(
        map((data) => {
          const doors = data.payload as Door[];
          return {doors: doors}
        })
      )
  }
  createDoor(door: Door): Observable<Door> {
    return this.http.post<ApiResponse<Door>>(this.doorPath, door)
      .pipe(
        map( data => ({
          id: data.payload.id,
          name: data.payload.name,
          accessId: data.payload.accessId})),
        catchError(this.handleError<Door>('createDoor', door))
      )
  }
  updateDoor(door: Door): Observable<Door> {
    return this.http.put<ApiResponse<Door>>(this.doorPath + door.id, door)
      .pipe(
        map(data => ({
          id: data.payload.id,
          name: data.payload.name,
          accessId: data.payload.accessId})),
        catchError(this.handleError<Door>('updateDoor', door))
      );
  }
  deleteDoor(id: number): Observable<number> {
    return this.http.delete<ApiResponse<any>>(this.doorPath + id)
      .pipe(
        map(data => data.service.successful ? id : 0),
        catchError(this.handleError<number>('deleteDoor', id))
      );
  }
}
