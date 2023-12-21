import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  createPatientAction,
  createPatientFailureAction,
  createPatientSuccessAction,
  deletePatientAction,
  deletePatientFailureAction,
  deletePatientSuccessAction,
  loadPatientsAction,
  loadPatientsFailureAction,
  loadPatientsSuccessAction,
  updatePatientAction,
  updatePatientFailureAction,
  updatePatientSuccessAction,
} from '../actions/patients.actions';
import { PatientHttpService } from '../api-client-services/patients/patients-http-service';
import { ResourceCollection } from '../shared/resource-collection';
import { PatientResource } from '../api-client-services/patients/resources/patient-resource';

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
      switchMap((action) =>
        this.patientService.update(action.id, action.model)
      ),
      map((resource: PatientResource) =>
        updatePatientSuccessAction({ resource: resource })
      ),
      catchError((error: string) =>
        of(updatePatientFailureAction({ errorMessage: error }))
      )
    )
  );

  public deleteRemark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePatientAction),
      switchMap((action) =>
        this.patientService.delete(action.id).pipe(
          map(() => deletePatientSuccessAction({ id: action.id })),
          catchError((errorMessage: string) =>
            of(deletePatientFailureAction({ errorMessage: errorMessage }))
          )
        )
      )
    )
  );
  public constructor(
    private readonly actions$: Actions,
    private readonly patientService: PatientHttpService
  ) {}
}
