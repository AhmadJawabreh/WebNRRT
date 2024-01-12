import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { PatientHistoryResource } from '../api-client-services/patients-history/resources/patient-history-resource';
import { StateItems } from '../shared/state-item';
import { patientsHistoryReducer } from './patients-history.reducer';
import { patientsReducer } from './patients.reducer';
import { PatientMovementResource } from '../api-client-services/patients-movements/resources/patient-movement-resource';
import { patientsMovementsReducer } from './patients-movement.reducer';
import { PatientResource } from '../api-client-services/patients/resources/patient-resource';
import { AuthenticationState, authenticationReducer } from './authentication.reducer';
import { TeamResource } from '../api-client-services/teams/Resources/team-resource';
import { teamsReducer } from './teams.reducer';

export interface AppState {
  patients: StateItems<PatientResource>;
  patientsHistory: StateItems<PatientHistoryResource>;
  patientsMovements: StateItems<PatientMovementResource>;
  teams: StateItems<TeamResource>;
  authentication: AuthenticationState;
}

export const reducers: ActionReducerMap<AppState> = {
  patients: patientsReducer,
  patientsHistory: patientsHistoryReducer,
  patientsMovements: patientsMovementsReducer,
  authentication: authenticationReducer,
  teams: teamsReducer
};

export const metaReducers: MetaReducer[] = []
