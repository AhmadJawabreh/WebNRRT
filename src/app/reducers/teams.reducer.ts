import { createReducer, on } from '@ngrx/store';
import {
  createTeamAction,
  createTeamFailureAction,
  createTeamSuccessAction,
  deleteTeamAction,
  deleteTeamFailureAction,
  deleteTeamSuccessAction,
  loadTeamsAction,
  loadTeamsFailureAction,
  loadTeamsSuccessAction,
  updateTeamAction,
  updateTeamFailureAction,
  updateTeamSccessAction
} from '../actions/teams.actions';
import { TeamResource } from '../api-client-services/teams/Resources/team-resource';
import { initialStateItems } from '../shared/state-item';

export const teamsState = initialStateItems<TeamResource>();

export const teamsReducer = createReducer(
  teamsState,
  on(loadTeamsAction, (state) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
    isLoaded: false,
    items: [],
    totalResults: 0,
  })),
  on(loadTeamsSuccessAction, (state, action) => ({
    ...state,
    errorMessage: null,
    isLoading: false,
    isLoaded: true,
    items: action.response.items,
    totalResults: action.response.totalResults,
  })),
  on(createTeamSuccessAction, (state, action) => {
    const teams = Object.assign([], state.items);
    teams.push(action.resource);

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: teams,
      totalResults: state.totalResults + 1,
    };
  }),
  on(updateTeamSccessAction, (state, action) => {
    const teams = Object.assign([], state.items) as TeamResource[];
    const index = teams.findIndex((item) => item.id === action.resource.id);
    teams[index] = action.resource;

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: teams,
    };
  }),
  on(deleteTeamSuccessAction, (state, action) => {
    const teams = Object.assign([], state.items) as TeamResource[];
    const items = teams.filter((item) => item.id !== action.id);
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: items,
      totalResults: state.totalResults - 1,
    };
  }),
  on(
    createTeamAction,
    updateTeamAction,
    deleteTeamAction,
    (state) => ({
      ...state,
      isLoading: true,
      isLoaded: false,
    })
  ),
  on(
    loadTeamsFailureAction,
    createTeamFailureAction,
    updateTeamFailureAction,
    deleteTeamFailureAction,
    (state, action) => ({
      ...state,
      errorMessage: action.errorMessage,
      isLoading: false,
      isLoaded: false,
    })
  )
);
