import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css']
})
export class CalculatorFormComponent implements OnInit {
  loanForm: FormGroup;
  applicantTypes = ['Fyzická osoba', 'Podnikatel fyzická osoba', 'Právnická osoba'];

  constructor() {
  }

  ngOnInit(): void {
    this.loanForm = new FormGroup({
      'applicantType': new FormControl('Fyzická osoba'),
      'name': new FormControl(null, [Validators.required]),
      'surname': new FormControl(),
      'birthNum': new FormControl(),
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
      'companyName': new FormControl(),
      'position': new FormControl()
    });
  }

  onSubmit() {
  }
}
