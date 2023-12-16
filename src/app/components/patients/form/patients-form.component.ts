import { PatientsService } from 'src/app/services/patients.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs';
import { PatientModel } from 'src/app/api-client-services/Patients/Models/PatientModel';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientResource } from 'src/app/api-client-services/Patients/Resources/PatientResource';

@Component({
  selector: 'app-patients-form',
  templateUrl: './patients-form.component.html',
  styleUrls: ['./patients-form.component.css'],
})
export class PatientsFormComponent implements OnInit {
  public title = 'Create Patient';
  public model = {} as PatientModel;
  public form = {} as FormGroup;
  public patientId = 0;

  constructor(
    private readonly patientsService: PatientsService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public isValid(name: string): boolean {
    const control = this.form.get(name);
    return control?.hasError('required') && control.touched? true: false;
  }
  public ngOnInit(): void {
    this.initializeForm();
    this.trackFormValues();
  }

  public onSubmit(): void {
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
    this.router.navigate(['..']);
  }

  private trackFormValues(): void {
    this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((values) => (this.model = this.setPatientModel(values)));
  }

  private initializeForm(): void {
    let item = {} as PatientResource;
    this.patientId = Number.parseInt(this.route.snapshot.params['id'], 10);

    if (this.patientId) {
      this.patientsService.patients.subscribe((items) => {
        item =
          items.find((item) => item.id === this.patientId) ??
          ({} as PatientResource);
      });
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
      age: [item.age ?? null, Validators.required],
      gender: [item.gender ?? 0, Validators.required],
      religion: [item.religion ?? 0, Validators.required],
      address: [item.address ?? null, Validators.required],
      monthlyIncome: [item.monthlyIncome ?? null, Validators.required],
    });
  }

  private setPatientModel(model: PatientModel): PatientModel {
    return {
      identity: model.identity,
      firstName: model.firstName,
      fatherName: model.fatherName,
      grandFatherName: model.grandFatherName,
      familyName: model.familyName,
      age: model.age,
      gender: typeof(model.gender) === "string" ? Number.parseInt(model.gender) : model.gender,
      religion: typeof(model.religion) === "string" ? Number.parseInt(model.religion) : model.religion,
      address: model.address,
      monthlyIncome: model.monthlyIncome
    } as PatientModel;
  }
}
