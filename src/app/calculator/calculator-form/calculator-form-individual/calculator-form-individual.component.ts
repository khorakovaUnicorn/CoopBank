import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ApplicantType} from "../calculator-form.component";
import {CalculatorService} from "../../calculator.service";

@Component({
  selector: 'app-calculator-form-individual',
  templateUrl: './calculator-form-individual.component.html',
  styleUrls: ['../calculator-form.component.css']
})
export class CalculatorFormIndividualComponent implements OnInit {
  loanFormIndividual: FormGroup;

  constructor(private httpClient: HttpClient, private calcService: CalculatorService) {
  }

  ngOnInit(): void {
    this.loanFormIndividual = new FormGroup({
      'applicantType': new FormControl(ApplicantType.INDIVIDUAL),
      'name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(),
      'birthNum': new FormControl(),
      'nationality': new FormControl(),
      'email': new FormControl(),
      'phone': new FormControl(),
      'address': new FormGroup({
        'street': new FormControl(),
        'descNumber': new FormControl(),
        'indicativeNumber': new FormControl(),
        'city': new FormControl(),
        'postalCode': new FormControl()
      }),
    });
  }

  onSubmit() {
    let rawValue = this.loanFormIndividual.getRawValue();

    this.calcService.getDataFromUser(
'INDIVIDUAL',
      rawValue.name,
      rawValue.surname,
      rawValue.birthNum,
      rawValue.nationality,
      rawValue.email,
      rawValue.phone,
      null,
      null,
      null,
      rawValue.address
    )
  }
}
