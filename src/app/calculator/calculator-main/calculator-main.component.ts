import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormControl} from "@angular/forms";
import {CalculatorService} from "../calculator.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-calculator-main',
  templateUrl: './calculator-main.component.html',
  styleUrls: ['./calculator-main.component.css']
})
export class CalculatorMainComponent implements OnInit, OnDestroy{
  calculateForm: FormGroup;
  amountValue: number = 598000;
  numOfMonths: number = 33;
  durationMessage = '2 roky a 9 měsíců';
  hasBeenTouched = false;

  //vypočítané hodnoty

  monthlyPayment: number;
  yearlyInterest: number;
  RPSN: number;
  overallAmount: number;
  fixedFee: number;

  constructor(private calcService: CalculatorService,
              private router: Router) {
  }

  ngOnInit() {
    this.calculateForm = new FormGroup({
      'amount': new FormControl(null),
      'duration': new FormControl(null)
    });
  }

  //načítání vypočítaných hodnot

  calcSubscription = this.calcService.fetchedData.subscribe(fetchedData => {
    console.log(fetchedData);

    this.monthlyPayment = fetchedData.monthlyPayment;
    this.yearlyInterest = fetchedData.yearlyInterest;
    this.RPSN = fetchedData.RPSN;
    this.overallAmount = fetchedData.overallAmount;
    console.log(fetchedData.fixedFee);
    if(fetchedData.fixedFee) {
      this.fixedFee = 3000;//fetchedData.fixedFee;
      /*setTimeout(() => {
        this.fixedFee = 3000;
      }, 3000);
      console.log(this.fixedFee);*/
    }

  })

  ngOnDestroy() {
    this.calcSubscription.unsubscribe();
  }

  onSubmit() {
    this.router.navigate(['calc/calc-form']);
  }

  amtChange(e) {        //mění hodnotu částky
    this.amountValue = e.target.value;
    this.hasBeenTouched = true;
    this.calcService.sendCalcData(this.amountValue, this.numOfMonths);
  }

  durChange(e) {   //meni mesice
    let months = e.target.value;
    this.numOfMonths = months;

    this.hasBeenTouched = true;
    this.countMonths(months);

    this.calcService.sendCalcData(this.amountValue, months);

    //this.calcService.sendCalcData({ this.amountValue, months});
  }

  countMonths(months: number) {
    let yearMonth = [0,0];
    if(months >= 12) {
      yearMonth[0] = Math.floor(months / 12);
      yearMonth[1] = months % 12;
    } else {
      yearMonth[1] = months;
    }

    let firstMess = '';

    switch(true) {
      case (yearMonth[0] === 1):
        firstMess = '1 rok';
        break;
      case (yearMonth[0] > 1 && yearMonth[0] < 5):
        firstMess = yearMonth[0] + ' roky';
        break;
      case(yearMonth[0] >= 5):
        firstMess = yearMonth[0] + ' let';
        break;
    }

    let scdMess = '';

    switch(true) {
      case (yearMonth[1] === 1):
        scdMess = '1 měsíc';
        break;
      case(yearMonth[1] > 1 && yearMonth[1] < 5):
        scdMess = yearMonth[1] + ' měsíce';
        break;
      case(yearMonth[1] >= 5):
        scdMess = yearMonth[1] + ' měsíců';
        break;
    }

    let connector = '';
    if(yearMonth[0] !== 0 && yearMonth[1] !== 0) {
      connector = ' a ';
    }

    this.durationMessage = firstMess + connector + scdMess;
  }

}
