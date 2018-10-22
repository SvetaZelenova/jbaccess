import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { CaseModifier } from './shared/case.modifier';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class CaseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.body) {
      req = req.clone({ body: this.camelToSnake(req.body) });
    }

    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          event = event.clone({ body: this.snakeToCamel(event.body) });
        }
        return event;
      })
    );
  }

  private camelToSnake(body: any) {
    return CaseModifier.decamelizeKeys(body, {});
  }
  private snakeToCamel(body: any) {
    return CaseModifier.camelizeKeys(body, {});
  }
}
