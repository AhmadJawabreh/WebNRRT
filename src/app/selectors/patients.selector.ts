import { createSelector } from '@ngrx/store';
import { AppSelectors } from './app.selector';

export class PatientsSelectors {
  public static readonly patients = createSelector(
    AppSelectors.appState,
    (x) => x.patients
  );
  public static readonly patientsList = createSelector(
    PatientsSelectors.patients,
    (x) => x.items
  );
  public static readonly totalResult = createSelector(
    PatientsSelectors.patients,
    (x) => x.totalResults
  );
  public static readonly errorMessage = createSelector(
    PatientsSelectors.patients,
    (x) => x.errorMessage
  );
  public static readonly isLoading = createSelector(
    PatientsSelectors.patients,
    (x) => x.isLoading
  );
  public static readonly isLoaded = createSelector(
    PatientsSelectors.patients,
    (x) => x.isLoaded
  );
}
