import { AcuteKidneyInjuryRiskAssessmentModel } from './models/acute-kidney-injur-risk-assessment-model';
import { AcuteKidneyInjuryRiskAssessmentResource } from './resources/acute-kidney-injur-risk-assessment-resource';
import { AcuteKidneyInjuryRiskAssessmentFilter } from './filters/acute-kidney-injur-risk-assessment-filter';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourceCollection } from 'src/app/shared/resource-collection';
import { Configuration } from '../config/configuration';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AcuteKidneyInjuryRiskAssessmentHttpService {
  constructor(private http: HttpClient) {}

  public getAKIRAs(
    filter: AcuteKidneyInjuryRiskAssessmentFilter
  ): Observable<ResourceCollection<AcuteKidneyInjuryRiskAssessmentResource>> {
    return this.http.get<ResourceCollection<AcuteKidneyInjuryRiskAssessmentResource>>(
      Configuration.acuteKidneyInjuryRiskAssessmentURL,
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

  public getAKIRA(id: number): Observable<AcuteKidneyInjuryRiskAssessmentResource> {
    return this.http.get<AcuteKidneyInjuryRiskAssessmentResource>(
      `${Configuration.acuteKidneyInjuryRiskAssessmentURL}/${id}`,
      { headers: Configuration.headers}
    );
  }

  public create(model: AcuteKidneyInjuryRiskAssessmentModel): Observable<AcuteKidneyInjuryRiskAssessmentResource> {
    return this.http.post<AcuteKidneyInjuryRiskAssessmentResource>(
      Configuration.acuteKidneyInjuryRiskAssessmentURL,
      JSON.stringify(model),
      { headers: Configuration.headers}
    );
  }
  public update(id: number, model: AcuteKidneyInjuryRiskAssessmentModel): Observable<AcuteKidneyInjuryRiskAssessmentResource> {
    return this.http.put<AcuteKidneyInjuryRiskAssessmentResource>(
      `${Configuration.acuteKidneyInjuryRiskAssessmentURL}/${id}`,
      JSON.stringify(model),
      { headers: Configuration.headers}
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${Configuration.acuteKidneyInjuryRiskAssessmentURL}/${id}`, {
      headers: Configuration.headers,
    });
  }
}
