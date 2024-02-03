import { createSelector } from '@ngrx/store';
import { AppSelectors } from './app.selector';

export class TeamMemberSelectors {
  public static readonly teamMembers = createSelector(
    AppSelectors.appState,
    (x) => x.teamMembers
  );
  public static readonly teamMemberList = createSelector(
    TeamMemberSelectors.teamMembers,
    (x) => x.items
  );
  public static readonly totalResult = createSelector(
    TeamMemberSelectors.teamMembers,
    (x) => x.totalResults
  );
  public static readonly errorMessage = createSelector(
    TeamMemberSelectors.teamMembers,
    (x) => x.errorMessage
  );
  public static readonly isLoading = createSelector(
    TeamMemberSelectors.teamMembers,
    (x) => x.isLoading
  );
  public static readonly isLoaded = createSelector(
    TeamMemberSelectors.teamMembers,
    (x) => x.isLoaded
  );
}
