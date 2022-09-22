import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

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

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.loanForm = new FormGroup({
      'applicantType': new FormControl(this.applicantTypes[0].key),
    });
  }

  onSubmit() {
    console.log(this.loanForm.getRawValue())

    this.httpClient.post('http://localhost:8000/request/create', this.loanForm.getRawValue())
      .subscribe(value => console.log(value))
  }
}
