import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientsFormComponent } from './components/patients/form/patients-form.component';

const routes: Routes = [
  { path: '', component: PatientsComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'patients/create', component: PatientsFormComponent },
  { path: 'patients/edit/:id', component: PatientsFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
