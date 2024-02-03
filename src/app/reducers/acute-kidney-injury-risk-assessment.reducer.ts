import { createReducer, on } from '@ngrx/store';
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
} from '../actions/acute-kidney-injury-risk-assessment.action';
import { AcuteKidneyInjuryRiskAssessmentResource } from '../api-client-services/acute-kidney-injury-risk-assessment/resources/acute-kidney-injur-risk-assessment-resource';
import { initialStateItems } from '../shared/state-item';

export const aKIRAState =
  initialStateItems<AcuteKidneyInjuryRiskAssessmentResource>();

export const acuteKidneyInjuryRiskAssessmentReducer = createReducer(
  aKIRAState,
  on(loadAcuteKidneyInjuryRiskAssessmentsAction, (state) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
    isLoaded: false,
    items: [],
    totalResults: 0,
  })),
  on(loadAcuteKidneyInjuryRiskAssessmentsSuccessAction, (state, action) => ({
    ...state,
    errorMessage: null,
    isLoading: false,
    isLoaded: true,
    items: action.response.items,
    totalResults: action.response.totalResults,
  })),
  on(createAcuteKidneyInjuryRiskAssessmentSuccessAction, (state, action) => {
    const acuteKidneyInjuryRiskAssessments = Object.assign([], state.items);
    acuteKidneyInjuryRiskAssessments.push(action.resource);

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: acuteKidneyInjuryRiskAssessments,
      totalResults: state.totalResults + 1,
    };
  }),
  on(updateAcuteKidneyInjuryRiskAssessmentSuccessAction, (state, action) => {
    const acuteKidneyInjuryRiskAssessments = Object.assign(
      [],
      state.items
    ) as AcuteKidneyInjuryRiskAssessmentResource[];
    const index = acuteKidneyInjuryRiskAssessments.findIndex((item) => item.id === action.resource.id);
    acuteKidneyInjuryRiskAssessments[index] = action.resource;

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: acuteKidneyInjuryRiskAssessments,
    };
  }),
  on(deleteAcuteKidneyInjuryRiskAssessmentSuccessAction, (state, action) => {
    const acuteKidneyInjuryRiskAssessments = Object.assign(
      [],
      state.items
    ) as AcuteKidneyInjuryRiskAssessmentResource[];
    const items = acuteKidneyInjuryRiskAssessments.filter((item) => item.id !== action.id);
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: items,
      totalResults: state.totalResults - 1,
    };
  }),
  on(
    createAcuteKidneyInjuryRiskAssessmentAction,
    updateAcuteKidneyInjuryRiskAssessmentAction,
    deleteAcuteKidneyInjuryRiskAssessmentAction,
    (state) => ({
      ...state,
      isLoading: true,
      isLoaded: false,
    })
  ),
  on(
    loadAcuteKidneyInjuryRiskAssessmentsFailureAction,
    createAcuteKidneyInjuryRiskAssessmentFailureAction,
    updateAcuteKidneyInjuryRiskAssessmentFailureAction,
    deleteAcuteKidneyInjuryRiskAssessmentFailureAction,
    (state, action) => ({
      ...state,
      errorMessage: action.errorMessage,
      isLoading: false,
      isLoaded: false,
    })
  )
);
