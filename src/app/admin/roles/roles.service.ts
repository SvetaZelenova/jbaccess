import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Role } from '../common.interfaces';
import { catchError, map } from 'rxjs/operators';
import {
  HandleError,
  HttpErrorHandler
} from '../../core/http-error-handler.service';
import { Observable } from 'rxjs/index';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private readonly handleError: HandleError;
  private readonly rolePath: string;
  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('RolesService');
    this.rolePath = environment.API_BASE_PATH + '/roles/';
  }
  getAllRoles(): Observable<Role[]> {
    return this.http
      .get<ApiResponse<Role[]>>(this.rolePath)
      .pipe(map(data => data.payload));
  }
  createRole(role: Role): Observable<Role> {
    return this.http.post<ApiResponse<Role>>(this.rolePath, role).pipe(
      map(data => ({
        id: data.payload.id,
        name: data.payload.name
      })),
      catchError(this.handleError<Role>('createRole', role))
    );
  }
  updateRole(role: Role): Observable<Role> {
    return this.http.put<ApiResponse<Role>>(this.rolePath + role.id, role).pipe(
      map(data => ({
        id: data.payload.id,
        name: data.payload.name
      })),
      catchError(this.handleError<Role>('updateRole', role))
    );
  }
  deleteRole(id: number): Observable<number> {
    return this.http.delete<ApiResponse<any>>(this.rolePath + id).pipe(
      map(data => (data.service.successful ? id : 0)),
      catchError(this.handleError<number>('deleteDoor', id))
    );
  }
}
