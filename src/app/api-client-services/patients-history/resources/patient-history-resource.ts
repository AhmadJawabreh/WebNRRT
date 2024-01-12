import { PatientResource } from './../../patients/resources/patient-resource';
/*
 * Copyright (C) 2023 - present NRRT.
 * All rights reserved.
 */

export interface PatientHistoryResource {
  id: number;
  bmi: number;
  serumCeratinine: number;
  weight: number;
  height: number;
  anemia: number;
  proteinuria: number;
  hematuria: number;
  aki: number;
  gfr: number;
  diabetesMellitus: boolean;
  hypertension: boolean;
  previouskidneyDisease: boolean;
  heartFailure: boolean;
  hepatitis: boolean;
  cancer: boolean;
  regularMedications: boolean;
  openHeartSurgery: boolean;
  triage: boolean;
  patient: PatientResource;
}
