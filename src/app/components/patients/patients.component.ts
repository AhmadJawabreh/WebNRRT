import { PatientResource } from './../../api-client-services/Patients/Resources/PatientResource';
import { PatientFilter } from './../../api-client-services/Patients/Filters/PatientFilter';
import { Component, Input, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/services/patients.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit {
  @Input() selectedItem: string | undefined;

  public patients: PatientResource[] = [];
  private filter = {} as PatientFilter;

  constructor(private patientsService: PatientsService) {}

  ngOnInit(): void {
    this.patientsService.loadPatients(this.filter);

    this.patientsService.patients.subscribe((items: PatientResource[]) => {
      this.patients = items;
    });
  }
}
