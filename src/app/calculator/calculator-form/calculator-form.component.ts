import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {CalculatorService} from "../calculator.service";
import {Router} from "@angular/router";

export enum ApplicantType {
  OSVC= 'OSVC',
  INDIVIDUAL = 'INDIVIDUAL',
  LEGAL_ENTITY = 'LEGAL_ENTITY'
}

interface ApplicantDefinition {
  key: ApplicantType,
  czValue: string
}

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css']
})
export class CalculatorFormComponent implements OnInit {
  loanForm: FormGroup;
  errMess = null;
  responseSub: Subscription;

  ApplicantType = ApplicantType

  applicantTypes: ApplicantDefinition[] = [
    {
      key: ApplicantType.INDIVIDUAL,
      czValue: 'Fyzická osoba'
    },
    {
      key: ApplicantType.OSVC,
      czValue: 'Podnikatel fyzická osoba'
    },
    {
      key: ApplicantType.LEGAL_ENTITY,
      czValue: 'Právnická osoba'
    }
  ];

  constructor(private calcService: CalculatorService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loanForm = new FormGroup({
      'applicantType': new FormControl(this.applicantTypes[0].key),
    });

    this.responseSub = this.calcService.requestResponse.subscribe(response => {
      console.log(response);

      this.router.navigate(['/request'], {queryParams: {
          reqID: response
        }})
    }, error => {
      this.errMess = error; //TODO rozdělit error na chybu připojení k serveru/sudé č.p.
    })
  }

}
