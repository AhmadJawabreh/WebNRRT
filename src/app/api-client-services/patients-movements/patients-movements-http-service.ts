import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { headers } from 'src/app/shared/constent';
import { ResourceCollection } from 'src/app/shared/resource-collection';
import { Configuration } from '../config/configuration';
import { PatientMovementFilter } from './filters/patient-movemen-filter';
import { PatientMovementResource } from './resources/patient-movement-resource';
import { PatientMovementModel } from './models/patient-movement-model';

@Injectable({
  providedIn: 'root',
})
export class PatientsMovementsHttpService {
  constructor(private http: HttpClient) {}

  public getPatientsMovements(
    filter: PatientMovementFilter
  ): Observable<ResourceCollection<PatientMovementResource>> {
    return this.http.get<ResourceCollection<PatientMovementResource>>(
      Configuration.patientsMovementsURL,
      {
        headers: headers,
        params: {
          skip: filter.skip,
          take: filter.take,
        },
      }
    );
  }

  public getPatientMovement(id: number): Observable<PatientMovementResource> {
    return this.http.get<PatientMovementResource>(
      `${Configuration.patientsMovementsURL}/${id}`,
      { headers: headers }
    );
  }

  public create(
    model: PatientMovementModel
  ): Observable<PatientMovementResource> {
    return this.http.post<PatientMovementResource>(
      Configuration.patientsMovementsURL,
      JSON.stringify(model),
      { headers: headers }
    );
  }
  public update(
    id: number,
    model: PatientMovementModel
  ): Observable<PatientMovementResource> {
    return this.http.put<PatientMovementResource>(
      `${Configuration.patientsMovementsURL}/${id}`,
      JSON.stringify(model),
      { headers: headers }
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${Configuration.patientsMovementsURL}/${id}`,
      {
        headers: headers,
      }
    );
  }
}
