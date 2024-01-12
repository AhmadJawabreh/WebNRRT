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
import { SnackBar } from '../shared/snackbar';
import {
  cantCreatePatient,
  cantDeletePatient,
  cantUpdatePatient,
  patientCreatedSuccessfully,
  patientDeletedSuccessfully,
  patientUpdateSuccessfully,
} from '../shared/messages';
import { greenSnackBar, readSnackBar } from '../shared/constent';

@Injectable()
export class PatientsEffect {
  public loadPatients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPatientsAction),
      switchMap((action) =>
        this.patientService.getPatients(action.filter).pipe(
          map((resource: ResourceCollection<PatientResource>) => {
            return  loadPatientsSuccessAction({ response: resource });

          }
          ),
          catchError((error: string) =>
            of(loadPatientsFailureAction({ errorMessage: error }))
          )
        )
      )
    )
  );

  public createPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPatientAction),
      switchMap((action) =>
        this.patientService.create(action.model).pipe(
          map((resource: PatientResource) => {
            this.snackBar.showSnackbar(
              patientCreatedSuccessfully,
              greenSnackBar
            );
            return createPatientSuccessAction({ resource: resource });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0];
            this.snackBar.showSnackbar(
              errorMessage ?? cantCreatePatient,
              readSnackBar
            );
            return of(
              createPatientFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );

  public updatePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePatientAction),
      switchMap((action) =>
        this.patientService.update(action.id, action.model).pipe(
          map((resource: PatientResource) => {
            this.snackBar.showSnackbar(
              patientUpdateSuccessfully,
              greenSnackBar
            );
            return updatePatientSuccessAction({ resource: resource });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0];
            this.snackBar.showSnackbar(
              errorMessage ?? cantUpdatePatient,
              readSnackBar
            );
            return of(
              updatePatientFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );

  public deletePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePatientAction),
      switchMap((action) =>
        this.patientService.delete(action.id).pipe(
          map(() => {
            this.snackBar.showSnackbar(
              patientDeletedSuccessfully,
              greenSnackBar
            );
            return deletePatientSuccessAction({ id: action.id });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0] ?? cantDeletePatient;
            this.snackBar.showSnackbar(errorMessage, readSnackBar);
            return of(
              deletePatientFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );
  public constructor(
    private readonly actions$: Actions,
    private readonly patientService: PatientHttpService,
    private readonly snackBar: SnackBar
  ) {}
}
