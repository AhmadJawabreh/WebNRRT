import { AcuteKidneyInjuryRiskAssessmentModel } from '../api-client-services/acute-kidney-injury-risk-assessment/models/acute-kidney-injur-risk-assessment-model';
import { AcuteKidneyInjuryRiskAssessmentResource } from '../api-client-services/acute-kidney-injury-risk-assessment/resources/acute-kidney-injur-risk-assessment-resource';
import { AcuteKidneyInjuryRiskAssessmentFilter } from '../api-client-services/acute-kidney-injury-risk-assessment/filters/acute-kidney-injur-risk-assessment-filter';
import { createAction, props } from '@ngrx/store';
import { ResourceCollection } from '../shared/resource-collection';


export const loadAcuteKidneyInjuryRiskAssessmentsAction = createAction(
  '[PATIENTS] LOAD Acute Kidney Injury Risk Assessment ACTION',
  props<{ filter: AcuteKidneyInjuryRiskAssessmentFilter }>()
);

export const loadAcuteKidneyInjuryRiskAssessmentsSuccessAction = createAction(
  '[AKIRA] LOAD Acute Kidney Injury Risk Assessment SUCCESS ACTION',
  props<{ response: ResourceCollection<AcuteKidneyInjuryRiskAssessmentResource> }>()
);

export const loadAcuteKidneyInjuryRiskAssessmentsFailureAction = createAction(
  '[AKIRA] LOAD Acute Kidney Injury Risk Assessment FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const createAcuteKidneyInjuryRiskAssessmentAction = createAction(
  '[AKIRA] CREATE Acute Kidney Injury Risk Assessment ACTION',
  props<{ model: AcuteKidneyInjuryRiskAssessmentModel }>()
);

export const createAcuteKidneyInjuryRiskAssessmentSuccessAction = createAction(
  '[AKIRA] CREATE Acute Kidney Injury Risk Assessment SUCCESS ACTION',
  props<{ resource: AcuteKidneyInjuryRiskAssessmentResource }>()
);

export const createAcuteKidneyInjuryRiskAssessmentFailureAction = createAction(
  '[AKIRA] CREATE Acute Kidney Injury Risk Assessment FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const updateAcuteKidneyInjuryRiskAssessmentAction = createAction(
  '[AKIRA] UPDATE Acute Kidney Injury Risk Assessment ACTION',
  props<{ id: number; model: AcuteKidneyInjuryRiskAssessmentModel }>()
);

export const updateAcuteKidneyInjuryRiskAssessmentSuccessAction = createAction(
  '[AKIRA] UPDATE Acute Kidney Injury Risk Assessment SUCCESS ACTION',
  props<{ resource: AcuteKidneyInjuryRiskAssessmentResource }>()
);

export const updateAcuteKidneyInjuryRiskAssessmentFailureAction = createAction(
  '[AKIRA] UPDATE Acute Kidney Injury Risk Assessment FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const deleteAcuteKidneyInjuryRiskAssessmentAction = createAction(
  '[AKIRA] DELETE Acute Kidney Injury Risk Assessment ACTION',
  props<{ id: number }>()
);

export const deleteAcuteKidneyInjuryRiskAssessmentSuccessAction = createAction(
  '[AKIRA] DELETE Acute Kidney Injury Risk Assessment SUCCESS ACTION',
  props<{ id: number }>()
);

export const deleteAcuteKidneyInjuryRiskAssessmentFailureAction = createAction(
  '[AKIRA] DELETE Acute Kidney Injury Risk Assessment FAILURE ACTION',
  props<{ errorMessage: string }>()
);
