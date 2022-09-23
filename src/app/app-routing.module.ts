import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {CalculatorComponent} from "./calculator/calculator.component";
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./admin/admin.component";
import {CalculatorFormComponent} from "./calculator/calculator-form/calculator-form.component";
import {CalculatorDefaultComponent} from "./calculator/calculator-default/calculator-default.component";
import {RequestComponent} from "./request/request.component";
import {AuthGuard} from "./auth/auth-guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/calc', pathMatch: 'full'},
  { path: 'calc', component: CalculatorComponent, children: [
      {path: '', component: CalculatorDefaultComponent},
      {path: 'calc-form', component: CalculatorFormComponent}
    ]},
  { path: 'auth', component: AuthComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'request', component: RequestComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
