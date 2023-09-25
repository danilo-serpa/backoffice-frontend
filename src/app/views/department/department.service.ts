import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Department } from './department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private apiUrl: string = 'http://localhost:5077/api/Department';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAll(): Observable<Department[]> {
    return this.http
      .get<Department[]>(this.apiUrl, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  getById(id: number): Observable<Department[]> {
    return this.http
      .get<Department[]>(`${this.apiUrl}/${id}`, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  update(department: Department): Observable<Department[]> {
    return this.http
      .put<Department[]>(`${this.apiUrl}/${department.id}`, department, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  save(department: Department): Observable<Department[]> {
    return this.http
      .post<Department[]>(`${this.apiUrl}`, department, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  Remove(id?: number): Observable<Department[]> {
    return this.http
      .delete<Department[]>(`${this.apiUrl}/${id}`, { headers: this.headers })
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
