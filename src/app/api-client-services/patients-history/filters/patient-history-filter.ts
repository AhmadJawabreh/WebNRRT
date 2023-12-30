/*
 * Copyright (C) 2023 - present NRRT.
 * All rights reserved.
 */

export interface PatientHistoryFilter {
  skip: number;
  take: number;
  id: number
  hypertension: boolean;
  cancer: boolean;
  OpenHeartSurgery: boolean;
  AKI: boolean;
  Triage: boolean;
}
