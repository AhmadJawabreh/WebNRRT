/*
 * Copyright (C) 2023 - present NRRT.
 * All rights reserved.
 */

import { TeamResource } from "../../teams/Resources/team-resource";

export interface PatientResource {
  id: number;
  identity: string;
  firstName: string;
  fatherName: string;
  grandFatherName: string;
  familyName: string;
  age: number;
  phoneNumber: string;
  educationLevel: number;
  monthlyIncome: number;
  gender: number;
  religion: number;
  address: string;
  team: TeamResource;
}
