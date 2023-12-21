/*
 * Copyright (C) 2023 - present NRRT.
 * All rights reserved.
 */

export interface PatientHistoryModel {
  patientId: number;
  weight: number;
  height: number;
  serumCeratinine: number;
  anemia: number;
  proteinuria: number;
  hematuria: number;
  AKI: number;
  GFR: number;
  diabetesMellitus: boolean;
  hypertension: boolean;
  previouskidneyDisease: boolean;
  heartFailure: boolean;
  hepatitis: boolean;
  cancer: boolean;
  regularMedications: boolean;
  openHeartSurgery: boolean;
}
