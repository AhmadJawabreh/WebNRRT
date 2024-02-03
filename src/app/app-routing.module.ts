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
import { TeamsComponent } from './components/teams/teams.component';
import { TeamsFormComponent } from './components/teams-form/teams-form.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { TeamMembersFormComponent } from './components/team-members-form/team-members-form.component';
import { AKIRAComponent } from './components/akira/akira.component';
import { AKIRAFormComponent } from './components/akira-form/akira-form.component';

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
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuardService] },
  { path: 'teams/create', component: TeamsFormComponent, canActivate: [AuthGuardService] },
  { path: 'teams/edit/:id', component: TeamsFormComponent, canActivate: [AuthGuardService] },
  { path: 'team/members', component: TeamMembersComponent, canActivate: [AuthGuardService] },
  { path: 'team/members/create', component: TeamMembersFormComponent, canActivate: [AuthGuardService] },
  { path: 'team/members/edit/:id', component: TeamMembersFormComponent, canActivate: [AuthGuardService] },
  { path: 'patient/akira', component: AKIRAComponent, canActivate: [AuthGuardService] },
  { path: 'patient/akira/create', component: AKIRAFormComponent, canActivate: [AuthGuardService] },
  { path: 'patient/akira/edit/:id', component: AKIRAFormComponent, canActivate: [AuthGuardService] },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
