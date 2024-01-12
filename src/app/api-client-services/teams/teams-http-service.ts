import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceCollection } from 'src/app/shared/resource-collection';
import { Configuration } from '../config/configuration';
import { TeamFilter } from './filters/team-filter';
import { TeamResource } from './Resources/team-resource';
import { TeamModel } from './models/team-model';


@Injectable({
  providedIn: 'root',
})
export class TeamsHttpService {
  constructor(private http: HttpClient) {}

  public getTeams(
    filter: TeamFilter
  ): Observable<ResourceCollection<TeamResource>> {
    return this.http.get<ResourceCollection<TeamResource>>(
      Configuration.teamsURL,
      {
        headers: Configuration.headers,
        params: {
          skip: filter.skip,
          take: filter.take,
          id: filter.id ?? 0,
        },
      }
    );
  }

  public getTeam(id: number): Observable<TeamResource> {
    return this.http.get<TeamResource>(
      `${Configuration.teamsURL}/${id}`,
      { headers: Configuration.headers }
    );
  }

  public create(
    model: TeamModel
  ): Observable<TeamResource> {
    return this.http.post<TeamResource>(
      Configuration.teamsURL,
      JSON.stringify(model),
      { headers: Configuration.headers }
    );
  }

  public update(
    id: number,
    model: TeamModel
  ): Observable<TeamResource> {
    return this.http.put<TeamResource>(
      `${Configuration.teamsURL}/${id}`,
      JSON.stringify(model),
      { headers: Configuration.headers }
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${Configuration.teamsURL}/${id}`,
      { headers: Configuration.headers }
    );
  }
}
