import { createReducer, on } from '@ngrx/store';
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
import { PatientHistoryResource } from '../api-client-services/patients-history/resources/patient-history-resource';
import { initialStateItems } from '../shared/state-item';

export const patientsHistoryState = initialStateItems<PatientHistoryResource>();

export const patientsHistoryReducer = createReducer(
  patientsHistoryState,
  on(loadPatientsHistoryAction, (state) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
    isLoaded: false,
    items: [],
    totalResults: 0,
  })),
  on(loadPatientsHistorySuccessAction, (state, action) => ({
    ...state,
    errorMessage: null,
    isLoading: false,
    isLoaded: true,
    items: action.response.items,
    totalResults: action.response.totalResults,
  })),
  on(createPatientHistorySuccessAction, (state, action) => {
    const patients = Object.assign([], state.items);
    patients.push(action.resource);

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: patients,
      totalResults: state.totalResults + 1,
    };
  }),
  on(updatePatientHistorySuccessAction, (state, action) => {
    const patients = Object.assign([], state.items) as PatientHistoryResource[];
    const index = patients.findIndex((item) => item.id === action.resource.id);
    patients[index] = action.resource;

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: patients,
    };
  }),
  on(deletePatientHistorySuccessAction, (state, action) => {
    const patients = Object.assign([], state.items) as PatientHistoryResource[];
    const items = patients.filter((item) => item.id !== action.id);
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: items,
      totalResults: state.totalResults - 1,
    };
  }),
  on(
    createPatientHistoryAction,
    updatePatientHistoryAction,
    deletePatientHistoryAction,
    (state) => ({
      ...state,
      isLoading: true,
      isLoaded: false,
    })
  ),
  on(
    loadPatientsHistoryFailureAction,
    createPatientHistoryFailureAction,
    updatePatientHistoryFailureAction,
    deletePatientHistoryFailureAction,
    (state, action) => ({
      ...state,
      errorMessage: action.errorMessage,
      isLoading: false,
      isLoaded: false,
    })
  )
);
