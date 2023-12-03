import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  createPatientAction,
  createPatientFailureAction,
  createPatientSuccessAction,
  deletePatientFailureAction,
  deletePatientSuccessAction,
  loadPatientsAction,
  loadPatientsFailureAction,
  loadPatientsSuccessAction,
  updatePatientAction,
  updatePatientFailureAction,
  updatePatientSuccessAction,
} from '../actions/patients.actions';
import { PatientResource } from '../api-client-services/Patients/Resources/PatientResource';
import { PatientHttpService } from '../api-client-services/Patients/patients-http-service';
import { ResourceCollection } from '../shared/resource-collection';
import { Injectable } from '@angular/core';

@Injectable()
export class PatientsEffect {
  public loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPatientsAction),
      switchMap((action) => this.patientService.getPatients(action.filter)),
      map((resource: ResourceCollection<PatientResource>) =>
        loadPatientsSuccessAction({ response: resource })
      ),
      catchError((error: string) =>
        of(loadPatientsFailureAction({ errorMessage: error }))
      )
    )
  );

  public createPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPatientAction),
      switchMap((action) => this.patientService.create(action.model)),
      map((resource: PatientResource) =>
        createPatientSuccessAction({ resource: resource })
      ),
      catchError((error: string) =>
        of(createPatientFailureAction({ errorMessage: error }))
      )
    )
  );

  public updatePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePatientAction),
      switchMap((action) => this.patientService.create(action.model)),
      map((resource: PatientResource) =>
        updatePatientSuccessAction({ resource: resource })
      ),
      catchError((error: string) =>
        of(updatePatientFailureAction({ errorMessage: error }))
      )
    )
  );

  public deletePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPatientAction),
      switchMap((action) => this.patientService.create(action.model)),
      map((resource: PatientResource) =>
        deletePatientSuccessAction({ resource: resource })
      ),
      catchError((error: string) =>
        of(deletePatientFailureAction({ errorMessage: error }))
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly patientService: PatientHttpService
  ) {}
}
