import { createReducer, on } from '@ngrx/store';
import {
  createPatientAction,
  createPatientFailureAction,
  createPatientSuccessAction,
  deletePatientAction,
  deletePatientFailureAction,
  deletePatientSuccessAction,
  loadPatientsAction,
  loadPatientsFailureAction,
  loadPatientsSuccessAction,
  updatePatientAction,
  updatePatientFailureAction,
  updatePatientSuccessAction,
} from '../actions/patients.actions';
import { initialStateItems } from './../shared/state-item';
import { PatientResource } from '../api-client-services/patients/resources/patient-resource';

export const patientsState = initialStateItems<PatientResource>();

export const patientsReducer = createReducer(
  patientsState,
  on(loadPatientsAction, (state) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
    isLoaded: false,
    items: [],
    totalResults: 0,
  })),
  on(loadPatientsSuccessAction, (state, action) => ({
    ...state,
    errorMessage: null,
    isLoading: false,
    isLoaded: true,
    items: action.response.items,
    totalResults: action.response.totalResults,
  })),
  on(createPatientSuccessAction, (state, action) => {
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
  on(updatePatientSuccessAction, (state, action) => {
    const patients = Object.assign([], state.items) as PatientResource[];
    const index = patients.findIndex((item) => item.id === action.resource.id);
    patients[index] = action.resource;

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: patients,
    };
  }),
  on(deletePatientSuccessAction, (state, action) => {
    const patients = Object.assign([], state.items) as PatientResource[];
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
    createPatientAction,
    updatePatientAction,
    deletePatientAction,
    (state) => ({
      ...state,
      isLoading: true,
      isLoaded: false,
    })
  ),
  on(
    loadPatientsFailureAction,
    createPatientFailureAction,
    updatePatientFailureAction,
    deletePatientFailureAction,
    (state, action) => ({
      ...state,
      errorMessage: action.errorMessage,
      isLoading: false,
      isLoaded: false,
    })
  )
);
