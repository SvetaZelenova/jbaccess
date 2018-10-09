import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiResponse, Controller} from "../common.interfaces";
import {catchError, map} from "rxjs/operators";
import {HttpErrorHandler, HandleError} from "../../core/http-error-handler.service";
import {Observable} from "rxjs/index";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ControllersService {

  private readonly handleError: HandleError;
  private readonly controllerPath: string;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('DoorsService');
    this.controllerPath = environment.API_BASE_PATH + '/controllers/';
  }
  getAllControllers(): Observable<{controllers: Controller[]}> {
    return this.http.get<ApiResponse<Controller[]>>(this.controllerPath)
      .pipe(
        map((data) => {
          const controllers = data.payload as Controller[];
          return {controllers: controllers}
        })
      )
  }
  createController(controller: Controller): Observable<Controller> {
    return this.http.post<ApiResponse<Controller>>(this.controllerPath, controller)
      .pipe(
        map( data => ({
          id: data.payload.id,
          name: data.payload.name,
          controllerId: data.payload.controllerId})),
        catchError(this.handleError<Controller>('createController', controller))
      )
  }
  updateController(controller: Controller): Observable<Controller> {
    return this.http.put<ApiResponse<Controller>>(this.controllerPath + controller.id, controller)
      .pipe(
        map(data => ({
          id: data.payload.id,
          name: data.payload.name,
          controllerId: data.payload.controllerId})),
        catchError(this.handleError<Controller>('updateController', controller))
      );
  }
  deleteController(id: number): Observable<number> {
    return this.http.delete<ApiResponse<any>>(this.controllerPath + id)
      .pipe(
        map(data => data.service.successful ? id : 0),
        catchError(this.handleError<number>('deleteController', id))
      );
  }
}
