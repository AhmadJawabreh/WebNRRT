export interface PatientMovementFilter {
  skip: number;
  take: number;
  CheckIn: Date;
  CheckOut: Date;
  ClinicName: string;
  SpecialistName: string;
}
