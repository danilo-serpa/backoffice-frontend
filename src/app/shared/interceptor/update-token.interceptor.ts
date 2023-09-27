import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UpdateTokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = localStorage.get('token');

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        ContentType: 'application/json'
      },
    });

    return next.handle(request);
  }
}
