import { createReducer, on } from '@ngrx/store';
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
import { PatientMovementResource } from '../api-client-services/patients-movements/resources/patient-movement-resource';
import { initialStateItems } from '../shared/state-item';

export const patientsMovemenstState =
  initialStateItems<PatientMovementResource>();

export const patientsMovementsReducer = createReducer(
  patientsMovemenstState,
  on(loadPatientsMovementAction, (state) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
    isLoaded: false,
    items: [],
    totalResults: 0,
  })),
  on(loadPatientsMovementSuccessAction, (state, action) => ({
    ...state,
    errorMessage: null,
    isLoading: false,
    isLoaded: true,
    items: action.response.items,
    totalResults: action.response.totalResults,
  })),
  on(createPatientMovementSuccessAction, (state, action) => {
    const patientsMovements = Object.assign([], state.items);
    patientsMovements.push(action.resource);

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: patientsMovements,
      totalResults: state.totalResults + 1,
    };
  }),
  on(updatePatientMovementSuccessAction, (state, action) => {
    const patientsMovements = Object.assign(
      [],
      state.items
    ) as PatientMovementResource[];
    const index = patientsMovements.findIndex(
      (item) => item.id === action.resource.id
    );
    patientsMovements[index] = action.resource;

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: patientsMovements,
    };
  }),
  on(deletePatientMovementSuccessAction, (state, action) => {
    const patientsMovements = Object.assign(
      [],
      state.items
    ) as PatientMovementResource[];
    const items = patientsMovements.filter((item) => item.id !== action.id);
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: items,
      totalResults: state.totalResults - 1,
    };
  }),
  on(
    createPatientMovementAction,
    updatePatientMovementAction,
    deletePatientMovementAction,
    (state) => ({
      ...state,
      isLoading: true,
      isLoaded: false,
    })
  ),
  on(
    loadPatientsMovementFailureAction,
    createPatientMovementFailureAction,
    updatePatientMovementFailureAction,
    deletePatientMovementFailureAction,
    (state, action) => ({
      ...state,
      errorMessage: action.errorMessage,
      isLoading: false,
      isLoaded: false,
    })
  )
);
