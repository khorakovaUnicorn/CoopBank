import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplicantType} from "../calculator-form.component";

@Component({
  selector: 'app-calculator-form-osvc',
  templateUrl: './calculator-form-osvc.component.html',
  styleUrls: ['../calculator-form.component.css']
})
export class CalculatorFormOsvcComponent implements OnInit {
  loanFormOSVC: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.loanFormOSVC = new FormGroup({
      'applicantType': new FormControl(ApplicantType.OSVC),
      'name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(),
      'IC': new FormControl(),
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
  }
}
