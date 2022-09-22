import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ApplicantType} from "../calculator-form.component";

@Component({
  selector: 'app-calculator-form-individual',
  templateUrl: './calculator-form-individual.component.html',
  styleUrls: ['../calculator-form.component.css']
})
export class CalculatorFormIndividualComponent implements OnInit {
  loanFormIndividual: FormGroup;

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.loanFormIndividual = new FormGroup({
      'applicantType': new FormControl(ApplicantType.INDIVIDUAL),
      'name': new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      'surname': new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
      'birthNum': new FormControl(null,[Validators.pattern("^[1-9]+[0-9]*$")]),
      'nationality': new FormControl("Česká republika"),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phone': new FormControl(null,[Validators.pattern("^[1-9]+[0-9]*$"), Validators.maxLength(9)]),
      'address': new FormGroup({
        'street': new FormControl(),
        'descNumber': new FormControl(),
        'indicativeNumber': new FormControl(),
        'city': new FormControl(),
        'postalCode': new FormControl(null, [Validators.pattern("^[1-9]+[0-9]*$")])
      }),
    });
  }

  onSubmit() {
    console.log(this.loanFormIndividual.getRawValue())

    this.httpClient.post('http://localhost:8000/request/create', this.loanFormIndividual.getRawValue())
      .subscribe(value => console.log(value))
  }
}
