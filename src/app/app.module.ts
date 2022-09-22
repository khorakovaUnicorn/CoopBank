import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorMainComponent } from './calculator/calculator-main/calculator-main.component'
import {CalculatorFormComponent} from "./calculator/calculator-form/calculator-form.component";
import {CalculatorComponent} from "./calculator/calculator.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    CalculatorMainComponent,
    CalculatorFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
