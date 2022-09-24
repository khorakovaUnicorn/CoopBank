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
  sortedAlphabet = '';
  sortedLoan = '';
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

  filterSubject(event) {
    this.filteredBySubject = this.adminService.displayFilteredSubject(this.allRequests, event);
    this.displayedRequests = this.adminService.filterFinal(this.filteredBySubject, this.filteredByState);
    if (this.sortedLoan && !this.sortedAlphabet) {
      this.onLoanSorting(this.sortedLoan);
    } else if (this.sortedAlphabet) {
      this.onAlphabetSorting(this.sortedAlphabet);
    }
  }

  filterState(event) {
    this.filteredByState = this.adminService.displayFilteredState(this.allRequests, event);
    this.displayedRequests = this.adminService.filterFinal(this.filteredBySubject, this.filteredByState);
    if (this.sortedLoan && !this.sortedAlphabet) {
      this.onLoanSorting(this.sortedLoan);
    } else if (this.sortedAlphabet) {
      this.onAlphabetSorting(this.sortedAlphabet);
    }
  }

  onAlphabetSorting(event) {
    if (event === "AZ") {
      this.displayedRequests = this.displayedRequests.sort(
        (a, b) => (a.surname > b.surname) ? 1 : ((b.surname > a.surname) ? -1 : 0)
      )
    } else if (event === "ZA") {
      this.displayedRequests = this.displayedRequests.sort(
        (a, b) => (a.surname < b.surname) ? 1 : ((b.surname < a.surname) ? -1 : 0)
      )
    }
    this.sortedLoan = '';
  }

  onLoanSorting(event) {
    if (event === "min") {
      this.displayedRequests = this.displayedRequests.sort(
        (a, b) => (a.amount > b.amount) ? 1 : ((b.amount > a.amount) ? -1 : 0)
      )
    } else if (event === "max") {
      this.displayedRequests = this.displayedRequests.sort(
        (a, b) => (a.amount < b.amount) ? 1 : ((b.amount < a.amount) ? -1 : 0)
      )
    }
    this.sortedAlphabet = '';
  }
}
