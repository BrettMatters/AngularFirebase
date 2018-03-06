import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuardService } from "../auth/guard/auth-guard.service";
import { LoginComponent } from "../auth/login/login.component";
import { MainComponent } from "../components/main/main.component";

const routes: Routes = [{
  path: '',
  component: MainComponent,
  canActivate: [AuthGuardService]
}, {
  path: 'login',
  component: LoginComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})

export class RoutingModule { }