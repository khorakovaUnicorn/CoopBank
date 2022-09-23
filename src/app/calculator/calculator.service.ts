import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {LoanRequest} from "./calculator-form/loan-request.model";

@Injectable({providedIn: 'root'})

export class CalculatorService {
  formData: LoanRequest =  new LoanRequest;
  amount: number = 598000;//TODO lokální úložiště si zapamatuje poslední zadanou hodnotu - uživatel i po reloadu má svoji půjčku
  numOfMonths: number = 27; //TODO -||-
  requestResponse = new Subject<number>();

  fetchedData = new Subject<{
    monthlyPayment: number,
    yearlyInterest: number,
    RPSN: number,
    overallAmount: number,
    fixedFee?: number
  }>()

  constructor(private http: HttpClient) {
  }

  sendCalcData(amount: number, numOfMonths: number) {
    amount = +amount;
    numOfMonths = +numOfMonths;

    this.amount = amount;
    this.numOfMonths = numOfMonths;

    this.http.post(
      'http://localhost:8000/request/calculate',
      {amount, numOfMonths}
      ).subscribe(resData => {
        this.fetchCalcData(resData)
    }, error => {
        this.fetchCalcData(error);
    });
  }

  fetchCalcData(resData) {
    if(resData.monthlyPayment) {    //check, jestli se správně načetla data
      let monthlyPayment: number = resData.monthlyPayment;
      let yearlyInterest: number = resData.yearlyInterest;
      let RPSN: number = resData.RPSN;
      let overallAmount: number = resData.overallAmount;
      let fixedFee: number = resData.fixedFee;

      this.fetchedData.next({monthlyPayment, yearlyInterest, RPSN, overallAmount, fixedFee});
    } else {
      this.fetchedData.error('Připojení se serverem selhalo!');
    }
  }

  getDataFromUser(
    applicantType: string,
    name: string,
    surname: string,
    birthNum: string | null,
    nationality: string | null,
    email: string,
    phone: string,
    IC: string | null,
    position: string | null,
    companyName: string | null,
    address: {
      street: string,
      descNumber: number,
      indicativeNumber: number,
      city: string,
      postalCode: number
    }) {

    if(applicantType === 'INDIVIDUAL') {
      this.formData.applicantType = 'INDIVIDUAL';
      this.formData.nationality = nationality;
      this.formData.birthNum = birthNum;
    } else if(applicantType === 'OSVC') {
      this.formData.nationality = nationality;
      this.formData.IC = IC;
    } else {
      this.formData.IC = IC;
      this.formData.position = position;
      this.formData.companyName = companyName;
    }

    this.formData.name = name;
    this.formData.surname = surname;

    this.formData.email = email;
    this.formData.phone = phone;
    this.formData.amount = this.amount;
    this.formData.numOfMonths = this.numOfMonths;
    address.descNumber = +address.descNumber;
    address.indicativeNumber = +address.indicativeNumber;
    address.postalCode = +address.postalCode;
    this.formData.address = address;

    console.log(this.formData);

    this.submitRequest(this.formData);
  }

  submitRequest (formData: LoanRequest) {
    this.http.post(
      'http://localhost:8000/request/create',
      formData).subscribe( response => {
        this.requestResponse.next(response['id']);
    }, error => {
        console.log('Error: ' + error);
        this.requestResponse.error('Připojení se serverem selhalo!');
      }
    );
  }

  /*sendCalcData (calcData: { amount, numOfMonths}) {
    this.http.post<{}>(
      'http://localhost:8000/request/calculate',
      calcData).subscribe(resData => {
        console.log(resData);
    });
  }*/
}
