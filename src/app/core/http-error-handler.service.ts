import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import {Observable, throwError} from 'rxjs';
import {MessageService} from 'primeng/api';
import {CaseModifier} from '../shared/case.modifier'
import {ApiResponse, ServiceObject} from '../admin/common.interfaces';

function isApiResponse(obj: any): obj is ApiResponse<any> {
  return 'payload' in obj && 'service' in obj;
}

export interface FormError {
  field: string
  errors: Array<string>
}
export interface AppError {
  title: string
  message: string
  validationErrors: any
  formErrors: Array<FormError>
  serviceObject: ServiceObject
}
/** Type of the handleError function returned by HttpErrorHandler.createHandleError */
export type HandleError =
  <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

/** Handles HttpClient errors */
@Injectable()
export class HttpErrorHandler {
  constructor(private messageService: MessageService) { }

  /** Create curried handleError function that already knows the service name */
  createHandleError = (serviceName = '') => <T>
  (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result);

  /**
   * Returns a function that handles Http operation failures.
   * This error handler lets the app continue to run as if no error occurred.
   * @param serviceName = name of the data service that attempted the operation
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (serviceName = '', operation = 'operation', result = {} as T) {

    return (error: HttpErrorResponse): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      if (isApiResponse(error.error)) {
        const errorObj = CaseModifier.camelizeKeys(error.error.service) as ServiceObject;
        const appError = this.processError(errorObj, serviceName, operation);
        return throwError(appError);
      }
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message :
        `server returned code ${error.status} with body "${JSON.stringify(error.error)}"`;
      this.messageService.add({
        severity: 'error',
        summary: `${serviceName}: ${operation} failed`,
        detail: `${JSON.stringify(error.error)}`,
        sticky: true
      });

      // Let the app keep running by returning a safe result.
      return throwError(error.error ? error.error : error);
      // return of( result );
    };

  }
  processError(err: ServiceObject, serviceName: string, operation: string): AppError {
    const formErrors: Array<FormError> = [];
    for (const key in err.validationErrors) {
      if (err.validationErrors.hasOwnProperty(key)) {
        formErrors.push({
          field: key,
          errors: err.validationErrors[key]
        })
      }
    }
    return {
      title: `${serviceName}: ${operation} failed`,
      message: '',
      formErrors: formErrors,
      validationErrors: err.validationErrors,
      serviceObject: err
    }
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
