import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { PatientFilter } from './../../api-client-services/patients/filters/PatientFilter';
import { PatientResource } from './../../api-client-services/patients/resources/patient-resource';
import { PatientsService } from './../../services/patients.service';
import { pageSize } from './../../shared/constent';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit, OnDestroy {
  public totalResult = 0;
  private selectedId = 0;
  public isLoading = true;
  public dataSource = [] as PatientResource[];
  public subscriptions = new Subscription();
  public displayedColumns: string[] = ['Name', 'Identity', 'Age', 'Actions'];

  constructor(
    private readonly patientsService: PatientsService,
    private readonly router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.patientsService.loadPatients({
      skip: 0,
      take: pageSize,
    } as PatientFilter);

    this.subscriptions.add(
      this.patientsService.isloading.subscribe(
        (isLoading: boolean) => (this.isLoading = isLoading)
      )
    );

    this.subscriptions.add(
      this.patientsService.patients.subscribe((items: PatientResource[]) => {
        this.dataSource = items;
      })
    );

    this.subscriptions.add(
      this.patientsService.totalResult.subscribe(
        (count) => (this.totalResult = count)
      )
    );
  }

  public openDailog(content: any, id: number) {
    this.selectedId = id;
    this.modalService.open(content);
  }

  public openCreationForm() {
    this.router.navigate([`patients/create`]);
  }

  public openModificationForm(id: number) {
    this.router.navigate([`patients/edit/${id}`]);
  }

  public deletePatient() {
    this.modalService.dismissAll();
    this.patientsService.deletePatient(this.selectedId);
  }

  public next(event: PageEvent) {
    this.patientsService.loadPatients({
      skip: event.pageIndex * pageSize,
      take: pageSize,
    } as PatientFilter);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
