import { createAction, props } from '@ngrx/store';
import { ResourceCollection } from '../shared/resource-collection';
import { TeamResource } from '../api-client-services/teams/Resources/team-resource';
import { TeamFilter } from '../api-client-services/teams/filters/team-filter';
import { TeamModel } from '../api-client-services/teams/models/team-model';


export const loadTeamsAction = createAction(
  '[TEAMS] LOAD TEAMS ACTION',
  props<{ filter: TeamFilter }>()
);

export const loadTeamsSuccessAction = createAction(
  '[TEAMS] LOAD TEAMS SUCCESS ACTION',
  props<{ response: ResourceCollection<TeamResource> }>()
);

export const loadTeamsFailureAction = createAction(
  '[TEAMS] LOAD TEAMS FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const createTeamAction = createAction(
  '[TEAMS] CREATE TEAM ACTION',
  props<{ model: TeamModel }>()
);

export const createTeamSuccessAction = createAction(
  '[TEAMS] CREATE TEAM SUCCESS ACTION',
  props<{ resource: TeamResource }>()
);

export const createTeamFailureAction = createAction(
  '[TEAMS] CREATE TEAM FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const updateTeamAction = createAction(
  '[TEAMS] UPDATE TEAM ACTION',
  props<{ id: number; model: TeamModel }>()
);

export const updateTeamSccessAction = createAction(
  '[TEAMS] UPDATE TEAM SUCCESS ACTION',
  props<{ resource: TeamResource }>()
);

export const updateTeamFailureAction = createAction(
  '[TEAMS] UPDATE TEAM FAILURE ACTION',
  props<{ errorMessage: string }>()
);

export const deleteTeamAction = createAction(
  '[TEAMS] DELETE TEAM ACTION',
  props<{ id: number }>()
);

export const deleteTeamSuccessAction = createAction(
  '[TEAMS] DELETE TEAM SUCCESS ACTION',
  props<{ id: number }>()
);

export const deleteTeamFailureAction = createAction(
  '[TEAMS] DELETE TEAM FAILURE ACTION',
  props<{ errorMessage: string }>()
);
