import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientsFormComponent } from './components/patients-form/patients-form.component';
import { PatientsHistoryFormComponent } from './components/patients-history-form/patients-history-form.component';
import { PatientsHistoryComponent } from './components/patients-history/patients-history.component';
import { PatientsMovementsComponent } from './components/patients-movements/patients-movements.component';
import { PatientsMovementsFormComponent } from './components/patients-movements-form/patients-movements-form.component';

const routes: Routes = [
  { path: 'patients', component: PatientsComponent },
  { path: 'patients/create', component: PatientsFormComponent },
  { path: 'patients/edit/:id', component: PatientsFormComponent },
  { path: 'patients/history', component: PatientsHistoryComponent },
  { path: 'patients/history/create', component: PatientsHistoryFormComponent },
  { path: 'patients/history/edit/:id', component: PatientsHistoryFormComponent },
  { path: 'patients/vistis', component: PatientsMovementsComponent },
  { path: 'patients/vistis/create', component: PatientsMovementsFormComponent },
  { path: 'patients/vistis/edit/:id', component: PatientsMovementsFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
