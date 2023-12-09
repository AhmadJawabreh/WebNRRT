import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PatientsService } from 'src/app/services/patients.service';
import { PatientFilter } from './../../api-client-services/Patients/Filters/PatientFilter';
import { PatientResource } from './../../api-client-services/Patients/Resources/PatientResource';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  public patients: PatientResource[] = [];

  private filter = {} as PatientFilter;
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
    this.patientsService.loadPatients(this.filter);
    this.patientsService.patients.subscribe((items: PatientResource[]) => {
      this.patients = items;
    });
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
}
