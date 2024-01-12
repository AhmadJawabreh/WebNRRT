import { createSelector } from '@ngrx/store';
import { AppSelectors } from './app.selector';

export class PatientsMovementsSelectors {
  public static readonly patientsMovements = createSelector(
    AppSelectors.appState,
    (x) => x.patientsMovements
  );
  public static readonly patientsMovementsList = createSelector(
    PatientsMovementsSelectors.patientsMovements,
    (x) => x.items
  );
  public static readonly totalResult = createSelector(
    PatientsMovementsSelectors.patientsMovements,
    (x) => x.totalResults
  );
  public static readonly errorMessage = createSelector(
    PatientsMovementsSelectors.patientsMovements,
    (x) => x.errorMessage
  );
  public static readonly isLoading = createSelector(
    PatientsMovementsSelectors.patientsMovements,
    (x) => x.isLoading
  );
  public static readonly isLoaded = createSelector(
    PatientsMovementsSelectors.patientsMovements,
    (x) => x.isLoaded
  );
}
