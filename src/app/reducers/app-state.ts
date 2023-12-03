import { ActionReducerMap } from '@ngrx/store';
import { PatientResource } from '../api-client-services/Patients/Resources/PatientResource';
import { StateItems } from '../shared/state-item';
import { patientsReducer } from './patients.reducer';

export interface AppState {
  patients: StateItems<PatientResource>;
}

export const reducers: ActionReducerMap<AppState> = {
  patients: patientsReducer,
};
