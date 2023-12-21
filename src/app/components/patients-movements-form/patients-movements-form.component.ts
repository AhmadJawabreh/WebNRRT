import { PatientFilter } from './../../api-client-services/patients/filters/PatientFilter';
import { PatientResource } from './../../api-client-services/patients/resources/patient-resource';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { PatientMovementModel } from 'src/app/api-client-services/patients-movements/models/patient-movement-model';
import { PatientMovementResource } from 'src/app/api-client-services/patients-movements/resources/patient-movement-resource';
import { PatientsMovementsService } from 'src/app/services/patients-movements.service';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients-movements-form',
  templateUrl: './patients-movements-form.component.html',
  styleUrls: ['./patients-movements-form.component.css'],
})
export class PatientsMovementsFormComponent implements OnInit {
  public title = 'Create Patient visti';
  public item = {} as PatientMovementModel | PatientMovementResource;
  public patients = [] as PatientResource[];
  public model = {} as PatientMovementModel;
  public form = {} as FormGroup;
  public patientHistoryId = 0;
  constructor(
    private readonly patientsService: PatientsService,
    private readonly patientsMovementsService: PatientsMovementsService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.patientsService.loadPatients({ skip: 0, take: 1000 } as PatientFilter);
    this.initializeForm();
    this.trackFormValues();
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    if (this.patientHistoryId) {
      this.patientsMovementsService.updatePatientMovements(
        this.patientHistoryId,
        this.model
      );
    } else {
      this.patientsMovementsService.createPatientMovements(this.model);
    }

    this.navigateBack();
  }

  public get isTakeDrugs(): boolean{
    const value = this.form.get('takeDrugs')?.value
    if(!value) {
      this.form.get('drugs')?.setValue(null);
    }
    return value;
  }

  public navigateBack(): void {
    this.router.navigate(['patients/vistis']);
  }

  private trackFormValues(): void {
    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe(
        (values) => (this.model = this.setPatientHistoryModel(values))
      );
  }

  private initializeForm(): void {
    this.patientHistoryId = Number.parseInt(
      this.route.snapshot.params['id'],
      10
    );

    this.patientsService.patients.subscribe((items) => (this.patients = items));

    if (this.patientHistoryId) {
      this.title = 'Edit Patient Visti';
      this.patientsMovementsService.patientsMovements.subscribe((items) => {
        this.item =
          items.find((item) => item.id === this.patientHistoryId) ??
          ({} as PatientMovementResource);
      });
    }

    this.setFormValues(this.item);
  }

  private setFormValues(item: PatientMovementModel): void {
    this.form = this.formBuilder.group({
      patientId: [item.patientId, Validators.required],
      checkIn: [item.checkIn?? new Date()],
      checkOut: [item.checkOut?? new Date()],
      clinicName: [item.clinicName, Validators.required],
      specialistName: [item.specialistName, Validators.required],
      medicalPlan: [item.medicalPlan?? ""],
      bloodPressure: [item.bloodPressure, Validators.required],
      heartBeats: [item.heartBeats, Validators.required],
      haveEdema: [this.getDefaultValue(item.haveEdema)],
      haveContrastMedia: [this.getDefaultValue(item.haveContrastMedia)],
      haveCardacCatherterization: [this.getDefaultValue(item.haveCardacCatherterization)],
      takeDrugs: [this.getDefaultValue(item.takeDrugs)],
      drugs: [item.drugs?? ""],
    });
  }

  private getDefaultValue(value: any) : boolean {
    return !(value === undefined || value === null || value === false)
  }

  private setPatientHistoryModel(
    model: PatientMovementModel
  ): PatientMovementModel {
    return {
      patientId: model.patientId,
      checkIn: model.checkIn,
      checkOut: model.checkOut,
      clinicName: model.clinicName,
      specialistName: model.specialistName,
      medicalPlan: model.medicalPlan,
      bloodPressure: model.bloodPressure,
      heartBeats: model.heartBeats,
      haveEdema: model.haveContrastMedia,
      haveContrastMedia: model.haveContrastMedia,
      haveCardacCatherterization: model.haveCardacCatherterization,
      takeDrugs: model.takeDrugs,
      drugs: model.drugs,
    } as PatientMovementModel;
  }
}
