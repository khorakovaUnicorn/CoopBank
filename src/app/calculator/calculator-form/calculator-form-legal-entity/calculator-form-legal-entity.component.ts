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
      'name': new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      'surname': new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      'IC': new FormControl(null,[Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null,[Validators.pattern("^[1-9]+[0-9]*$"), Validators.maxLength(9)]),
      'address': new FormGroup({
        'street': new FormControl(),
        'descNumber': new FormControl(),
        'indicativeNumber': new FormControl(),
        'city': new FormControl(),
        'postalCode': new FormControl()
      }),
      'companyName': new FormControl(null, [Validators.required]),
      'position': new FormControl()
    });
  }

  onSubmit() {
  }

}
