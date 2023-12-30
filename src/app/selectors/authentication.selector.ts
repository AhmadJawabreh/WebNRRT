import { createSelector } from '@ngrx/store';
import { AppSelectors } from './app.selector';

export class AuthenticationSelectors {
  public static readonly authentication = createSelector(
    AppSelectors.appState,
    (x) => x.authentication
  );
  public static readonly userAuthentication = createSelector(
    AuthenticationSelectors.authentication,
    (x) => x.token
  );
  public static readonly errorMessage = createSelector(
    AuthenticationSelectors.authentication,
    (x) => x.errorMessage
  );
  public static readonly isLoading = createSelector(
    AuthenticationSelectors.authentication,
    (x) => x.isLoading
  );
}
