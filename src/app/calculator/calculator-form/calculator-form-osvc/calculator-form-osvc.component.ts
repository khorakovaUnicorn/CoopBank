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
      'name': new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      'surname': new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      'IC': new FormControl(null,[Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]),
      'nationality': new FormControl("Česká republika"),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null,[Validators.pattern("^[1-9]+[0-9]*$"), Validators.maxLength(9)]),
      'address': new FormGroup({
        'street': new FormControl(),
        'descNumber': new FormControl(null, [Validators.pattern("^[1-9]+[0-9]*$"),  this.AddressValidator.bind(this)]),
        'indicativeNumber': new FormControl(),
        'city': new FormControl(),
        'postalCode': new FormControl(null, [Validators.pattern("^[1-9]+[0-9]*$"), Validators.maxLength(5)])
      }),
    });
  }

  onSubmit() {
  }

  AddressValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value % 2 === 0 ) {
      return {'addressIsNotValid': true};
    }
    return null;
  }
}
