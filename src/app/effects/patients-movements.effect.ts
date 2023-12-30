import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  createPatientMovementAction,
  createPatientMovementFailureAction,
  createPatientMovementSuccessAction,
  deletePatientMovementAction,
  deletePatientMovementFailureAction,
  deletePatientMovementSuccessAction,
  loadPatientsMovementAction,
  loadPatientsMovementFailureAction,
  loadPatientsMovementSuccessAction,
  updatePatientMovementAction,
  updatePatientMovementFailureAction,
  updatePatientMovementSuccessAction,
} from '../actions/patients-movement.action';
import { PatientsMovementsHttpService } from '../api-client-services/patients-movements/patients-movements-http-service';
import { PatientMovementResource } from '../api-client-services/patients-movements/resources/patient-movement-resource';
import { greenSnackBar, readSnackBar } from '../shared/constent';
import {
  cantCreatePatientMovement,
  cantDeletePatientMovement,
  cantUpdatePatientMovement,
  patientMovementCreatedSuccessfully,
  patientMovementDeletedSuccessfully,
  patientMovementUpdateSuccessfully,
} from '../shared/messages';
import { ResourceCollection } from '../shared/resource-collection';
import { SnackBar } from '../shared/snackbar';

@Injectable()
export class PatientsMovementsEffect {
  public loadPatientsMovements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPatientsMovementAction),
      switchMap((action) =>
        this.patientsMovementsService.getPatientsMovements(action.filter).pipe(
          map((resource: ResourceCollection<PatientMovementResource>) =>
            loadPatientsMovementSuccessAction({ response: resource })
          ),
          catchError((error: string) =>
            of(loadPatientsMovementFailureAction({ errorMessage: error }))
          )
        )
      )
    )
  );

  public createPatientMovement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPatientMovementAction),
      switchMap((action) =>
        this.patientsMovementsService.create(action.model).pipe(
          map((resource: PatientMovementResource) => {
            this.snackBar.showSnackbar(
              patientMovementCreatedSuccessfully,
              greenSnackBar
            );
            return createPatientMovementSuccessAction({ resource: resource });
          }),
          catchError((error: string) => {
            this.snackBar.showSnackbar(cantCreatePatientMovement, readSnackBar);
            return of(
              createPatientMovementFailureAction({ errorMessage: error })
            );
          })
        )
      )
    )
  );

  public updatePatientMovement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePatientMovementAction),
      switchMap((action) =>
        this.patientsMovementsService.update(action.id, action.model).pipe(
          map((resource: PatientMovementResource) => {
            this.snackBar.showSnackbar(
              patientMovementUpdateSuccessfully,
              greenSnackBar
            );
            return updatePatientMovementSuccessAction({ resource: resource });
          }),
          catchError((error: string) => {
            this.snackBar.showSnackbar(cantUpdatePatientMovement, readSnackBar);
            return of(
              updatePatientMovementFailureAction({ errorMessage: error })
            );
          })
        )
      )
    )
  );

  public deletePatientMovement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePatientMovementAction),
      switchMap((action) =>
        this.patientsMovementsService.delete(action.id).pipe(
          map(() => {
            this.snackBar.showSnackbar(
              patientMovementDeletedSuccessfully,
              greenSnackBar
            );
            return deletePatientMovementSuccessAction({ id: action.id });
          }),
          catchError((errorMessage: string) => {
            this.snackBar.showSnackbar(cantDeletePatientMovement, readSnackBar);
            return of(
              deletePatientMovementFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );
  public constructor(
    private readonly actions$: Actions,
    private readonly snackBar: SnackBar,
    private readonly patientsMovementsService: PatientsMovementsHttpService
  ) {}
}
