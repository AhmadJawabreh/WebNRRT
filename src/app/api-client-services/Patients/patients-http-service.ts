import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceCollection } from 'src/app/shared/resource-collection';
import { PatientFilter } from './Filters/PatientFilter';
import { PatientModel } from './Models/PatientModel';
import { PatientResource } from './Resources/PatientResource';
import { Configuration } from '../config/configuration';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PatientHttpService {
  private headers: HttpHeaders = new HttpHeaders()
    .append('Content-Type', 'application/json; charset=utf8')
    .append('Authorization', Configuration.token);

  constructor(private http: HttpClient) {}

  public getPatients(
    filter: PatientFilter
  ): Observable<ResourceCollection<PatientResource>> {
    return this.http.get<ResourceCollection<PatientResource>>(
      Configuration.patientsURL,
      {
        headers: this.headers,
        params: { filter: JSON.stringify(filter) },
      }
    );
  }

  public getPatient(id: number): Observable<PatientResource> {
    return this.http.get<PatientResource>(
      `${Configuration.patientsURL}/${id}`,
      { headers: this.headers }
    );
  }

  public create(model: PatientModel): Observable<PatientResource> {
    return this.http.post<PatientResource>(Configuration.patientsURL,  JSON.stringify(model), { headers: this.headers });
  }
  public update(id: number, model: PatientModel): Observable<PatientResource> {
    return this.http.put<PatientResource>(
      `${Configuration.patientsURL}/${id}`,
      JSON.stringify(model),
      { headers: this.headers }
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Configuration.patientsURL}/${id}`, {
      headers: this.headers,
    });
  }
}
