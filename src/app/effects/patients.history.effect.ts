import {
  cantCreatePatientHistory,
  cantDeletePatientHistory,
  cantUpdatePatientHistory,
  patientHistoryDeletedSuccessfully,
  patientHistoryUpdateSuccessfully,
} from './../shared/messages';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  createPatientHistoryAction,
  createPatientHistoryFailureAction,
  createPatientHistorySuccessAction,
  deletePatientHistoryAction,
  deletePatientHistoryFailureAction,
  deletePatientHistorySuccessAction,
  loadPatientsHistoryAction,
  loadPatientsHistoryFailureAction,
  loadPatientsHistorySuccessAction,
  updatePatientHistoryAction,
  updatePatientHistoryFailureAction,
  updatePatientHistorySuccessAction,
} from '../actions/patients-history.action';
import { PatientsHisotryHttpService } from '../api-client-services/patients-history/patients-history-http-service';
import { PatientHistoryResource } from '../api-client-services/patients-history/resources/patient-history-resource';
import { ResourceCollection } from '../shared/resource-collection';
import { greenSnackBar, readSnackBar } from '../shared/constent';
import { SnackBar } from '../shared/snackbar';
import { patientHistoryCreatedSuccessfully } from '../shared/messages';

@Injectable()
export class PatientsHistoryEffect {
  public loadPatientsHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPatientsHistoryAction),
      switchMap((action) =>
        this.patientsHisotryService.getPatients(action.filter)
      ),
      map((resource: ResourceCollection<PatientHistoryResource>) =>
        loadPatientsHistorySuccessAction({ response: resource })
      ),
      catchError((error: string) =>
        of(loadPatientsHistoryFailureAction({ errorMessage: error }))
      )
    )
  );

  public createPatientHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPatientHistoryAction),
      switchMap((action) =>
        this.patientsHisotryService.create(action.model).pipe(
          map((resource: PatientHistoryResource) => {
            this.snackBar.showSnackbar(
              patientHistoryCreatedSuccessfully,
              greenSnackBar
            );
            return createPatientHistorySuccessAction({ resource: resource });
          }),
          catchError((exception: any) => {
            const errorMessage =
              exception.error?.errorDetails?.Id[0] ?? cantCreatePatientHistory;
            this.snackBar.showSnackbar(errorMessage, readSnackBar);
            return of(
              createPatientHistoryFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );

  public updatePatientHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePatientHistoryAction),
      switchMap((action) =>
        this.patientsHisotryService.update(action.id, action.model).pipe(
          map((resource: PatientHistoryResource) => {
            this.snackBar.showSnackbar(
              patientHistoryUpdateSuccessfully,
              greenSnackBar
            );
            return updatePatientHistorySuccessAction({ resource: resource });
          }),
          catchError((exception: any) => {
            const errorMessage =
              exception.error?.errorDetails?.Id[0] ?? cantUpdatePatientHistory;
            this.snackBar.showSnackbar(errorMessage, readSnackBar);
            return of(
              updatePatientHistoryFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );

  public deletePatientHistory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePatientHistoryAction),
      switchMap((action) =>
        this.patientsHisotryService.delete(action.id).pipe(
          map(() => {
            this.snackBar.showSnackbar(
              patientHistoryDeletedSuccessfully,
              greenSnackBar
            );
            return deletePatientHistorySuccessAction({ id: action.id });
          }),
          catchError((errorMessage: string) => {
            this.snackBar.showSnackbar(cantDeletePatientHistory, readSnackBar);
            return of(
              deletePatientHistoryFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );
  public constructor(
    private readonly actions$: Actions,
    private readonly snackBar: SnackBar,
    private readonly patientsHisotryService: PatientsHisotryHttpService
  ) {}
}
