import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { LoginUser, RegisterUser, UserToken } from './account.model';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private urlToken: string = `${environment.urlAPI}/api/token`;

  constructor(
    private http: HttpClient
  ) {}

  login(loginUser: LoginUser): Observable<UserToken> {
    return this.http
      .post<UserToken>(`${this.urlToken}/LoginUser`, loginUser)
      .pipe(catchError(this.error));
  }

  register(registerUser: RegisterUser): Observable<void> {
    return this.http
      .post<void>(`${this.urlToken}/CreateUser`, registerUser)
      .pipe(catchError(this.error));
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return  !!token;
  }

  error(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
