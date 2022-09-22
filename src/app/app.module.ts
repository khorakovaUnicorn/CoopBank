import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";

import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from "./app-routing.module";

import { CalculatorMainComponent } from './calculator/calculator-main/calculator-main.component'
import {CalculatorFormComponent} from "./calculator/calculator-form/calculator-form.component";
import { AdminComponent } from './admin/admin.component';
import {CalculatorComponent} from "./calculator/calculator.component";
import { AuthComponent } from './auth/auth.component';
import { CalculatorFormOsvcComponent } from './calculator/calculator-form/calculator-form-osvc/calculator-form-osvc.component';
import { CalculatorFormLegalEntityComponent } from './calculator/calculator-form/calculator-form-legal-entity/calculator-form-legal-entity.component';
import { CalculatorFormIndividualComponent } from "./calculator/calculator-form/calculator-form-individual/calculator-form-individual.component";
import { CalculatorDefaultComponent } from './calculator/calculator-default/calculator-default.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalculatorComponent,
    CalculatorFormComponent,
    CalculatorMainComponent,
    CalculatorFormIndividualComponent,
    CalculatorFormOsvcComponent,
    CalculatorFormLegalEntityComponent,
    AuthComponent,
    AdminComponent,
    CalculatorMainComponent,
    CalculatorDefaultComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
