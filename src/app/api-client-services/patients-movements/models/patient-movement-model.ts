export interface PatientMovementModel {
  patientId: number;
  checkIn: Date;
  checkOut: Date;
  departmentName: string;
  specialistName: string;
  medicalPlan: string;
  bloodPressure: number;
  heartBeats: number;
  haveEdema: boolean;
  haveContrastMedia: boolean;
  haveCardacCatherterization: boolean;
  takeDrugs: boolean;
  drugs: string;
}
