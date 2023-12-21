import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  createPatientHistoryAction,
  deletePatientHistoryAction,
  loadPatientsHistoryAction,
  updatePatientHistoryAction,
} from '../actions/patients-history.action';
import { PatientHistoryFilter } from '../api-client-services/patients-history/filters/patient-history-filter';
import { PatientHistoryModel } from '../api-client-services/patients-history/models/patient-history-model';
import { AppState } from '../reducers/app-state';
import { PatientsHistorySelectors } from '../selectors/patients-history.selector';

@Injectable({
  providedIn: `root`,
})
export class PatientsHistoryService {
  public patientsHistory = this.store.pipe(
    select(PatientsHistorySelectors.patientsHistoryList)
  );
  public isloading = this.store.pipe(
    select(PatientsHistorySelectors.isLoading)
  );
  public totalResult = this.store.pipe(
    select(PatientsHistorySelectors.totalResult)
  );

  public constructor(private store: Store<AppState>) {}

  public loadPatientsHistory(filter: PatientHistoryFilter) {
    this.store.dispatch(loadPatientsHistoryAction({ filter: filter }));
  }

  public createPatientHistory(model: PatientHistoryModel) {
    this.store.dispatch(createPatientHistoryAction({ model: model }));
  }

  public updatePatientHistory(id: number, model: PatientHistoryModel) {
    this.store.dispatch(updatePatientHistoryAction({ id: id, model: model }));
  }

  public deletePatientHistory(id: number) {
    this.store.dispatch(deletePatientHistoryAction({ id: id }));
  }
}
