import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthguardGuard } from './authguard.guard';
import { CreateuserComponent } from './createuser/createuser.component';
import { EdituserComponent } from './edituser/edituser.component';
import { AdduserComponent } from './adduser/adduser.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'create', component: CreateuserComponent,canActivate: [AuthguardGuard] },
  { path: 'edit', component: EdituserComponent,canActivate: [AuthguardGuard] },
  { path: 'add', component: AdduserComponent,canActivate: [AuthguardGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthguardGuard] }
 
]
 
@NgModule({
  imports: [RouterModule.forRoot(routes),NgbPaginationModule, NgbAlertModule,],
  exports: [RouterModule]
})
export class AppRoutingModule { }