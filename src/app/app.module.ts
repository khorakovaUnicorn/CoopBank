import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { CalculatorMainComponent } from './calculator/calculator-main/calculator-main.component'
import {CalculatorFormComponent} from "./calculator/calculator-form/calculator-form.component";
import { AdminComponent } from './admin/admin.component';
import {CalculatorComponent} from "./calculator/calculator.component";
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    CalculatorFormComponent,
    HeaderComponent,
    AuthComponent,
    AdminComponent,
    CalculatorMainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
