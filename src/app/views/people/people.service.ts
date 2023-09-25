import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { People } from './people.model';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private apiUrl: string = 'http://localhost:5077/api/People';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAll(): Observable<People[]> {
    return this.http.get<People[]>(this.apiUrl, { headers: this.headers });
  }

  getAllColaborator(): Observable<People[]> {
    return this.http.get<People[]>(`${this.apiUrl}/GetCollaborator`, { headers: this.headers });
  }

  getById(id: number): Observable<People[]> {
    return this.http
      .get<People[]>(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  update(department: People): Observable<People[]> {
    return this.http
      .put<People[]>(`${this.apiUrl}/${department.id}`, department, {
        headers: this.headers,
      })
      .pipe(catchError(this.error));
  }

  save(department: People): Observable<People[]> {
    return this.http
      .post<People[]>(`${this.apiUrl}`, department, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  Remove(id?: number): Observable<People[]> {
    return this.http
      .delete<People[]>(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(catchError(this.error));
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
