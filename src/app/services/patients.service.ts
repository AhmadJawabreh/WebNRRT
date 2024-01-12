import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers/app-state';
import {
  createPatientAction,
  deletePatientAction,
  loadPatientsAction,
  updatePatientAction,
} from '../actions/patients.actions';
import { PatientsSelectors } from '../selectors/patients.selector';
import { Injectable } from '@angular/core';
import { PatientFilter } from '../api-client-services/patients/filters/PatientFilter';
import { PatientModel } from '../api-client-services/patients/models/PatientModel';

@Injectable({
  providedIn: `root`,
})
export class PatientsService {
  public patients = this.store.pipe(select(PatientsSelectors.patientsList));
  public isloading = this.store.pipe(select(PatientsSelectors.isLoading));
  public totalResult = this.store.pipe(select(PatientsSelectors.totalResult));

  public constructor(private store: Store<AppState>) {}

  public loadPatients(filter: PatientFilter) {
    this.store.dispatch(loadPatientsAction({ filter: filter }));
  }

  public createPatient(model: PatientModel) {
    this.store.dispatch(createPatientAction({ model: model }));
  }

  public updatePatient(id: number, model: PatientModel) {
    this.store.dispatch(updatePatientAction({ id: id, model: model }));
  }

  public deletePatient(id: number) {
    this.store.dispatch(deletePatientAction({ id: id }));
  }
}
