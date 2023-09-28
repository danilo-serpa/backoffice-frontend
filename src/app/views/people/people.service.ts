import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { People } from './people.model';
import { environment } from 'src/environments/environment';
import { BaseService } from 'src/app/shared/service/baseService';

@Injectable({
  providedIn: 'root',
})
export class PeopleService extends BaseService {
  private urlPeople: string = `${environment.urlAPI}/api/People`;

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<People[]> {
    return this.http.get<People[]>(this.urlPeople);
  }

  getAllColaborator(): Observable<People[]> {
    return this.http.get<People[]>(`${this.urlPeople}/GetCollaborator`);
  }

  getById(id: number): Observable<People[]> {
    return this.http
      .get<People[]>(`${this.urlPeople}/${id}`)
      .pipe(catchError(this.error));
  }

  update(people: People): Observable<People[]> {
    return this.http
      .put<People[]>(`${this.urlPeople}/${people.id}`, people)
      .pipe(catchError(this.error));
  }

  save(people: People): Observable<People[]> {
    return this.http
      .post<People[]>(`${this.urlPeople}`, people)
      .pipe(catchError(this.error));
  }

  Remove(id?: number): Observable<People[]> {
    return this.http
      .delete<People[]>(`${this.urlPeople}/${id}`)
      .pipe(catchError(this.error));
  }
}
