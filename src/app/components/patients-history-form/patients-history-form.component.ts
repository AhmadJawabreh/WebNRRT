import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { PatientHistoryModel } from './../../api-client-services/patients-history/models/patient-history-model';
import { PatientHistoryResource } from './../../api-client-services/patients-history/resources/patient-history-resource';
import { PatientFilter } from './../../api-client-services/patients/filters/PatientFilter';
import { PatientResource } from './../../api-client-services/patients/resources/patient-resource';
import { PatientsHistoryService } from './../../services/patients-history.service';
import { PatientsService } from './../../services/patients.service';
import { PatientHistoryFilter } from './../../api-client-services/patients-history/filters/patient-history-filter';

@Component({
  selector: 'app-patients-history-form',
  templateUrl: './patients-history-form.component.html',
  styleUrls: ['./patients-history-form.component.css'],
})
export class PatientsHistoryFormComponent implements OnInit, OnDestroy {
  public title = 'Create Patient History';
  public item = {} as PatientHistoryModel;
  public patients = [] as PatientResource[];
  public model = {} as PatientHistoryModel;
  public form = {} as FormGroup;
  public patientHistoryId = 0;
  public subscriptions = [] as Subscription[];

  constructor(
    private readonly patientsHistoryService: PatientsHistoryService,
    private readonly patientsService: PatientsService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.patientsService.loadPatients({ skip: 0, take: 1000 } as PatientFilter);

    this.patientHistoryId = Number.parseInt(
      this.route.snapshot.params['id'],
      10
    );

    this.initializeForm({} as PatientHistoryModel);

    this.subscriptions.push(
      this.patientsService.patients.subscribe(
        (items) => (this.patients = items)
      )
    );

    if (this.patientHistoryId) {
      this.title = 'Edit Patient History';
      this.patientsHistoryService.loadPatientsHistory({
        skip: 0,
        take: 1,
        id: this.patientHistoryId,
      } as PatientHistoryFilter);
      this.subscriptions.push(
        this.patientsHistoryService.patientsHistory.subscribe((items) => {
          const resource =
            items.find((item) => item.id === this.patientHistoryId) ??
            ({} as PatientHistoryResource);
          this.item = this.mapResourceToModel(resource);
          this.initializeForm(this.item);
        })
      );
    }
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      return;
    }

    if (this.patientHistoryId) {
      this.patientsHistoryService.updatePatientHistory(
        this.patientHistoryId,
        this.model
      );
    } else {
      this.patientsHistoryService.createPatientHistory(this.model);
    }

    this.navigateBack();
  }

  public navigateBack(): void {
    this.router.navigate(['patients/history']);
  }

  private initializeForm(item: PatientHistoryModel): void {
    this.form = this.formBuilder.group({
      patientId: [item.patientId, Validators.required],
      AKI: [item.AKI ?? 0],
      GFR: [item.GFR ?? 0],
      height: [item.height ?? 1],
      weight: [item.weight ?? 0],
      hematuria: [item.hematuria ?? 0],
      anemia: [item.anemia ?? 0],
      regularMedications: [this.getDefaultValue(item.regularMedications)],
      serumCeratinine: [item.serumCeratinine ?? 0],
      proteinuria: [item.proteinuria ?? 0],
      hepatitis: [this.getDefaultValue(item.hepatitis)],
      diabetesMellitus: [this.getDefaultValue(item.diabetesMellitus)],
      hypertension: [this.getDefaultValue(item.hypertension)],
      openHeartSurgery: [this.getDefaultValue(item.openHeartSurgery)],
      previouskidneyDisease: [this.getDefaultValue(item.previouskidneyDisease)],
      cancer: [this.getDefaultValue(item.cancer)],
      heartFailure: [this.getDefaultValue(item.heartFailure)],
    });

    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe(
        (values) => (this.model = this.setPatientHistoryModel(values))
      );
  }

  private mapResourceToModel(resource: PatientHistoryResource) {
    return {
      patientId: resource.patient.id,
      AKI: resource.aki,
      GFR: resource.gfr,
      weight: resource.weight,
      height: resource.height,
      anemia: resource.anemia,
      proteinuria: resource.proteinuria,
      serumCeratinine: resource.serumCeratinine,
      hematuria: resource.hematuria,
      hepatitis: resource.hepatitis,
      diabetesMellitus: resource.diabetesMellitus,
      hypertension: resource.hypertension,
      openHeartSurgery: resource.openHeartSurgery,
      previouskidneyDisease: resource.previouskidneyDisease,
      regularMedications: resource.regularMedications,
      cancer: resource.cancer,
      heartFailure: resource.heartFailure,
    } as PatientHistoryModel;
  }

  private getDefaultValue(value: any) {
    return !(value === undefined || value === null || value === false);
  }

  private setPatientHistoryModel(
    model: PatientHistoryModel
  ): PatientHistoryModel {
    return {
      patientId: model.patientId,
      AKI: model.AKI,
      GFR: model.GFR,
      weight: model.weight,
      height: model.height,
      anemia: model.anemia,
      proteinuria: model.proteinuria,
      serumCeratinine: model.serumCeratinine,
      hematuria: model.hematuria,
      hepatitis: model.hepatitis,
      diabetesMellitus: model.diabetesMellitus,
      hypertension: model.hypertension,
      openHeartSurgery: model.openHeartSurgery,
      previouskidneyDisease: model.previouskidneyDisease,
      regularMedications: model.regularMedications,
      cancer: model.cancer,
      heartFailure: model.heartFailure,
    } as PatientHistoryModel;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((item) => item.unsubscribe());
  }
}
