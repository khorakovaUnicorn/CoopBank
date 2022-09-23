import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

import {AuthService} from "../../auth/auth.service";
import {User} from "../../auth/user.model";
import {AdminResponseData, AdminService} from "./admin.service";
import {oneRequest} from "./requests.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loggedUser: User;
  private userSub: Subscription;
  allRequests: oneRequest[];

  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.loggedUser = user;

    });
    this.onGetAllRequests();
  }

  onGetAllRequests() {
    let adminObs: Observable<AdminResponseData>;
    adminObs = this.adminService.getAllRequests(this.loggedUser.token);

    adminObs.subscribe(
      resData => {
        this.allRequests = resData;
        console.log(this.allRequests)
      }
    )
  }

  openDetail() {
    this.router.navigate(['../detail'], { relativeTo: this.route });
  }

}
