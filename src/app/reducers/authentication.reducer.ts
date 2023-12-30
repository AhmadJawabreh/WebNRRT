import { createReducer, on } from '@ngrx/store';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/authentication';
import { AuthenticationResource } from '../api-client-services/authentication/resources/authentication-resource';

export interface AuthenticationState {
  isLoading: boolean;
  errorMessage: string | null;
  token: AuthenticationResource | null;
}

export const authenticationState = {
  isLoading: false,
  token: {},
} as AuthenticationState;

export const authenticationReducer = createReducer(
  authenticationState,
  on(loginAction, (state) => ({
    ...state,
    isLoading: true,
    token: null,
    errorMessage: null,
  })),
  on(loginSuccessAction, (state, action) => ({
    ...state,
    isLoading: false,
    token: action.resource,
    errorMessage: null,
  })),
  on(loginFailureAction, (state, action) => ({
    ...state,
    errorMessage: action.errorMessage,
    isLoading: false,
  }))
);
