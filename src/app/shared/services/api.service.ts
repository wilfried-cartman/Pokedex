import { HttpHeaders, HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseApiResourceUrl: string;
  httpOptions = {
    headers: new HttpHeaders
  };

  constructor(private http: HttpClient) {
    this.baseApiResourceUrl = environment.apiUrl;
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }
  }
  
  get<T>(urlEndpoint: string): Observable<T | HttpErrorResponse> {
    return this.http
      .get<T>(urlEndpoint, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", {...error});
    } else {

      if (error) {
        console.error(
          `Backend returned code ${error.status}, ` + `body was: ${error.error}`
        );
      }
    }
    return new Observable();
  }
}

