import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { PatientMovementModel } from './../../api-client-services/patients-movements/models/patient-movement-model';
import { PatientMovementResource } from './../../api-client-services/patients-movements/resources/patient-movement-resource';
import { PatientFilter } from './../../api-client-services/patients/filters/PatientFilter';
import { PatientResource } from './../../api-client-services/patients/resources/patient-resource';
import { PatientsMovementsService } from './../../services/patients-movements.service';
import { PatientsService } from './../../services/patients.service';
import { PatientMovementFilter } from 'src/app/api-client-services/patients-movements/filters/patient-movemen-filter';

@Component({
  selector: 'app-patients-movements-form',
  templateUrl: './patients-movements-form.component.html',
  styleUrls: ['./patients-movements-form.component.css'],
})
export class PatientsMovementsFormComponent implements OnInit, OnDestroy {
  public patientMovementId = 0;
  public title = 'Create Patient visti';
  public item = {} as PatientMovementModel | PatientMovementResource;
  public patients = [] as PatientResource[];
  public model = {} as PatientMovementModel;
  public form = {} as FormGroup;
  public subscriptions = [] as Subscription[];

  constructor(
    private readonly patientsService: PatientsService,
    private readonly patientsMovementsService: PatientsMovementsService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.patientsService.loadPatients({
      skip: 0,
      take: 10000,
    } as PatientFilter);

    this.patientMovementId = Number.parseInt(
      this.route.snapshot.params['id'],
      10
    );

    this.initializeForm({} as PatientMovementResource);

    this.subscriptions.push(
      this.patientsService.patients.subscribe(
        (items) => (this.patients = items)
      )
    );

    if (this.patientMovementId) {
      this.title = 'Edit Patient Visti';

      this.patientsMovementsService.loadPatientsMovements({
        skip: 0,
        take: 1,
        id: this.patientMovementId,
      } as PatientMovementFilter);

      this.subscriptions.push(
        this.patientsMovementsService.patientsMovements.subscribe((items) => {
          this.item =
            items.find((item) => item.id === this.patientMovementId) ??
            ({} as PatientMovementResource);
          this.initializeForm(this.item);
        })
      );
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      if (this.patientMovementId) {
        this.patientsMovementsService.updatePatientMovements(
          this.patientMovementId,
          this.model
        );
      } else {
        this.patientsMovementsService.createPatientMovements(this.model);
      }
    }
    this.navigateBack();
  }

  public get isTakeDrugs(): boolean {
    const value = this.form.get('takeDrugs')?.value;
    if (!value) {
      this.form.get('drugs')?.setValue(null);
    }
    return value;
  }

  public navigateBack(): void {
    this.router.navigate(['patients/vistis']);
  }

  public validateCheckInAndOutDates() {
    const checkIn = this.form.get('checkIn');
    const checkOut = this.form.get('checkOut');
    const startDate = checkIn?.value as Date;
    const endDate = checkOut?.value as Date;

    if (startDate > endDate) {
      checkOut?.setErrors([`error`]);
    } else {
      checkOut?.setErrors(null);
    }
  }

  private initializeForm(
    item: PatientMovementResource | PatientMovementModel
  ): void {
    this.form = this.formBuilder.group({
      patientId: [item.patientId, Validators.required],
      checkIn: [item.checkIn ?? new Date()],
      checkOut: [item.checkOut ?? new Date()],
      clinicName: [item.departmentName, Validators.required],
      specialistName: [item.specialistName, Validators.required],
      medicalPlan: [item.medicalPlan ?? ''],
      bloodPressure: [item.bloodPressure, Validators.required],
      heartBeats: [item.heartBeats, Validators.required],
      haveEdema: [this.getDefaultValue(item.haveEdema)],
      haveContrastMedia: [this.getDefaultValue(item.haveContrastMedia)],
      haveCardacCatherterization: [
        this.getDefaultValue(item.haveCardacCatherterization),
      ],
      takeDrugs: [this.getDefaultValue(item.takeDrugs)],
      drugs: [item.drugs ?? ''],
    });

    this.subscriptions.push(
      this.form.valueChanges
        .pipe(filter(() => this.form.valid))
        .subscribe(
          (values) => (this.model = this.getPatientMovementModel(values))
        )
    );
  }

  private getDefaultValue(value: any): boolean {
    return !(value === undefined || value === null || value === false);
  }

  private getPatientMovementModel(
    model: PatientMovementModel
  ): PatientMovementModel {
    return {
      patientId: model.patientId,
      checkIn: model.checkIn,
      checkOut: model.checkOut,
      departmentName: model.departmentName,
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
