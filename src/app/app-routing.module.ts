import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientsFormComponent } from './components/patients-form/patients-form.component';
import { PatientsHistoryFormComponent } from './components/patients-history-form/patients-history-form.component';
import { PatientsHistoryComponent } from './components/patients-history/patients-history.component';
import { PatientsMovementsComponent } from './components/patients-movements/patients-movements.component';
import { PatientsMovementsFormComponent } from './components/patients-movements-form/patients-movements-form.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/authentication-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'patients', component: PatientsComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: 'patients', pathMatch: 'full' },
  { path: 'patients/create', component: PatientsFormComponent, canActivate: [AuthGuardService] },
  { path: 'patients/edit/:id', component: PatientsFormComponent, canActivate: [AuthGuardService] },
  { path: 'patients/history', component: PatientsHistoryComponent, canActivate: [AuthGuardService] },
  { path: 'patients/history/create', component: PatientsHistoryFormComponent, canActivate: [AuthGuardService] },
  { path: 'patients/history/edit/:id', component: PatientsHistoryFormComponent, canActivate: [AuthGuardService] },
  { path: 'patients/vistis', component: PatientsMovementsComponent, canActivate: [AuthGuardService] },
  { path: 'patients/vistis/create', component: PatientsMovementsFormComponent, canActivate: [AuthGuardService] },
  { path: 'patients/vistis/edit/:id', component: PatientsMovementsFormComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
