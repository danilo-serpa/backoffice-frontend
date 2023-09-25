import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { People } from './people.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private urlPeople: string = `${environment.urlAPI}/api/People`;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAll(): Observable<People[]> {
    return this.http.get<People[]>(this.urlPeople, { headers: this.headers });
  }

  getAllColaborator(): Observable<People[]> {
    return this.http.get<People[]>(`${this.urlPeople}/GetCollaborator`, {
      headers: this.headers,
    });
  }

  getById(id: number): Observable<People[]> {
    return this.http
      .get<People[]>(`${this.urlPeople}/${id}`, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  update(people: People): Observable<People[]> {
    return this.http
      .put<People[]>(`${this.urlPeople}/${people.id}`, people, {
        headers: this.headers,
      })
      .pipe(catchError(this.error));
  }

  save(people: People): Observable<People[]> {
    return this.http
      .post<People[]>(`${this.urlPeople}`, people, { headers: this.headers })
      .pipe(catchError(this.error));
  }

  Remove(id?: number): Observable<People[]> {
    return this.http
      .delete<People[]>(`${this.urlPeople}/${id}`, { headers: this.headers })
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
