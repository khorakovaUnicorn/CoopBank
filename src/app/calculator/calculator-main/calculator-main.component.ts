import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm, ReactiveFormsModule, FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-calculator-main',
  templateUrl: './calculator-main.component.html',
  styleUrls: ['./calculator-main.component.css']
})
export class CalculatorMainComponent implements OnInit{
  calculateForm: FormGroup;
  amountValue = 598000;
  durationMessage = '2 roky a 9 měsíců';
  hasBeenTouched = false;

  constructor() {
  }

  ngOnInit() {
    this.calculateForm = new FormGroup({
      'amount': new FormControl(null),
      'duration': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.calculateForm);
  }

  amtChange(e) {                            //mění hodnotu částky
    this.amountValue = e.target.value;
    this.hasBeenTouched = true;
  }

  durChange(e) {
    let months = e.target.value;
    this.hasBeenTouched = true;
    this.countMonths(months);
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
