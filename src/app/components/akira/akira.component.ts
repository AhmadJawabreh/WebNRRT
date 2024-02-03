import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { pageSize } from 'src/app/shared/constent';
import { AcuteKidneyInjuryRiskAssessmentFilter } from './../../api-client-services/acute-kidney-injury-risk-assessment/filters/acute-kidney-injur-risk-assessment-filter';
import { AcuteKidneyInjuryRiskAssessmentResource } from './../../api-client-services/acute-kidney-injury-risk-assessment/resources/acute-kidney-injur-risk-assessment-resource';
import { AcuteKidneyInjuryRiskAssessmentsService } from './../../services/acute-kidney-injury-risk-assessment.service';

@Component({
  selector: 'app-akira',
  templateUrl: './akira.component.html',
  styleUrls: ['./akira.component.css'],
})
export class AKIRAComponent implements OnInit {
  public totalResult = 0;
  private selectedId = 0;
  public isLoading = true;
  public dataSource = [] as AcuteKidneyInjuryRiskAssessmentResource[];
  public subscriptions = new Subscription();
  public displayedColumns: string[] = ['Name', 'Identity', 'Triage', 'Actions'];

  constructor(
    private readonly aKIRAService: AcuteKidneyInjuryRiskAssessmentsService,
    private readonly router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.aKIRAService.loaAcuteKidneyInjuryRiskAssessments({
      skip: 0,
      take: pageSize,
    } as AcuteKidneyInjuryRiskAssessmentFilter);

    this.subscriptions.add(
      this.aKIRAService.isloading.subscribe(
        (isLoading: boolean) => (this.isLoading = isLoading)
      )
    );

    this.subscriptions.add(
      this.aKIRAService.acuteKidneyInjuryRiskAssessments.subscribe(
        (items: AcuteKidneyInjuryRiskAssessmentResource[]) => {
          this.dataSource = items;
        }
      )
    );

    this.subscriptions.add(
      this.aKIRAService.totalResult.subscribe(
        (count) => (this.totalResult = count)
      )
    );
  }

  public openDailog(content: any, id: number) {
    this.selectedId = id;
    this.modalService.open(content);
  }

  public openCreationForm() {
    this.router.navigate([`patient/akira/create`]);
  }

  public openModificationForm(id: number) {
    this.router.navigate([`patient/akira/edit/${id}`]);
  }

  public deletePatient() {
    this.modalService.dismissAll();
    this.aKIRAService.deleteAcuteKidneyInjuryRiskAssessment(this.selectedId);
  }

  public next(event: PageEvent) {
    this.aKIRAService.loaAcuteKidneyInjuryRiskAssessments({
      skip: event.pageIndex * pageSize,
      take: pageSize,
    } as AcuteKidneyInjuryRiskAssessmentFilter);
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
