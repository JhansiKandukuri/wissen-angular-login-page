import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

const user_api = 'https://reqres.in/api/unknown';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}
  getUser(): Observable<any> {
    return this.http
      .get(user_api, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer' + this.authService.authtoken,
        }),
      })
      .pipe(
        map((res: any) => res.data),
        catchError((error: HttpErrorResponse) => {
          return throwError(new Error('No Record Found'));
        })
      );
  }
}
