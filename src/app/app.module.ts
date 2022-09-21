import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalculatorFormComponent } from './calculator/calculator-form/calculator-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    CalculatorFormComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
