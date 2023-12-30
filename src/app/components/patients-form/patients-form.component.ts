import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { PatientsService } from './../../services/patients.service';
import { PatientModel } from './../../api-client-services/patients/models/PatientModel';
import { PatientResource } from './../../api-client-services/patients/resources/patient-resource';

@Component({
  selector: 'app-patients-form',
  templateUrl: './patients-form.component.html',
  styleUrls: ['./patients-form.component.css'],
})
export class PatientsFormComponent implements OnInit, OnDestroy {
  public patientId = 0;
  public loaded = false;
  public title = 'Create Patient';
  public model = {} as PatientModel;
  public form = {} as FormGroup;
  public subscriptions = new Subscription();

  constructor(
    private readonly patientsService: PatientsService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.trackFormValues();
  }

  public async onSubmit(): Promise<void> {
    if (!this.form.valid) {
      return;
    }

    if (this.patientId) {
      this.patientsService.updatePatient(this.patientId, this.model);
    } else {
      this.patientsService.createPatient(this.model);
    }

    this.navigateBack();
  }

  public navigateBack(): void {
    this.router.navigate(['patients']);
  }

  private trackFormValues(): void {
    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((values) => (this.model = this.getPatientModel(values)));
  }

  private initializeForm(): void {
    let item = {} as PatientResource;

    this.patientId = Number.parseInt(this.route.snapshot.params['id'], 10);

    if (this.patientId) {
      this.title = 'Edit Patient';
      this.subscriptions.add(
        this.patientsService.patients.subscribe((items) => {
          if (items.length) {
            item =
              items.find((item) => item.id === this.patientId) ??
              ({} as PatientResource);
          }
        })
      );
    }

    this.setFormValues(item);
  }

  private setFormValues(item: PatientResource): void {
    this.form = this.formBuilder.group({
      firstName: [item.firstName ?? '', Validators.required],
      fatherName: [item.fatherName ?? '', Validators.required],
      grandFatherName: [item.grandFatherName ?? '', Validators.required],
      familyName: [item.familyName ?? '', Validators.required],
      identity: [item.identity ?? '', Validators.required],
      age: [item.age ?? 1, Validators.required],
      gender: [item.gender !== 1 ? 0 : 1, Validators.required],
      religion: [item.religion !== 1 ? 0 : 1, Validators.required],
      address: [item.address ?? '', Validators.required],
      monthlyIncome: [item.monthlyIncome ?? 1, Validators.required],
    });
  }

  private getPatientModel(model: PatientModel): PatientModel {
    return {
      identity: model.identity,
      firstName: model.firstName,
      fatherName: model.fatherName,
      grandFatherName: model.grandFatherName,
      familyName: model.familyName,
      age: model.age,
      gender:
        typeof model.gender === 'string'
          ? Number.parseInt(model.gender)
          : model.gender,
      religion:
        typeof model.religion === 'string'
          ? Number.parseInt(model.religion)
          : model.religion,
      address: model.address,
      monthlyIncome: model.monthlyIncome,
    } as PatientModel;
  }
}
