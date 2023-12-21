import { createSelector } from '@ngrx/store';
import { AppSelectors } from './app.selector';

export class PatientsHistorySelectors {
  public static readonly patientsHistory = createSelector(
    AppSelectors.appState,
    (x) => x.patientsHistory
  );
  public static readonly patientsHistoryList = createSelector(
    PatientsHistorySelectors.patientsHistory,
    (x) => x.items
  );
  public static readonly totalResult = createSelector(
    PatientsHistorySelectors.patientsHistory,
    (x) => x.totalResults
  );
  public static readonly errorMessage = createSelector(
    PatientsHistorySelectors.patientsHistory,
    (x) => x.errorMessage
  );
  public static readonly isLoading = createSelector(
    PatientsHistorySelectors.patientsHistory,
    (x) => x.isLoading
  );
  public static readonly isLoaded = createSelector(
    PatientsHistorySelectors.patientsHistory,
    (x) => x.isLoaded
  );
}
