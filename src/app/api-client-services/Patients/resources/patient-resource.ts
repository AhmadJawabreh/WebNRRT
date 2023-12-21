/*
 * Copyright (C) 2023 - present NRRT.
 * All rights reserved.
 */

export interface PatientResource {
  id: number;
  identity: string;
  firstName: string;
  fatherName: string;
  grandFatherName: string;
  familyName: string;
  age: number;
  monthlyIncome: number;
  gender: number;
  religion: number;
  address: string;
}
