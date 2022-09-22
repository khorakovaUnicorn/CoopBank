import {Component, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loggedUser: User;
  private userSub: Subscription;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.loggedUser = user;
    });
  }
}
