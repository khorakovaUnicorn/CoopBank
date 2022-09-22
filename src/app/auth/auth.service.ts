import {Injectable, OnInit} from "@angular/core";
import {BehaviorSubject, catchError, Observable, Subscription, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

import {User} from "./user.model";

export interface AuthResponseData {
  login: string;
  name: string;
  roles: [string];
  token: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user: User;

  constructor(private http: HttpClient, private router: Router) {
  }

  // Headers needed for login GET method: Authorization: Basic base64(login:password)
  userLogin(encoded_login_password: string): Observable<AuthResponseData> {
    return this.http
      .get<AuthResponseData>(
        'http://localhost:8000/login',
        {headers: new HttpHeaders({Authorization: "Basic " + encoded_login_password})},
      )
      .pipe(
        catchError(this.handleError),
        tap(userData => {
          this.user = userData;
        })
      )
  }

  userLogout() {
    this.user = null;
    this.router.navigate(['/auth']);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Connection refused!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }
    if (errorRes.error.error === "username or password incorrect") {
      errorMessage = errorRes.error.error;
    }
    return throwError(() => new Error(errorMessage));
  }

}




