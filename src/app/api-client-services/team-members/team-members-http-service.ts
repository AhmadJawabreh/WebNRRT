import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResourceCollection } from 'src/app/shared/resource-collection';
import { Configuration } from '../config/configuration';
import { TeamMemberFilter } from './filters/team-member-filter';
import { TeamMemberResource } from './resources/team-member-resource';
import { TeamMemberModel } from './models/team-member-model';

@Injectable({
  providedIn: 'root',
})
export class TeamMembersHttpService {
  constructor(private http: HttpClient) {}

  public getTeams(
    filter: TeamMemberFilter
  ): Observable<ResourceCollection<TeamMemberResource>> {
    return this.http.get<ResourceCollection<TeamMemberResource>>(
      Configuration.teamMembersURL,
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

  public getTeam(id: number): Observable<TeamMemberResource> {
    return this.http.get<TeamMemberResource>(
      `${Configuration.teamMembersURL}/${id}`,
      { headers: Configuration.headers }
    );
  }

  public create(
    model: TeamMemberModel
  ): Observable<TeamMemberResource> {
    return this.http.post<TeamMemberResource>(
      Configuration.teamMembersURL,
      JSON.stringify(model),
      { headers: Configuration.headers }
    );
  }

  public update(
    id: number,
    model: TeamMemberModel
  ): Observable<TeamMemberResource> {
    return this.http.put<TeamMemberResource>(
      `${Configuration.teamMembersURL}/${id}`,
      JSON.stringify(model),
      { headers: Configuration.headers }
    );
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${Configuration.teamMembersURL}/${id}`,
      { headers: Configuration.headers }
    );
  }
}
