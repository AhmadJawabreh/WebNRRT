import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  createTeamAction,
  deleteTeamAction,
  loadTeamsAction,
  updateTeamAction,
} from '../actions/teams.actions';
import { TeamFilter } from '../api-client-services/teams/filters/team-filter';
import { TeamModel } from '../api-client-services/teams/models/team-model';
import { AppState } from '../reducers/app-state';
import { TeamsSelectors } from '../selectors/teams.selector';

@Injectable({
  providedIn: `root`,
})
export class TeamsService {
  public teams = this.store.pipe(select(TeamsSelectors.teamsList));
  public isloading = this.store.pipe(select(TeamsSelectors.isLoading));
  public totalResult = this.store.pipe(select(TeamsSelectors.totalResult));

  public constructor(private store: Store<AppState>) {}

  public loadTeams(filter: TeamFilter) {
    this.store.dispatch(loadTeamsAction({ filter: filter }));
  }

  public createTeam(model: TeamModel) {
    this.store.dispatch(createTeamAction({ model: model }));
  }

  public updateTeam(id: number, model: TeamModel) {
    this.store.dispatch(updateTeamAction({ id: id, model: model }));
  }

  public deleteTeam(id: number) {
    this.store.dispatch(deleteTeamAction({ id: id }));
  }
}
