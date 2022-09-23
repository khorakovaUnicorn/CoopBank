import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {CalculatorService} from "../../calculator/calculator.service";
import {LoanRequest} from "../../calculator/calculator-form/loan-request.model";

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent implements OnInit, OnDestroy {
  responseSub: Subscription;
  editModeChange: Subscription;
  loanDetail: LoanRequest;
  applicantType: string;
  street: string;
  city: string;
  descNumber: number;
  indicativeNumber: number;
  postalCode: number;

  editMode = false;

  constructor(private calcService: CalculatorService) { }

  ngOnInit(): void {
    this.calcService.fetchRequestData();
    this.responseSub = this.calcService.reqDetResponse.subscribe(
      responseData => {
        this.loanDetail = responseData;

        if(this.loanDetail.applicantType === 'INDIVIDUAL') {
          this.applicantType = 'Fyzická osoba';
        } else if (this.loanDetail.applicantType === 'OSVC') {
          this.applicantType = 'OSVČ';
        } else {
          this.applicantType = 'Firma';
        }

        this.street = this.loanDetail.address.street;
        this.city = this.loanDetail.address.city;
        this.indicativeNumber = this.loanDetail.address.indicativeNumber;
        this.postalCode = this.loanDetail.address.postalCode;
        this.descNumber = this.loanDetail.address.descNumber;

      }
    )
    this.editModeChange = this.calcService.requestEditMode.subscribe(
      toggle => {
        this.editMode = toggle;
      }
    )
  }

  ngOnDestroy() {
    this.responseSub.unsubscribe();
    this.editModeChange.unsubscribe();
  }

}
