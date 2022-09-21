import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {CalculatorComponent} from "./calculator/calculator.component";
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./admin/admin.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/calc', pathMatch: 'full'},
  { path: 'calc', component: CalculatorComponent},
  { path: 'auth', component: AuthComponent},
  { path: 'admin', component: AdminComponent},

]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
