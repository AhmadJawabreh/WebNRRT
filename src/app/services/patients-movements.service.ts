import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  createPatientMovementAction,
  deletePatientMovementAction,
  loadPatientsMovementAction,
  updatePatientMovementAction,
} from '../actions/patients-movement.action';
import { PatientMovementFilter } from '../api-client-services/patients-movements/filters/patient-movemen-filter';
import { PatientMovementModel } from '../api-client-services/patients-movements/models/patient-movement-model';
import { AppState } from '../reducers/app-state';
import { PatientsMovementsSelectors } from '../selectors/patients-movements.selector';

@Injectable({
  providedIn: `root`,
})
export class PatientsMovementsService {
  public patientsMovements = this.store.pipe(
    select(PatientsMovementsSelectors.patientsMovementsList)
  );
  public isloading = this.store.pipe(
    select(PatientsMovementsSelectors.isLoading)
  );
  public totalResult = this.store.pipe(
    select(PatientsMovementsSelectors.totalResult)
  );

  public constructor(private store: Store<AppState>) {}

  public loadPatientsMovements(filter: PatientMovementFilter) {
    this.store.dispatch(loadPatientsMovementAction({ filter: filter }));
  }

  public createPatientMovements(model: PatientMovementModel) {
    this.store.dispatch(createPatientMovementAction({ model: model }));
  }

  public updatePatientMovements(id: number, model: PatientMovementModel) {
    this.store.dispatch(updatePatientMovementAction({ id: id, model: model }));
  }

  public deletePatientMovements(id: number) {
    this.store.dispatch(deletePatientMovementAction({ id: id }));
  }
}
