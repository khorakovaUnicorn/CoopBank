import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

import {AuthService} from "../auth/auth.service";
import {User} from "../auth/user.model";
import {AdminResponseData, AdminService} from "./admin.service";
import {oneRequest} from "./requests.model";
import {LoanRequest} from "../calculator/calculator-form/loan-request.model";

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
  stateSelection: string = 'all';
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
        if (!this.displayedRequests) {this.displayedRequests = [...this.allRequests]}
      }
    )
  }

  onApprove(request: oneRequest) {
    let requestObs: Observable<LoanRequest>;
    requestObs = this.adminService.requestApprove(request, this.loggedUser.token);

    requestObs.subscribe(
      resData => {
        console.log(resData)
      }
    )
  }

  onFiltering(){
    let filteredBySubject = this.adminService.displayFilteredSubject(this.allRequests, this.subjectSelection);
    let filteredByState = this.adminService.displayFilteredState(this.allRequests, this.stateSelection);
    this.displayedRequests = this.adminService.filterFinal(filteredBySubject, filteredByState);
    if (this.sortedLoan) {
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
