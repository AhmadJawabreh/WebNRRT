import { createAction, props } from '@ngrx/store';
import { AuthenticationModel } from '../api-client-services/authentication/models/authentication-model';
import { AuthenticationResource } from '../api-client-services/authentication/resources/authentication-resource';

export const loginAction = createAction(
  '[AUTHENTICATION] GENERATE USER TOKEN',
  props<{ model: AuthenticationModel }>()
);

export const loginSuccessAction = createAction(
  '[AUTHENTICATION] GENERATE USER TOKEN SUCCESS ACTION',
  props<{ resource: AuthenticationResource }>()
);

export const loginFailureAction = createAction(
  '[AUTHENTICATION] GENERATE USER TOKEN FAILURE ACTION',
  props<{ errorMessage: string }>()
);
