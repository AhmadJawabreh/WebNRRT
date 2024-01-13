import { createReducer, on } from '@ngrx/store';
import {
  createTeamMemberAction,
  createTeamMemberFailureAction,
  createTeamMemberSuccessAction,
  deleteTeamMemberAction,
  deleteTeamMemberFailureAction,
  deleteTeamMemberSuccessAction,
  loadTeamMembersAction,
  loadTeamMembersFailureAction,
  loadTeamMembersSuccessAction,
  updateTeamMemberAction,
  updateTeamMemberFailureAction,
  updateTeamMemberSccessAction,
} from '../actions/team-members.actions';
import { TeamMemberResource } from '../api-client-services/team-members/resources/team-member-resource';
import { initialStateItems } from '../shared/state-item';

export const teamMembersState = initialStateItems<TeamMemberResource>();

export const teamMembersReducer = createReducer(
  teamMembersState,
  on(loadTeamMembersAction, (state) => ({
    ...state,
    errorMessage: null,
    isLoading: true,
    isLoaded: false,
    items: [],
    totalResults: 0,
  })),
  on(loadTeamMembersSuccessAction, (state, action) => ({
    ...state,
    errorMessage: null,
    isLoading: false,
    isLoaded: true,
    items: action.response.items,
    totalResults: action.response.totalResults,
  })),
  on(createTeamMemberSuccessAction, (state, action) => {
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
  on(updateTeamMemberSccessAction, (state, action) => {
    const teamMembers = Object.assign([], state.items) as TeamMemberResource[];
    const index = teamMembers.findIndex(
      (item) => item.id === action.resource.id
    );
    teamMembers[index] = action.resource;

    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: teamMembers,
    };
  }),
  on(deleteTeamMemberSuccessAction, (state, action) => {
    const teamMembers = Object.assign([], state.items) as TeamMemberResource[];
    const items = teamMembers.filter((item) => item.id !== action.id);
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      items: items,
      totalResults: state.totalResults - 1,
    };
  }),
  on(
    createTeamMemberAction,
    updateTeamMemberAction,
    deleteTeamMemberAction,
    (state) => ({
      ...state,
      isLoading: true,
      isLoaded: false,
    })
  ),
  on(
    loadTeamMembersFailureAction,
    createTeamMemberFailureAction,
    updateTeamMemberFailureAction,
    deleteTeamMemberFailureAction,
    (state, action) => ({
      ...state,
      errorMessage: action.errorMessage,
      isLoading: false,
      isLoaded: false,
    })
  )
);
