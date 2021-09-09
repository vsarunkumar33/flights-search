import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable()

export class FlightSearchService {

  constructor(
    private http: HttpClient
  ) {}

  getFlightList(): Observable<any> {
    return this.http.get("./assets/mockdata/data.json");
  }

  getPlaceList(): Observable<any> {
    return this.http.get("./assets/mockdata/place.json");
  }

  // Error handling
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = error.error;
    }
    return throwError(errorMessage);
  }

}
