import { TeamModel } from 'src/app/api-client-services/teams/models/team-model';
import { TeamsService } from 'src/app/services/teams.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { PatientsService } from './../../services/patients.service';
import { PatientModel } from './../../api-client-services/patients/models/PatientModel';
import { PatientResource } from './../../api-client-services/patients/resources/patient-resource';
import { PatientFilter } from './../../api-client-services/patients/filters/PatientFilter';
import { TeamFilter } from 'src/app/api-client-services/teams/filters/team-filter';
import { TeamResource } from 'src/app/api-client-services/teams/Resources/team-resource';

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
  public subscriptions = [] as Subscription[];
  public teams = [] as TeamResource[];
  public team = {} as TeamResource;
  public educationLevel = 0;


  constructor(
    private readonly patientsService: PatientsService,
    private readonly teamService: TeamsService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.patientId = Number.parseInt(this.route.snapshot.params['id'], 10);
    this.initializeForm({} as PatientResource);
    this.teamService.loadTeams({skip: 0, take: 10000} as TeamFilter);
    this.subscriptions.push(
      this.teamService.teams.subscribe((teams) => {
        this.teams = teams;
      })
    );

    if (this.patientId) {
      this.title = 'Edit Patient';
      this.patientsService.loadPatients({skip:0, take:1, id: this.patientId } as PatientFilter);
      this.subscriptions.push(
        this.patientsService.patients.subscribe((items) => {
          if (items.length) {
            const item =
              items.find((item) => item.id === this.patientId) ??
              ({} as PatientResource);
              this.initializeForm(item);
              this.educationLevel = item.educationLevel;
          }
        })
      );
    }
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

  private initializeForm(item: PatientResource): void {
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
      educationLevel: [item.educationLevel ?? 0, Validators.required],
      phoneNumber : [item.phoneNumber ?? '', Validators.required],
      teamId : [item.team?.id ?? null, Validators.required]
    });

    this.subscriptions.push(
      this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((values) => {
        this.model = this.getPatientModel(values)
      })
    );
  }

  private getPatientModel(model: PatientModel): PatientModel {
    return {
      identity: model.identity,
      firstName: model.firstName,
      fatherName: model.fatherName,
      grandFatherName: model.grandFatherName,
      familyName: model.familyName,
      age: model.age,
      educationLevel: model.educationLevel,
      phoneNumber: model.phoneNumber,
      teamId: model.teamId,
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
  ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
