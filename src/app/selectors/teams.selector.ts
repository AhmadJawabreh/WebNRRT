import { createSelector } from '@ngrx/store';
import { AppSelectors } from './app.selector';

export class TeamsSelectors {
  public static readonly teams = createSelector(
    AppSelectors.appState,
    (x) => x.teams
  );
  public static readonly teamsList = createSelector(
    TeamsSelectors.teams,
    (x) => x.items
  );
  public static readonly totalResult = createSelector(
    TeamsSelectors.teams,
    (x) => x.totalResults
  );
  public static readonly errorMessage = createSelector(
    TeamsSelectors.teams,
    (x) => x.errorMessage
  );
  public static readonly isLoading = createSelector(
    TeamsSelectors.teams,
    (x) => x.isLoading
  );
  public static readonly isLoaded = createSelector(
    TeamsSelectors.teams,
    (x) => x.isLoaded
  );
}
