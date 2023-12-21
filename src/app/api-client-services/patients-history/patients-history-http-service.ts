import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { headers } from 'src/app/shared/constent';
import { ResourceCollection } from 'src/app/shared/resource-collection';
import { Configuration } from '../config/configuration';
import { PatientHistoryFilter } from './filters/patient-history-filter';
import { PatientHistoryModel } from './models/patient-history-model';
import { PatientHistoryResource } from './resources/patient-history-resource';

@Injectable({
  providedIn: 'root',
})
export class PatientsHisotryHttpService {
  constructor(private http: HttpClient) {}

  public getPatients(
    filter: PatientHistoryFilter
  ): Observable<ResourceCollection<PatientHistoryResource>> {
    return this.http.get<ResourceCollection<PatientHistoryResource>>(
      Configuration.patientsHistoryURL,
      {
        headers: headers,
        params: {
          skip: filter.skip,
          take: filter.take,
        },
      }
    );
  }

  public getPatient(id: number): Observable<PatientHistoryResource> {
    return this.http.get<PatientHistoryResource>(
      `${Configuration.patientsHistoryURL}/${id}`,
      { headers: headers }
    );
  }

  public create(
    model: PatientHistoryModel
  ): Observable<PatientHistoryResource> {
    return this.http.post<PatientHistoryResource>(
      Configuration.patientsHistoryURL,
      JSON.stringify(model),
      { headers: headers }
    );
  }
  public update(
    id: number,
    model: PatientHistoryModel
  ): Observable<PatientHistoryResource> {
    return this.http.put<PatientHistoryResource>(
      `${Configuration.patientsHistoryURL}/${id}`,
      JSON.stringify(model),
      { headers: headers }
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Configuration.patientsHistoryURL}/${id}`, {
      headers: headers,
    });
  }
}
