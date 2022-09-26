import {Component, OnInit} from '@angular/core';
import {AuthResponseData, AuthService} from "./auth.service";
import {NgForm} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  error = null;
  private userSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {
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
      () => {
        this.error = null;
      },
      error => {
        if (error.message === "username or password incorrect") {
          this.error = "Nesprávné přihlašovací údaje"
        } else if (error.message === "Connection refused!") {
          this.error = "Nelze se připojit k serveru";
        } else {
          this.error = "Neznámý error"
        }
      }
    )
    this.userSub = this.authService.user.subscribe(user => {
      if (user && (user.roles.includes("ADMIN") || user.roles.includes("SUPERVIZOR"))) {
        this.router.navigate(['/admin/allRequest'])
      }
    });
  }
}
