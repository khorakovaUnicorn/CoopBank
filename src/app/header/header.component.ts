import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedUser: User;


  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.loggedUser = this.authService.user;
  }

  onLogout() {
    this.authService.userLogout();
  }


}
