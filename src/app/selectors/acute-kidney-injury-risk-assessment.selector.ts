import { createSelector } from '@ngrx/store';
import { AppSelectors } from './app.selector';

export class AcuteKidneyInjuryRiskAssessmentsSelectors {
  public static readonly acuteKidneyInjuryRiskAssessments = createSelector(
    AppSelectors.appState,
    (x) => x.acuteKidneyInjuryRiskAssessments
  );
  public static readonly acuteKidneyInjuryRiskAssessmentList = createSelector(
    AcuteKidneyInjuryRiskAssessmentsSelectors.acuteKidneyInjuryRiskAssessments,
    (x) => x.items
  );
  public static readonly totalResult = createSelector(
    AcuteKidneyInjuryRiskAssessmentsSelectors.acuteKidneyInjuryRiskAssessments,
    (x) => x.totalResults
  );
  public static readonly errorMessage = createSelector(
    AcuteKidneyInjuryRiskAssessmentsSelectors.acuteKidneyInjuryRiskAssessments,
    (x) => x.errorMessage
  );
  public static readonly isLoading = createSelector(
    AcuteKidneyInjuryRiskAssessmentsSelectors.acuteKidneyInjuryRiskAssessments,
    (x) => x.isLoading
  );
  public static readonly isLoaded = createSelector(
    AcuteKidneyInjuryRiskAssessmentsSelectors.acuteKidneyInjuryRiskAssessments,
    (x) => x.isLoaded
  );
}
