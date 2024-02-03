import { PatientHistoryModel } from './../../api-client-services/patients-history/models/patient-history-model';
import { PatientResource } from 'src/app/api-client-services/patients/resources/patient-resource';
import { AcuteKidneyInjuryRiskAssessmentFilter } from './../../api-client-services/acute-kidney-injury-risk-assessment/filters/acute-kidney-injur-risk-assessment-filter';
import { AcuteKidneyInjuryRiskAssessmentModel } from './../../api-client-services/acute-kidney-injury-risk-assessment/models/acute-kidney-injur-risk-assessment-model';
import { AcuteKidneyInjuryRiskAssessmentsService } from './../../services/acute-kidney-injury-risk-assessment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientsService } from './../../services/patients.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { AcuteKidneyInjuryRiskAssessmentResource } from 'src/app/api-client-services/acute-kidney-injury-risk-assessment/resources/acute-kidney-injur-risk-assessment-resource';
import { PatientFilter } from 'src/app/api-client-services/patients/filters/PatientFilter';

@Component({
  selector: 'app-akira-form',
  templateUrl: './akira-form.component.html',
  styleUrls: ['./akira-form.component.css'],
})
export class AKIRAFormComponent implements OnInit, OnDestroy {
  public aKIRAId = 0;
  public loaded = false;
  public title = 'Create Acute Kidney Injury Risk Assessment';
  public model = {} as AcuteKidneyInjuryRiskAssessmentModel;
  public patients = [] as PatientResource[];
  public form = {} as FormGroup;
  public subscriptions = [] as Subscription[];
  public item = {} as PatientHistoryModel;

  constructor(
    private readonly aKIRAService: AcuteKidneyInjuryRiskAssessmentsService,
    private readonly patientsService: PatientsService,
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.aKIRAId = Number.parseInt(this.route.snapshot.params['id'], 10);
    this.initializeForm({} as AcuteKidneyInjuryRiskAssessmentResource);
    this.patientsService.loadPatients({skip: 0, take: 10000} as PatientFilter)
    this.subscriptions.push(
      this.patientsService.patients.subscribe((items: PatientResource[]) => {
        this.patients = items;
      })
    );

    if (this.aKIRAId) {
      this.title = 'Edit Acute Kidney Injury Risk Assessment';
      this.aKIRAService.loaAcuteKidneyInjuryRiskAssessments({skip:0, take:1, id: this.aKIRAId } as AcuteKidneyInjuryRiskAssessmentFilter);
      this.subscriptions.push(
        this.aKIRAService.acuteKidneyInjuryRiskAssessments.subscribe((items) => {
          if (items.length) {
            const item =
              items.find((item) => item.id === this.aKIRAId) ??
              ({} as AcuteKidneyInjuryRiskAssessmentResource);
              this.initializeForm(item);
          }
        })
      );
    }
  }

  private initializeForm(item: AcuteKidneyInjuryRiskAssessmentResource): void {
    this.form = this.formBuilder.group({
      patientId: [item.patient?.id, Validators.required],
      hasBurns: [item.hasBurns ?? false],
      burnsDeatis: [item.burnsDeatis ?? ''],
      hasCDK: [item.hasCDK ?? false],
      cDKDeatils: [item.cDKDeatils ?? '',],
      hasCancer: [item.hasCancer ?? false],
      cancerDeatils: [item.cancerDeatils ?? ''],
      hasCardiacSurgery: [item.hasCardiacSurgery ?? false],
      hasCirculatoryShock: [item.hasCirculatoryShock ?? false],
      circulatoryShockDeatils: [item.circulatoryShockDeatils ?? ''],
      hasDehydration: [item.hasDehydration ?? false],
      dehydrationsDeatils: [item.dehydrationsDeatils ?? ''],
      diabetesMellitus: [item.diabetesMellitus ?? false],
      diabetesMellitusDeatils: [item.diabetesMellitusDeatils ?? ''],
      hasCriticalIllness: [item.hasCriticalIllness ?? false],
      criticalIllnessDeatils: [item.criticalIllnessDeatils ?? ''],
      hasHeartDisease: [item.hasHeartDisease ?? false],
      hearDiseasetDeatils: [item.hearDiseasetDeatils ?? ''],
      hasLiverDisease: [item.hasLiverDisease ?? false],
      liverDiseaseDeatils: [item.liverDiseaseDeatils ?? ''],
      hasLungDisease: [item.hasLungDisease ?? false],
      lungDiseaseDeatils: [item.lungDiseaseDeatils ?? ''],
      hasMajorNoncardiacSurgery: [item.hasMajorNoncardiacSurgery ?? false],
      majorNoncardiacSurgeryDeatils: [item.majorNoncardiacSurgeryDeatils ?? ''],
      hasNephrotoxicDrugs: [item.hasNephrotoxicDrugs ?? false],
      nephrotoxicDrugsDeatils: [item.nephrotoxicDrugsDeatils ?? ''],
      hasPoisonousPlantesAndAnimals: [item.hasPoisonousPlantesAndAnimals ?? false],
      poisonousPlantesAndAnimalsDeatils: [item.poisonousPlantesAndAnimalsDeatils ?? ''],
      hasRadiocontrastAgents: [item.hasRadiocontrastAgents ?? false],
      radiocontrastAgentsDeatils: [item.radiocontrastAgentsDeatils ?? ''],
      hasSepsis: [item.hasSepsis ?? false],
      sepsisDetails: [item.sepsisDetails ?? ''],
      trauma: [item.trauma ?? false],
      traumaDeatils: [item.traumaDeatils ?? ''],
      anemia: [item.anemia],
      blackRace: [item.blackRace ?? false],
      serumCeratinine: [item.serumCeratinine]
    });

    this.subscriptions.push(
      this.form.valueChanges
      .pipe(filter(() => this.form.valid))
      .subscribe((values) => {
        this.model = this.getPatientModel(values)
      })
    );
  }

