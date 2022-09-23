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
  private userSub: Subscription;
  subjectSelection: string = 'all';

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




  changeSubject(event) {
    if (event === "all") {
      this.displayedRequests = [...this.allRequests];
    } else if (event === "natural") {
      this.displayedRequests = this.adminService.displayNaturalPerson(this.allRequests);
    }  else if (event === "legal") {
      this.displayedRequests = this.adminService.displayLegalPerson(this.allRequests);
    } else if (event === "OSVC") {
      this.displayedRequests = this.adminService.displayOSVC(this.allRequests);
    }
  }



}
