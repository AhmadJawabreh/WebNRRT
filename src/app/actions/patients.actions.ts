import { createAction, props } from '@ngrx/store';
import { ResourceCollection } from '../shared/resource-collection';
import { PatientResource } from '../api-client-services/Patients/Resources/PatientResource';
import { PatientFilter } from '../api-client-services/Patients/Filters/PatientFilter';
import { PatientModel } from '../api-client-services/Patients/Models/PatientModel';

export const loadPatientsAction = createAction(
  '[PATIENTS] LOAD PATIENTS ACTION',
  props<{ filter: PatientFilter }>()
);

export const loadPatientsSuccessAction = createAction(
  '[PATIENTS] LOAD PATIENTS SUCCESS ACTION',
  props<{ response: ResourceCollection<PatientResource> }>()
);

export const loadPatientsFailureAction = createAction(
  '[PATIENTS] LOAD PATIENTS FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const createPatientAction = createAction(
  '[PATIENTS] CREATE PATIENT ACTION',
  props<{ model: PatientModel }>()
);

export const createPatientSuccessAction = createAction(
  '[PATIENTS] CREATE PATIENT SUCCESS ACTION',
  props<{ resource: PatientResource }>()
);

export const createPatientFailureAction = createAction(
  '[PATIENTS] CREATE PATIENT FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const updatePatientAction = createAction(
  '[PATIENTS] UPDATE PATIENT ACTION',
  props<{ model: PatientModel }>()
);

export const updatePatientSuccessAction = createAction(
  '[PATIENTS] UPDATE PATIENT SUCCESS ACTION',
  props<{ resource: PatientResource }>()
);

export const updatePatientFailureAction = createAction(
  '[PATIENTS] UPDATE PATIENT FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const deletePatientAction = createAction(
  '[PATIENTS] DELETE PATIENT ACTION',
  props<{ id: number }>()
);

export const deletePatientSuccessAction = createAction(
  '[PATIENTS] DELETE PATIENT SUCCESS ACTION',
  props<{ resource: PatientResource }>()
);

export const deletePatientFailureAction = createAction(
  '[PATIENTS] DELETE PATIENT FAILURE ACTION',
  props<{ errorMessage: string }>()
);
