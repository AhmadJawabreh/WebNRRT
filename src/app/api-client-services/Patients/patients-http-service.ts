import { PatientFilter } from './../patients/filters/PatientFilter';
import { PatientResource } from './resources/patient-resource';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceCollection } from 'src/app/shared/resource-collection';
import { Configuration } from '../config/configuration';
import { Injectable } from '@angular/core';
import { PatientModel } from './models/PatientModel';

@Injectable({
  providedIn: 'root',
})
export class PatientHttpService {
  constructor(private http: HttpClient) {}

  public getPatients(
    filter: PatientFilter
  ): Observable<ResourceCollection<PatientResource>> {
    return this.http.get<ResourceCollection<PatientResource>>(
      Configuration.patientsURL,
      {
        headers: Configuration.headers,
        params: {
          skip: filter.skip,
          take: filter.take,
          id: filter.id ?? 0
        },
      }
    );
  }

  public getPatient(id: number): Observable<PatientResource> {
    return this.http.get<PatientResource>(
      `${Configuration.patientsURL}/${id}`,
      { headers: Configuration.headers}
    );
  }

  public create(model: PatientModel): Observable<PatientResource> {
    return this.http.post<PatientResource>(
      Configuration.patientsURL,
      JSON.stringify(model),
      { headers: Configuration.headers}
    );
  }
  public update(id: number, model: PatientModel): Observable<PatientResource> {
    return this.http.put<PatientResource>(
      `${Configuration.patientsURL}/${id}`,
      JSON.stringify(model),
      { headers: Configuration.headers}
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Configuration.patientsURL}/${id}`, {
      headers: Configuration.headers,
    });
  }
}
