import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplicantType} from "../calculator-form.component";

@Component({
  selector: 'app-calculator-form-legal-entity',
  templateUrl: './calculator-form-legal-entity.component.html',
  styleUrls: ['../calculator-form.component.css']
})
export class CalculatorFormLegalEntityComponent implements OnInit {
  loanFormLegalEntity: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loanFormLegalEntity = new FormGroup({
      'applicantType': new FormControl(ApplicantType.LEGAL_ENTITY),
      'name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(),
      'IC': new FormControl(),
      'email': new FormControl(),
      'phone': new FormControl(),
      'address': new FormGroup({
        'street': new FormControl(),
        'descNumber': new FormControl(),
        'indicativeNumber': new FormControl(),
        'city': new FormControl(),
        'postalCode': new FormControl()
      }),
      'companyName': new FormControl(),
      'position': new FormControl()
    });
  }

  onSubmit() {
  }

}
