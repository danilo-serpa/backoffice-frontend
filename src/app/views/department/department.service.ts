import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Department } from './department.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private urlDepartment: string = `${environment.urlAPI}/api/Department`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Department[]> {
    return this.http
      .get<Department[]>(this.urlDepartment)
      .pipe(catchError(this.error));
  }

  getById(id: number): Observable<Department[]> {
    return this.http
      .get<Department[]>(`${this.urlDepartment}/${id}`)
      .pipe(catchError(this.error));
  }

  update(department: Department): Observable<Department[]> {
    return this.http
      .put<Department[]>(`${this.urlDepartment}/${department.id}`, department)
      .pipe(catchError(this.error));
  }

  save(department: Department): Observable<Department[]> {
    return this.http
      .post<Department[]>(`${this.urlDepartment}`, department)
      .pipe(catchError(this.error));
  }

  Remove(id?: number): Observable<Department[]> {
    return this.http
      .delete<Department[]>(`${this.urlDepartment}/${id}`)
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
