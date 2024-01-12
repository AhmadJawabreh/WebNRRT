import { createAction, props } from "@ngrx/store";
import { ResourceCollection } from "../shared/resource-collection";
import { PatientHistoryResource } from "../api-client-services/patients-history/resources/patient-history-resource";
import { PatientHistoryFilter } from "../api-client-services/patients-history/filters/patient-history-filter";
import { PatientHistoryModel } from "../api-client-services/patients-history/models/patient-history-model";

export const loadPatientsHistoryAction = createAction(
  '[PATIENTS HISTORY] LOAD PATIENTS HISTORY ACTION',
  props<{ filter: PatientHistoryFilter }>()
);

export const loadPatientsHistorySuccessAction = createAction(
  '[PATIENTS HISTORY] LOAD PATIENTS HISTORY SUCCESS ACTION',
  props<{ response: ResourceCollection<PatientHistoryResource> }>()
);

export const loadPatientsHistoryFailureAction = createAction(
  '[PATIENTS HISTORY] LOAD PATIENTS HISTORY FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const createPatientHistoryAction = createAction(
  '[PATIENTS HISTORY] CREATE PATIENT HISTORY ACTION',
  props<{ model: PatientHistoryModel }>()
);

export const createPatientHistorySuccessAction = createAction(
  '[PATIENTS HISTORY] CREATE PATIENT HISTORY SUCCESS ACTION',
  props<{ resource: PatientHistoryResource }>()
);

export const createPatientHistoryFailureAction = createAction(
  '[PATIENTS HISTORY] CREATE PATIENT HISTORY FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const updatePatientHistoryAction = createAction(
  '[PATIENTS HISTORY] UPDATE PATIENT HISTORY ACTION',
  props<{ id: number, model: PatientHistoryModel }>()
);

export const updatePatientHistorySuccessAction = createAction(
  '[PATIENTS HISTORY] UPDATE PATIENT HISTORY SUCCESS ACTION',
  props<{ resource: PatientHistoryResource }>()
);

export const updatePatientHistoryFailureAction = createAction(
  '[PATIENTS HISTORY] UPDATE PATIENT HISTORY FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const deletePatientHistoryAction = createAction(
  '[PATIENTS HISTORY] DELETE PATIENT HISTORY ACTION',
  props<{ id: number }>()
);

export const deletePatientHistorySuccessAction = createAction(
  '[PATIENTS HISTORY] DELETE PATIENT HISTORY SUCCESS ACTION',
  props<{ id: number }>()
);

export const deletePatientHistoryFailureAction = createAction(
  '[PATIENTS HISTORY] DELETE PATIENT HISTORY FAILURE ACTION',
  props<{ errorMessage: string }>()
);
