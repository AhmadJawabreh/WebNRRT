import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  createAcuteKidneyInjuryRiskAssessmentAction,
  deleteAcuteKidneyInjuryRiskAssessmentAction,
  loadAcuteKidneyInjuryRiskAssessmentsAction,
  updateAcuteKidneyInjuryRiskAssessmentAction,
} from '../actions/acute-kidney-injury-risk-assessment.action';
import { AcuteKidneyInjuryRiskAssessmentFilter } from '../api-client-services/acute-kidney-injury-risk-assessment/filters/acute-kidney-injur-risk-assessment-filter';
import { AcuteKidneyInjuryRiskAssessmentModel } from '../api-client-services/acute-kidney-injury-risk-assessment/models/acute-kidney-injur-risk-assessment-model';
import { AppState } from '../reducers/app-state';
import { AcuteKidneyInjuryRiskAssessmentsSelectors } from '../selectors/acute-kidney-injury-risk-assessment.selector';

@Injectable({
  providedIn: `root`,
})
export class AcuteKidneyInjuryRiskAssessmentsService {
  public acuteKidneyInjuryRiskAssessments = this.store.pipe(
    select(
      AcuteKidneyInjuryRiskAssessmentsSelectors.acuteKidneyInjuryRiskAssessmentList
    )
  );
  public isloading = this.store.pipe(select(AcuteKidneyInjuryRiskAssessmentsSelectors.isLoading));
  public totalResult = this.store.pipe(select(AcuteKidneyInjuryRiskAssessmentsSelectors.totalResult));

  public constructor(private store: Store<AppState>) {}

  public loaAcuteKidneyInjuryRiskAssessments(
    filter: AcuteKidneyInjuryRiskAssessmentFilter
  ) {
    this.store.dispatch(
      loadAcuteKidneyInjuryRiskAssessmentsAction({ filter: filter })
    );
  }

  public createAcuteKidneyInjuryRiskAssessment(
    model: AcuteKidneyInjuryRiskAssessmentModel
  ) {
    this.store.dispatch(
      createAcuteKidneyInjuryRiskAssessmentAction({ model: model })
    );
  }

  public updateAcuteKidneyInjuryRiskAssessment(
    id: number,
    model: AcuteKidneyInjuryRiskAssessmentModel
  ) {
    this.store.dispatch(
      updateAcuteKidneyInjuryRiskAssessmentAction({ id: id, model: model })
    );
  }

  public deleteAcuteKidneyInjuryRiskAssessment(id: number) {
    this.store.dispatch(
      deleteAcuteKidneyInjuryRiskAssessmentAction({ id: id })
    );
  }
}