  private getPatientModel(model: AcuteKidneyInjuryRiskAssessmentModel): AcuteKidneyInjuryRiskAssessmentModel {
    return {
      patientId: model.patientId,
      hasBurns: model.hasBurns,
      burnsDeatis: model.burnsDeatis,
      hasCDK:model.hasCDK,
      cDKDeatils: model.cDKDeatils,
      hasCancer: model.hasCancer,
      cancerDeatils:model.cancerDeatils,
      hasCardiacSurgery: model.hasCardiacSurgery,
      hasCirculatoryShock: model.hasCirculatoryShock,
      circulatoryShockDeatils:model.circulatoryShockDeatils,
      hasDehydration: model.hasDehydration,
      dehydrationsDeatils: model.dehydrationsDeatils,
      diabetesMellitus:model.diabetesMellitus,
      diabetesMellitusDeatils: model.diabetesMellitusDeatils,
      hasCriticalIllness: model.hasCriticalIllness,
      criticalIllnessDeatils: model.criticalIllnessDeatils,
      hasHeartDisease: model.hasHeartDisease,
      hearDiseasetDeatils:model.hearDiseasetDeatils,
      hasLiverDisease: model.hasLiverDisease,
      liverDiseaseDeatils: model.liverDiseaseDeatils,
      hasLungDisease: model.hasLungDisease,
      lungDiseaseDeatils: model.lungDiseaseDeatils,
      hasMajorNoncardiacSurgery: model.hasMajorNoncardiacSurgery,
      majorNoncardiacSurgeryDeatils: model.majorNoncardiacSurgeryDeatils,
      hasNephrotoxicDrugs: model.hasNephrotoxicDrugs,
      nephrotoxicDrugsDeatils: model.nephrotoxicDrugsDeatils,
      hasPoisonousPlantesAndAnimals: model.hasPoisonousPlantesAndAnimals,
      poisonousPlantesAndAnimalsDeatils: model.poisonousPlantesAndAnimalsDeatils,
      hasRadiocontrastAgents: model.hasRadiocontrastAgents,
      radiocontrastAgentsDeatils: model.radiocontrastAgentsDeatils,
      hasSepsis: model.hasSepsis,
      sepsisDetails: model.sepsisDetails,
      anemia: model.anemia,
      serumCeratinine: model.serumCeratinine,
      blackRace: model.blackRace,
      trauma: model.trauma,
      traumaDeatils: model.traumaDeatils,
      triage: model.triage,
    } as AcuteKidneyInjuryRiskAssessmentModel;
  }
  public onSubmit(): void {
    if (this.form.valid) {
      if (this.aKIRAId) {
        this.aKIRAService.updateAcuteKidneyInjuryRiskAssessment(
          this.aKIRAId,
          this.model
        );
      } else {
        this.aKIRAService.createAcuteKidneyInjuryRiskAssessment(this.model);
      }
    }
    this.navigateBack();
  }

  public navigateBack(): void {
    this.router.navigate(['patient/akira']);
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(item => item.unsubscribe());
  }
}
