import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})

export class CalculatorService {
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
    console.log(amount+' '+numOfMonths);

    amount = +amount;
    numOfMonths = +numOfMonths;

    console.log(amount+' '+numOfMonths);

    this.http.post(
      'http://localhost:8000/request/calculate',
      {amount, numOfMonths}
      ).subscribe(resData => {
        console.log(resData);
        this.fetchCalcData(resData)
    });
  }

  fetchCalcData(resData) {
    let monthlyPayment: number = resData.monthlyPayment;
    let yearlyInterest: number = resData.yearlyInterest;
    let RPSN: number = resData.RPSN;
    let overallAmount: number = resData.overallAmount;
    let fixedFee: number = resData.fixedFee;

    this.fetchedData.next({monthlyPayment, yearlyInterest, RPSN, overallAmount, fixedFee});
  }

  /*sendCalcData (calcData: { amount, numOfMonths}) {
    this.http.post<{}>(
      'http://localhost:8000/request/calculate',
      calcData).subscribe(resData => {
        console.log(resData);
    });
  }*/
}
