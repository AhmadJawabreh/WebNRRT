import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  NgbModal,
  NgbModalConfig,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from './../environments/environment.prod';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PatientsFormComponent } from './components/patients-form/patients-form.component';
import { PatientsHistoryFormComponent } from './components/patients-history-form/patients-history-form.component';
import { PatientsMovementsFormComponent } from './components/patients-movements-form/patients-movements-form.component';
import { PatientsMovementsComponent } from './components/patients-movements/patients-movements.component';
import { PatientsComponent } from './components/patients/patients.component';
import { PatientsMovementsEffect } from './effects/patients-movements.effect';
import { PatientsEffect } from './effects/patients.effect';
import { PatientsHistoryEffect } from './effects/patients.history.effect';
import { metaReducers, reducers } from './reducers/app-state';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBar } from './shared/snackbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AuthenticationEffect } from './effects/authentication.effect';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/authentication-guard.service';
import { TeamsEffect } from './effects/teams.effect';
import { PatientsHistoryComponent } from './components/patients-history/patients-history.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamsFormComponent } from './components/teams-form/teams-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    PatientsFormComponent,
    PatientsHistoryComponent,
    PatientsHistoryFormComponent,
    PatientsMovementsComponent,
    PatientsMovementsFormComponent,
    LoginComponent,
    TeamsComponent,
    TeamsFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forRoot(reducers,{metaReducers}),
    EffectsModule.forRoot([
      PatientsEffect,
      PatientsHistoryEffect,
      PatientsMovementsEffect,
      TeamsEffect,
      AuthenticationEffect
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatListModule,
    MatProgressBarModule,
    MatRadioModule,
    MatCardModule
  ],
  providers: [HttpClientModule, NgbModal, NgbModalConfig, MatSnackBar, SnackBar, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
