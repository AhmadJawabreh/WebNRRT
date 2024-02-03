import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {
  createTeamMemberAction,
  deleteTeamMemberAction,
  loadTeamMembersAction,
  updateTeamMemberAction,
} from '../actions/team-members.actions';
import { TeamMemberFilter } from '../api-client-services/team-members/filters/team-member-filter';
import { TeamMemberModel } from '../api-client-services/team-members/models/team-member-model';
import { AppState } from '../reducers/app-state';
import { TeamMemberSelectors } from '../selectors/team-members.selector';

@Injectable({
  providedIn: `root`,
})
export class TeamMembersService {
  public teamMembers = this.store.pipe(
    select(TeamMemberSelectors.teamMemberList)
  );
  public isloading = this.store.pipe(select(TeamMemberSelectors.isLoading));
  public totalResult = this.store.pipe(select(TeamMemberSelectors.totalResult));

  public constructor(private store: Store<AppState>) {}

  public loadTeamMembers(filter: TeamMemberFilter) {
    this.store.dispatch(loadTeamMembersAction({ filter: filter }));
  }

  public createTeamMember(model: TeamMemberModel) {
    this.store.dispatch(createTeamMemberAction({ model: model }));
  }

  public updateTeamMember(id: number, model: TeamMemberModel) {
    this.store.dispatch(updateTeamMemberAction({ id: id, model: model }));
  }

  public deleteTeamMember(id: number) {
    this.store.dispatch(deleteTeamMemberAction({ id: id }));
  }
}
