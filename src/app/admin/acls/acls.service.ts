import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import {
  HandleError,
  HttpErrorHandler
} from '../../core/http-error-handler.service';
import { Acl, ApiResponse, Pattern, ResolvedAcl } from '../common.interfaces';

export enum AclType {
  Allow = 1,
  Disallow = 2
}

export enum AclTarget {
  Person = 'person',
  Role = 'roles'
}

@Injectable({
  providedIn: 'root'
})
export class AclsService {
  private readonly basePath: string;
  private readonly handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.basePath = environment.API_BASE_PATH;
    this.handleError = httpErrorHandler.createHandleError('AclsService');
  }

  getAcls(target: AclTarget, targetId: number): Observable<Acl[]> {
    return this.http
      .get<ApiResponse<Acl[]>>(`${this.basePath}/${target}/${targetId}/acls`)
      .pipe(
        map(data => data.payload),
        catchError(this.handleError<Acl[]>('getAcl', []))
      );
  }

  addAcl(
    target: AclTarget,
    aclType: AclType,
    targetId: number,
    placeId: number
  ): Observable<Acl> {
    const url = `${this.basePath}/${target}/${targetId}/${
      aclType === AclType.Allow ? 'allow' : 'deny'
    }/${placeId}`;

    return this.http.put<ApiResponse<Acl>>(url, null).pipe(
      map(response => response.payload),
      catchError(this.handleError<Acl>('addAcl', null))
    );
  }

  deleteAcl(id: number): Observable<boolean> {
    return this.http
      .delete<ApiResponse<any>>(`${this.basePath}/acls/${id}`)
      .pipe(
        map(data => data.service.successful),
        catchError(this.handleError<boolean>('deleteAcl', false))
      );
  }

  getPatterns(id: number): Observable<Pattern[]> {
    return this.http
      .get<ApiResponse<Pattern[]>>(`${this.basePath}/${id}/patterns`)
      .pipe(
        map(data => data.payload),
        catchError(this.handleError<Pattern[]>('getPatterns', []))
      );
  }

  createPattern(aclId: number, pattern: Pattern): Observable<Pattern> {
    return this.http
      .post<ApiResponse<Pattern>>(
        `${this.basePath}/${aclId}/patterns/`,
        pattern
      )
      .pipe(
        map(data => data.payload),
        catchError(this.handleError<Pattern>('createPattern', null))
      );
  }

  updatePattern(id: number, pattern: Pattern): Observable<Pattern> {
    return this.http
      .put<ApiResponse<Pattern>>(
        `${this.basePath}/acls/patterns/${id}`,
        pattern
      )
      .pipe(
        map(data => data.payload),
        catchError(this.handleError<Pattern>('updatePattern', null))
      );
  }

  deletePattern(id: number): Observable<boolean> {
    return this.http
      .delete<ApiResponse<any>>(`${this.basePath}/acls/patterns/${id}`)
      .pipe(
        map(data => data.service.successful),
        catchError(this.handleError<boolean>('deletePattern', false))
      );
  }

  resolveAcls(controllerId: any): Observable<ResolvedAcl> {
    return this.http
      .get<ApiResponse<ResolvedAcl>>(
        `${this.basePath}/controllers/${controllerId}/resolve-acls`
      )
      .pipe(
        map(data => data.payload),
        catchError(this.handleError<ResolvedAcl>('resolve', null))
      );
  }
}
