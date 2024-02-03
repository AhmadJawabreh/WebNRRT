import { createAction, props } from '@ngrx/store';
import { ResourceCollection } from '../shared/resource-collection';
import { TeamMemberFilter } from '../api-client-services/team-members/filters/team-member-filter';
import { TeamMemberResource } from '../api-client-services/team-members/resources/team-member-resource';
import { TeamMemberModel } from '../api-client-services/team-members/models/team-member-model';


export const loadTeamMembersAction = createAction(
  '[TEAM MEMBERS] LOAD TEAM MEMBERS ACTION',
  props<{ filter: TeamMemberFilter }>()
);

export const loadTeamMembersSuccessAction = createAction(
  '[TEAM MEMBERS] LOAD TEAM MEMBERS SUCCESS ACTION',
  props<{ response: ResourceCollection<TeamMemberResource> }>()
);

export const loadTeamMembersFailureAction = createAction(
  '[TEAM MEMBERS] LOAD TEAM MEMBERS FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const createTeamMemberAction = createAction(
  '[TEAM MEMBERS] CREATE TEAM MEMBER ACTION',
  props<{ model: TeamMemberModel }>()
);

export const createTeamMemberSuccessAction = createAction(
  '[TEAM MEMBERS] CREATE TEAM MEMBER SUCCESS ACTION',
  props<{ resource: TeamMemberResource }>()
);

export const createTeamMemberFailureAction = createAction(
  '[TEAM MEMBERS] CREATE TEAM MEMBER FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const updateTeamMemberAction = createAction(
  '[TEAM MEMBERS] UPDATE TEAM MEMBER ACTION',
  props<{ id: number; model: TeamMemberModel }>()
);

export const updateTeamMemberSccessAction = createAction(
  '[TEAM MEMBERS] UPDATE TEAM MEMBER SUCCESS ACTION',
  props<{ resource: TeamMemberResource }>()
);

export const updateTeamMemberFailureAction = createAction(
  '[TEAM MEMBERS] UPDATE TEAM MEMBER FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const deleteTeamMemberAction = createAction(
  '[TEAM MEMBERS] DELETE TEAM MEMBER ACTION',
  props<{ id: number }>()
);

export const deleteTeamMemberSuccessAction = createAction(
  '[TEAM MEMBERS] DELETE TEAM MEMBER SUCCESS ACTION',
  props<{ id: number }>()
);

export const deleteTeamMemberFailureAction = createAction(
  '[TEAM MEMBERS] DELETE TEAM MEMBER FAILURE ACTION',
  props<{ errorMessage: string }>()
);
