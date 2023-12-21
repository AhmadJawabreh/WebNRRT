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
import { ResourceCollection } from '../shared/resource-collection';

@Injectable()
export class PatientsMovementsEffect {
  public loadPatientsMovements$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPatientsMovementAction),
      switchMap((action) =>
        this.patientsMovementsService.getPatientsMovements(action.filter)
      ),
      map((resource: ResourceCollection<PatientMovementResource>) =>
        loadPatientsMovementSuccessAction({ response: resource })
      ),
      catchError((error: string) =>
        of(loadPatientsMovementFailureAction({ errorMessage: error }))
      )
    )
  );

  public createPatientMovement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPatientMovementAction),
      switchMap((action) => this.patientsMovementsService.create(action.model)),
      map((resource: PatientMovementResource) =>
        createPatientMovementSuccessAction({ resource: resource })
      ),
      catchError((error: string) =>
        of(createPatientMovementFailureAction({ errorMessage: error }))
      )
    )
  );

  public updatePatientMovement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePatientMovementAction),
      switchMap((action) =>
        this.patientsMovementsService.update(action.id, action.model)
      ),
      map((resource: PatientMovementResource) =>
        updatePatientMovementSuccessAction({ resource: resource })
      ),
      catchError((error: string) =>
        of(updatePatientMovementFailureAction({ errorMessage: error }))
      )
    )
  );

  public deleteMovement$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePatientMovementAction),
      switchMap((action) =>
        this.patientsMovementsService.delete(action.id).pipe(
          map(() => deletePatientMovementSuccessAction({ id: action.id })),
          catchError((errorMessage: string) =>
            of(
              deletePatientMovementFailureAction({ errorMessage: errorMessage })
            )
          )
        )
      )
    )
  );
  public constructor(
    private readonly actions$: Actions,
    private readonly patientsMovementsService: PatientsMovementsHttpService
  ) {}
}
