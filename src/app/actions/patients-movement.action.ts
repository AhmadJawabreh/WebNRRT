import { createAction, props } from '@ngrx/store';
import { PatientMovementFilter } from '../api-client-services/patients-movements/filters/patient-movemen-filter';
import { PatientMovementModel } from '../api-client-services/patients-movements/models/patient-movement-model';
import { PatientMovementResource } from '../api-client-services/patients-movements/resources/patient-movement-resource';
import { ResourceCollection } from '../shared/resource-collection';

export const loadPatientsMovementAction = createAction(
  '[PATIENTS MOVEMENT] LOAD PATIENTS MOVEMENT ACTION',
  props<{ filter: PatientMovementFilter }>()
);

export const loadPatientsMovementSuccessAction = createAction(
  '[PATIENTS MOVEMENT] LOAD PATIENTS MOVEMENT SUCCESS ACTION',
  props<{ response: ResourceCollection<PatientMovementResource> }>()
);

export const loadPatientsMovementFailureAction = createAction(
  '[PATIENTS MOVEMENT] LOAD PATIENTS MOVEMENT FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const createPatientMovementAction = createAction(
  '[PATIENTS MOVEMENT] CREATE PATIENT MOVEMENT ACTION',
  props<{ model: PatientMovementModel }>()
);

export const createPatientMovementSuccessAction = createAction(
  '[PATIENTS MOVEMENT] CREATE PATIENT MOVEMENT SUCCESS ACTION',
  props<{ resource: PatientMovementResource }>()
);

export const createPatientMovementFailureAction = createAction(
  '[PATIENTS MOVEMENT] CREATE PATIENT MOVEMENT FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const updatePatientMovementAction = createAction(
  '[PATIENTS MOVEMENT] UPDATE PATIENT MOVEMENT ACTION',
  props<{ id: number; model: PatientMovementModel }>()
);

export const updatePatientMovementSuccessAction = createAction(
  '[PATIENTS MOVEMENT] UPDATE PATIENT MOVEMENT SUCCESS ACTION',
  props<{ resource: PatientMovementResource }>()
);

export const updatePatientMovementFailureAction = createAction(
  '[PATIENTS MOVEMENT] UPDATE PATIENT MOVEMENT FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const deletePatientMovementAction = createAction(
  '[PATIENTS MOVEMENT] DELETE PATIENT MOVEMENT ACTION',
  props<{ id: number }>()
);

export const deletePatientMovementSuccessAction = createAction(
  '[PATIENTS MOVEMENT] DELETE PATIENT MOVEMENT SUCCESS ACTION',
  props<{ id: number }>()
);

export const deletePatientMovementFailureAction = createAction(
  '[PATIENTS MOVEMENT] DELETE PATIENT MOVEMENT FAILURE ACTION',
  props<{ errorMessage: string }>()
);
