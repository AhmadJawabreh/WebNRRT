import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PatientHistoryFilter } from './../../api-client-services/patients-history/filters/patient-history-filter';
import { PatientHistoryResource } from './../../api-client-services/patients-history/resources/patient-history-resource';
import { PatientsHistoryService } from './../../services/patients-history.service';
import { pageSize } from './../../shared/constent';

@Component({
  selector: 'app-patients-history-form',
  templateUrl: './patients-history.component.html',
  styleUrls: ['./patients-history.component.css'],
})
export class PatientsHistoryComponent implements OnInit {
  public displayedColumns: string[] = [
    'Name',
    'BMI',
    'AKI',
    'GFR',
    'Anemia',
    'Cancer',
    'Hepatitis',
    'Triage',
    'Actions'
  ];
  public isLoading = true;
  public totalResult = 0;
  public dataSource = [] as PeriodicElement[];
  private selectedId = 0;
  constructor(
    private readonly patientsHistoryService: PatientsHistoryService,
    private readonly router: Router,
    private readonly config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  ngOnInit(): void {
    this.patientsHistoryService.loadPatientsHistory({
      skip: 0,
      take: pageSize,
    } as PatientHistoryFilter);

    this.patientsHistoryService.isloading.subscribe((isLoading: boolean) => this.isLoading = isLoading);

    this.patientsHistoryService.totalResult.subscribe((totalItems: number) => {
      this.totalResult = totalItems;
    });

    this.patientsHistoryService.patientsHistory.subscribe((items: PatientHistoryResource[])  => {
      this.dataSource = items.map(item =>  (
        {
          id: item.id,
          name: item.patient.firstName + ' ' +item.patient.familyName,
          BMI: item.height ? item.weight/(Math.pow(item.height, 2)) : 'N/A',
          AKI: item.aki ? item.aki : 'N/A',
          GFR: item.gfr? item.gfr : 'N/A',
          anemia: item.anemia,
          cancer: item.cancer? 'Yes' : 'No',
          hepatitis: item.hepatitis? 'Yes' : 'No',
          triage: item.triage? 'Yes' : 'No',
          patientId: item.patient.id
        } as PeriodicElement
      ));
    });
  }

  public next(event: PageEvent) {
    this.patientsHistoryService.loadPatientsHistory({
      skip: event.pageIndex * pageSize,
      take: pageSize,
    } as PatientHistoryFilter);
  }

  public openCreationForm(): void {
    this.router.navigate([`patients/history/create`]);
  }

  public openModificationForm(id: number): void {
    this.router.navigate([`patients/history/edit/${id}`]);
  }

  public openDailog(content: any, id: number) {
    this.selectedId = id;
    this.modalService.open(content);
  }

  public deletePatientHistory(): void {
    this.modalService.dismissAll();
    this.patientsHistoryService.deletePatientHistory(this.selectedId);
  }
}

export interface PeriodicElement {
  name: string;
  BMI: string;
  AKI: string;
  GFR: string;
  anemia: number;
  cancer: string;
  hepatitis: string;
  triage: string;
}
