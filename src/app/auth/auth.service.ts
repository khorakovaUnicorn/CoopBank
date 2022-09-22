import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";

import {User} from "./user.model";

export interface AuthResponseData {
  login: string;
  name: string;
  roles: [string];
  token: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);


  constructor(private http: HttpClient) {
  }

  // Headers needed for login GET method: Authorization: base64(login:password)
  userLogin(encoded_login_password: string) {
    return this.http
      .get<AuthResponseData>(
        'http://localhost:8000/login',
        {headers: new HttpHeaders({Authorization: "Basic " + encoded_login_password})},
      )
      .pipe(
        catchError(this.handleError)
      )
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




