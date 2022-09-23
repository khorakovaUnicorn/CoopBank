import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";
import {AdminResponseData, AdminService} from "./admin.service";
import {oneRequest} from "./requests.model";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  loggedUser: User;
  allRequests: oneRequest[];
  displayedRequests: oneRequest[];
  subjectSelection: string = 'all';
  requestStateSelection: string = 'all';
  private userSub: Subscription;

  constructor(private authService: AuthService, private adminService: AdminService) {

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
        this.displayedRequests = [...this.allRequests];
      }
    )
  }

  filterSubject(event) {
    this.displayedRequests = this.adminService.displayFilteredSubject(this.allRequests, event)
  }

  filterState(event) {
    this.displayedRequests = this.adminService.displayFilteredState(this.allRequests, event)
  }


}
