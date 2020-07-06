import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {
  private readonly apiBaseUrl = 'http://www.mocky.io/v2/5dc3c053300000540034757b';
  constructor(private http: HttpClient) { }

  getResponse(): any {
    return this.http
      .get<Array<{}>>(this.apiBaseUrl)
      .pipe(map(data => data), catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any): any {
    return observableThrowError(res.error || 'Server error');
  }
}
