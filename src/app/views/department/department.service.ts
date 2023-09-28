import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Department } from './department.model';
import { environment } from '../../../environments/environment';
import { BaseService } from 'src/app/shared/service/baseService';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends BaseService {
  private urlDepartment: string = `${environment.urlAPI}/api/Department`;

  constructor(private http: HttpClient) {
    super();
  }

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
}
