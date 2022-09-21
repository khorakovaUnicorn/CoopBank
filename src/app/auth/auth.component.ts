import { Component, OnInit } from '@angular/core';
import {AuthResponseData, AuthService} from "./auth.service";
import {NgForm} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const login = form.value.login;
    const password = form.value.password;
    const encoded = btoa(login+":"+password)
    console.log(encoded)

    console.log(login);
    console.log(password);

    let authObs: Observable<AuthResponseData>

    authObs = this.authService.userLogin(encoded)

    authObs.subscribe(resData => {
      console.log(resData)
    })
  }

}
