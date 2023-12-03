import { AppState } from './../reducers/app-state';

export class AppSelectors {
  public static readonly appState = (state: AppState) => state;
}
