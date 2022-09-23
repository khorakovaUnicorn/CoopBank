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
  filteredBySubject: oneRequest[];
  filteredByState: oneRequest[];
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
        this.filteredBySubject = [...this.allRequests];
        this.filteredByState = [...this.allRequests]
      }
    )
  }

  filterFinal(subjectFiltered: oneRequest[], stateFiltered: oneRequest[]) {
    return subjectFiltered.filter(object1 => {
      return stateFiltered.some(object2 => {
        return object1.id === object2.id;
      });
    });
  }


  filterSubject(event) {
    this.filteredBySubject = this.adminService.displayFilteredSubject(this.allRequests, event);
    this.displayedRequests = this.filterFinal(this.filteredBySubject, this.filteredByState);
  }

  filterState(event) {
    this.filteredByState = this.adminService.displayFilteredState(this.allRequests, event);
    this.displayedRequests = this.filterFinal(this.filteredBySubject, this.filteredByState);
  }


}
