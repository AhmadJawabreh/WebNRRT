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

@Injectable()
export class PatientsHistoryEffect {
  public loadPatients$ = createEffect(() =>
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

  public createPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createPatientHistoryAction),
      switchMap((action) => this.patientsHisotryService.create(action.model)),
      map((resource: PatientHistoryResource) =>
        createPatientHistorySuccessAction({ resource: resource })
      ),
      catchError((error: string) =>
        of(createPatientHistoryFailureAction({ errorMessage: error }))
      )
    )
  );

  public updatePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePatientHistoryAction),
      switchMap((action) =>
        this.patientsHisotryService.update(action.id, action.model)
      ),
      map((resource: PatientHistoryResource) =>
        updatePatientHistorySuccessAction({ resource: resource })
      ),
      catchError((error: string) =>
        of(updatePatientHistoryFailureAction({ errorMessage: error }))
      )
    )
  );

  public deleteRemark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePatientHistoryAction),
      switchMap((action) =>
        this.patientsHisotryService.delete(action.id).pipe(
          map(() => deletePatientHistorySuccessAction({ id: action.id })),
          catchError((errorMessage: string) =>
            of(
              deletePatientHistoryFailureAction({ errorMessage: errorMessage })
            )
          )
        )
      )
    )
  );
  public constructor(
    private readonly actions$: Actions,
    private readonly patientsHisotryService: PatientsHisotryHttpService
  ) {}
}
