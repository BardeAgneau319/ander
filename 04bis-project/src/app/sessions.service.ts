import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { SessionResponse } from './session';
import { Speaker } from './speaker';
import { SpeakersService } from './speakers.service';


@Injectable({
  providedIn: 'root'
})
export class SessionsService {
  API_ROOT = "https://devfest-nantes-2018-api.cleverapps.io/"

  constructor(
    private http: HttpClient,
    private speakersService: SpeakersService,
  ) { }

  getSessions() {
    return forkJoin([
      this.http.get<Map<number, SessionResponse>>(`${this.API_ROOT}sessions`),
      this.speakersService.getSpeakers(),
    ]).pipe(
      map<[Map<number, SessionResponse>, Map<number, Speaker>], [SessionResponse[], Map<number, Speaker>]>(([sessions, speakers]) => [Object.values(sessions), speakers]),
      map(([sessions, speakers]) => {
        return sessions.map(session => {
          return {
            ...session,
            speakers: session.speakers?.map(id => speakers[id]),
          };
        });
      }),
      retry(2), // retry a failed request up to 2 times
      catchError(this.handleError) // then handle the error
    );
  }

  getSessionById(id: number) {
    return this.getSessions().pipe(
      map(sessions => sessions.find(s => s.id === id))
    );
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
