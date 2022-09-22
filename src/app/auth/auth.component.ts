import {Component, OnInit} from '@angular/core';
import {AuthResponseData, AuthService} from "./auth.service";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  error = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const login = form.value.login;
    const password = form.value.password;
    const encoded = btoa(login + ":" + password);

    let authObs: Observable<AuthResponseData>

    authObs = this.authService.userLogin(encoded)

    authObs.subscribe(
      resData => {
        console.log(resData)
        this.error = null;
      },
      error => {
        // this.error = error.message;
        if (error.message === "username or password incorrect") {
          this.error = "Nesprávné přihlašovací údaje"
        } else if (error.message === "Connection refused!") {
          this.error = "Nelze se připojit k serveru";
        } else {
          this.error = "Neznámý error"
        }
      }
    )
  }


}
