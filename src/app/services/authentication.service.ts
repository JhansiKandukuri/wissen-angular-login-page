import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

const API_URL = 'https://reqres.in/api/login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  authtoken: string;

  constructor(private http: HttpClient) {}

  setAuthResponse(data) {
    this.authtoken = data.token;

    if (typeof Storage !== 'undefined') {
      sessionStorage.setItem('authData', JSON.stringify(data));
    }
  }

  clearAuthData() {
    this.authtoken = '';

    if (typeof Storage !== 'undefined') {
      sessionStorage.removeItem('authInfo');
    }
  }

  // modify the return type to properly use the full response
  login(username: string, password: string): Observable<any> {
    // implement here
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(API_URL, { username, password }, httpOptions).pipe(
      map((res) => {
        this.setAuthResponse(res);
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error);
      })
    );
  }
}