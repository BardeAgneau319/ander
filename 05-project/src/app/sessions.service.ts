import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Session } from './session';

import { catchError, map, mapTo, pluck, retry, toArray } from 'rxjs/operators';
import { from, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  sessions: Array<Session> = [];

  API_ROOT = "https://devfest-nantes-2018-api.cleverapps.io/"

  constructor(
    private http: HttpClient,
  ) { }

  getSessions() {
    return this.http.get<Map<string, Session>>(`${this.API_ROOT}sessions`)
      .pipe(
        map(Object.values),
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError) // then handle the error
      );
  }

  clearSessions() {
    this.sessions = [];
    return this.sessions;
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend return code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
