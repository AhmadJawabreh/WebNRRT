export interface PatientMovementFilter {
  id: number;
  skip: number;
  take: number;
  CheckIn: Date;
  CheckOut: Date;
  ClinicName: string;
  SpecialistName: string;
}
