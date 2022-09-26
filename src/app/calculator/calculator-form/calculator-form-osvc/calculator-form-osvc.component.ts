import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApplicantType} from "../calculator-form.component";
import {CalculatorService} from "../../calculator.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-calculator-form-osvc',
  templateUrl: './calculator-form-osvc.component.html',
  styleUrls: ['../calculator-form.component.css']
})
export class CalculatorFormOsvcComponent implements OnInit, OnDestroy {
  loanFormOSVC: FormGroup;
  resSub: Subscription;
  errAddress:boolean = false;

  constructor(private calcService: CalculatorService) {
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
    let rawValue = this.loanFormOSVC.getRawValue();

    this.calcService.getDataFromUser(
      'OSVC',
      rawValue.name,
      rawValue.surname,
      rawValue.birthNum,
      rawValue.nationality,
      rawValue.email,
      rawValue.phone,
      rawValue.IC,
      null,
      null,
      rawValue.address
    )

    this.resSub = this.calcService.requestResponse.subscribe(response => {
      this.errAddress = !!response.error;
    })
  }

  onAddressChange() {
    this.errAddress = false;
  }

  AddressValidator(control: FormControl): {[s: string]: boolean} {
    if (control.value % 2 === 0 ) {
      return {'addressIsNotValid': true};
    }
    return null;
  }

  ngOnDestroy() {
    this.resSub.unsubscribe();
  }
}
