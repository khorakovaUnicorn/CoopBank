import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplicantType} from "../calculator-form.component";
import {CalculatorService} from "../../calculator.service";

@Component({
  selector: 'app-calculator-form-legal-entity',
  templateUrl: './calculator-form-legal-entity.component.html',
  styleUrls: ['../calculator-form.component.css']
})
export class CalculatorFormLegalEntityComponent implements OnInit {
  loanFormLegalEntity: FormGroup;

  constructor(private calcService: CalculatorService) { }

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
    let rawValue = this.loanFormLegalEntity.getRawValue();

    this.calcService.getDataFromUser(
      'Company',
      rawValue.name,
      rawValue.surname,
      null,
      null,
      rawValue.email,
      rawValue.phone,
      rawValue.IC,
      rawValue.position,
      rawValue.companyName,
      rawValue.address
    )
  }

}
