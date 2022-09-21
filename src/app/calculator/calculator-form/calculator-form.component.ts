import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator-form',
  templateUrl: './calculator-form.component.html',
  styleUrls: ['./calculator-form.component.css']
})
export class CalculatorFormComponent implements OnInit {
  typOfApplicant = ['Fyzická osoba', 'Podnikatel fyzická osoba', 'Právnická osoba'];

  constructor() { }

  ngOnInit(): void {
  }

}
