import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AcuteKidneyInjuryRiskAssessmentHttpService } from '../api-client-services/acute-kidney-injury-risk-assessment/acute-kidney-injury-risk-assessment-http-service';
import { greenSnackBar, readSnackBar } from '../shared/constent';
import { ResourceCollection } from '../shared/resource-collection';
import { SnackBar } from '../shared/snackbar';
import {
  createAcuteKidneyInjuryRiskAssessmentAction,
  createAcuteKidneyInjuryRiskAssessmentFailureAction,
  createAcuteKidneyInjuryRiskAssessmentSuccessAction,
  deleteAcuteKidneyInjuryRiskAssessmentAction,
  deleteAcuteKidneyInjuryRiskAssessmentFailureAction,
  deleteAcuteKidneyInjuryRiskAssessmentSuccessAction,
  loadAcuteKidneyInjuryRiskAssessmentsAction,
  loadAcuteKidneyInjuryRiskAssessmentsFailureAction,
  loadAcuteKidneyInjuryRiskAssessmentsSuccessAction,
  updateAcuteKidneyInjuryRiskAssessmentAction,
  updateAcuteKidneyInjuryRiskAssessmentFailureAction,
  updateAcuteKidneyInjuryRiskAssessmentSuccessAction,
} from './../actions/acute-kidney-injury-risk-assessment.action';
import { AcuteKidneyInjuryRiskAssessmentResource } from './../api-client-services/acute-kidney-injury-risk-assessment/resources/acute-kidney-injur-risk-assessment-resource';
import { AcuteKidneyInjuryRiskAssessmentCreatedSuccessfully, AcuteKidneyInjuryRiskAssessmentDeletedSuccessfully, AcuteKidneyInjuryRiskAssessmentUpdateSuccessfully, cantCreateAcuteKidneyInjuryRiskAssessment, cantDeleteAcuteKidneyInjuryRiskAssessment, cantUpdateAcuteKidneyInjuryRiskAssessment } from '../shared/messages';

@Injectable()
export class AcuteKidneyInjuryRiskAssessmentEffect {
  public loadAcuteKidneyInjuryRiskAssessment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAcuteKidneyInjuryRiskAssessmentsAction),
      switchMap((action) =>
        this.AKIRAService.getAKIRAs(action.filter).pipe(
          map(
            (
              resource: ResourceCollection<AcuteKidneyInjuryRiskAssessmentResource>
            ) => {
              return loadAcuteKidneyInjuryRiskAssessmentsSuccessAction({
                response: resource,
              });
            }
          ),
          catchError((error: string) =>
            of(
              loadAcuteKidneyInjuryRiskAssessmentsFailureAction({
                errorMessage: error,
              })
            )
          )
        )
      )
    )
  );

  public createAcuteKidneyInjuryRiskAssessment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createAcuteKidneyInjuryRiskAssessmentAction),
      switchMap((action) =>
        this.AKIRAService.create(action.model).pipe(
          map((resource: AcuteKidneyInjuryRiskAssessmentResource) => {
            this.snackBar.showSnackbar(
              AcuteKidneyInjuryRiskAssessmentCreatedSuccessfully,
              greenSnackBar
            );
            return createAcuteKidneyInjuryRiskAssessmentSuccessAction({
              resource: resource,
            });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0];
            this.snackBar.showSnackbar(
              errorMessage ?? cantCreateAcuteKidneyInjuryRiskAssessment,
              readSnackBar
            );
            return of(
              createAcuteKidneyInjuryRiskAssessmentFailureAction({
                errorMessage: errorMessage,
              })
            );
          })
        )
      )
    )
  );

  public updateAcuteKidneyInjuryRiskAssessment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAcuteKidneyInjuryRiskAssessmentAction),
      switchMap((action) =>
        this.AKIRAService.update(action.id, action.model).pipe(
          map((resource: AcuteKidneyInjuryRiskAssessmentResource) => {
            this.snackBar.showSnackbar(
              AcuteKidneyInjuryRiskAssessmentUpdateSuccessfully,
              greenSnackBar
            );
            return updateAcuteKidneyInjuryRiskAssessmentSuccessAction({
              resource: resource,
            });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0];
            this.snackBar.showSnackbar(
              errorMessage ?? cantUpdateAcuteKidneyInjuryRiskAssessment,
              readSnackBar
            );
            return of(
              updateAcuteKidneyInjuryRiskAssessmentFailureAction({
                errorMessage: errorMessage,
              })
            );
          })
        )
      )
    )
  );

  public deleteAcuteKidneyInjuryRiskAssessment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAcuteKidneyInjuryRiskAssessmentAction),
      switchMap((action) =>
        this.AKIRAService.delete(action.id).pipe(
          map(() => {
            this.snackBar.showSnackbar(
              AcuteKidneyInjuryRiskAssessmentDeletedSuccessfully,
              greenSnackBar
            );
            return deleteAcuteKidneyInjuryRiskAssessmentSuccessAction({
              id: action.id,
            });
          }),
          catchError((exception: any) => {
            const errorMessage =
              exception.error?.errorDetails?.Id[0] ?? cantDeleteAcuteKidneyInjuryRiskAssessment;
            this.snackBar.showSnackbar(errorMessage, readSnackBar);
            return of(
              deleteAcuteKidneyInjuryRiskAssessmentFailureAction({
                errorMessage: errorMessage,
              })
            );
          })
        )
      )
    )
  );
  public constructor(
    private readonly actions$: Actions,
    private readonly AKIRAService: AcuteKidneyInjuryRiskAssessmentHttpService,
    private readonly snackBar: SnackBar
  ) {}
}
