import { PatientFilter } from './../../api-client-services/patients/filters/PatientFilter';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PatientsService } from 'src/app/services/patients.service';
import { PageEvent } from '@angular/material/paginator';
import { pageSize } from 'src/app/shared/constent';
import { PatientResource } from 'src/app/api-client-services/patients/resources/patient-resource';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  public patients: PatientResource[] = [];
  public totalResult = 0;

  private selectedId = 0;

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
    this.patientsService.loadPatients({ skip: 0, take: pageSize } as PatientFilter);
    this.patientsService.patients.subscribe((items: PatientResource[]) => {
      this.patients = items;
    });
    this.patientsService.totalResult.subscribe(
      (count) => (this.totalResult = count)
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
}
