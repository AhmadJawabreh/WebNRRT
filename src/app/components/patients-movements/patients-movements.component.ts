import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PatientMovementFilter } from 'src/app/api-client-services/patients-movements/filters/patient-movemen-filter';
import { PatientMovementResource } from 'src/app/api-client-services/patients-movements/resources/patient-movement-resource';
import { PatientsMovementsService } from 'src/app/services/patients-movements.service';
import { pageSize } from 'src/app/shared/constent';

@Component({
  selector: 'app-patients-movements',
  templateUrl: './patients-movements.component.html',
  styleUrls: ['./patients-movements.component.css'],
})
export class PatientsMovementsComponent implements OnInit {
  public displayedColumns: string[] = [
    'patientName',
    'patientIdentity',
    'checkIn',
    'checkOut',
    'clinicName',
    'Actions'
  ];
  public totalResult = 0;
  public dataSource = [] as PatientMovementResource[];
  private selectedId = 0;

  constructor(
    private readonly patientsMovementsService: PatientsMovementsService,
    private readonly router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.patientsMovementsService.loadPatientsMovements({
      skip: 0,
      take: pageSize,
    } as PatientMovementFilter);

    this.patientsMovementsService.patientsMovements.subscribe(
      (items: PatientMovementResource[]) => {
        this.dataSource = items;
      }
    );

    this.patientsMovementsService.totalResult.subscribe(
      (totalItems: number) => {
        this.totalResult = totalItems;
      }
    );
  }



  public next(event: PageEvent) {
    this.patientsMovementsService.loadPatientsMovements({
      skip: event.pageIndex * pageSize,
      take: pageSize,
    } as PatientMovementFilter);
  }

  public openCreationForm(): void {
    this.router.navigate([`patients/vistis/create`]);
  }

  public openModificationForm(id: number): void {
    this.router.navigate([`patients/vistis/edit/${id}`]);
  }

  public openDailog(content: any, id: number) {
    this.selectedId = id;
    this.modalService.open(content);
  }

  public deletePatientMovement(): void {
    this.modalService.dismissAll();
    this.patientsMovementsService.deletePatientMovements(this.selectedId);
  }
}
