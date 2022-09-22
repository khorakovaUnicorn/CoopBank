import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalculatorFormComponent } from './calculator/calculator-form/calculator-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HeaderComponent } from './header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import { AuthComponent } from './auth/auth.component';
import { AdminComponent } from './admin/admin.component';
import {HttpClientModule} from "@angular/common/http";
import { CalculatorFormOsvcComponent } from './calculator/calculator-form/calculator-form-osvc/calculator-form-osvc.component';
import { CalculatorFormLegalEntityComponent } from './calculator/calculator-form/calculator-form-legal-entity/calculator-form-legal-entity.component';
import { CalculatorFormIndividualComponent } from "./calculator/calculator-form/calculator-form-individual/calculator-form-individual.component";

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    CalculatorFormComponent,
    HeaderComponent,
    AuthComponent,
    AdminComponent,
    CalculatorFormIndividualComponent,
    CalculatorFormOsvcComponent,
    CalculatorFormLegalEntityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
