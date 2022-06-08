import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Speaker } from './speaker';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {
  API_ROOT = "https://devfest-nantes-2018-api.cleverapps.io/"

  constructor(
    private http: HttpClient,
  ) {}
  
  getSpeakers() {
    return this.http.get<Map<number, Speaker>>(`${this.API_ROOT}speakers`)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError) // then handle the error
      );
  }

  getSpeaker(id: number) {
    return this.getSpeakers().pipe(
      map(speakers => speakers.get(id)),
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
