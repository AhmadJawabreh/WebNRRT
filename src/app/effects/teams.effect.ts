import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ResourceCollection } from '../shared/resource-collection';
import { SnackBar } from '../shared/snackbar';
import { greenSnackBar, readSnackBar } from '../shared/constent';
import { createTeamAction, createTeamFailureAction, createTeamSuccessAction as createTeamSuccessAction, deleteTeamAction, deleteTeamFailureAction, deleteTeamSuccessAction, loadTeamsAction, loadTeamsFailureAction, loadTeamsSuccessAction, updateTeamAction, updateTeamFailureAction, updateTeamSccessAction } from '../actions/teams.actions';
import { TeamResource } from '../api-client-services/teams/Resources/team-resource';
import { TeamsHttpService } from '../api-client-services/teams/teams-http-service';
import { cantCreateTeam, cantDeleteTeam, cantUpdateTeam, teamCreatedSuccessfully, teamDeletedSuccessfully, teamUpdateSuccessfully } from '../shared/messages';

@Injectable()
export class TeamsEffect {
  public loadTeams$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeamsAction),
      switchMap((action) =>
        this.teamsHttpService.getTeams(action.filter).pipe(
          map((resource: ResourceCollection<TeamResource>) => {
            return  loadTeamsSuccessAction({ response: resource });
          }
          ),
          catchError((error: string) =>
            of(loadTeamsFailureAction({ errorMessage: error }))
          )
        )
      )
    )
  );

  public createTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTeamAction),
      switchMap((action) =>
        this.teamsHttpService.create(action.model).pipe(
          map((resource: TeamResource) => {
            this.snackBar.showSnackbar(
              teamCreatedSuccessfully,
              greenSnackBar
            );
            return createTeamSuccessAction({ resource: resource });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0];
            this.snackBar.showSnackbar(
              errorMessage ?? cantCreateTeam,
              readSnackBar
            );
            return of(
              createTeamFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );

  public updateTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTeamAction),
      switchMap((action) =>
        this.teamsHttpService.update(action.id, action.model).pipe(
          map((resource: TeamResource) => {
            this.snackBar.showSnackbar(
              teamUpdateSuccessfully,
              greenSnackBar
            );
            return updateTeamSccessAction({ resource: resource });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0];
            this.snackBar.showSnackbar(
              errorMessage ?? cantUpdateTeam,
              readSnackBar
            );
            return of(
              updateTeamFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );

  public deleteTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTeamAction),
      switchMap((action) =>
        this.teamsHttpService.delete(action.id).pipe(
          map(() => {
            this.snackBar.showSnackbar(
              teamDeletedSuccessfully,
              greenSnackBar
            );
            return deleteTeamSuccessAction({ id: action.id });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0] ?? cantDeleteTeam;
            this.snackBar.showSnackbar(errorMessage, readSnackBar);
            return of(
              deleteTeamFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );
  public constructor(
    private readonly actions$: Actions,
    private readonly teamsHttpService: TeamsHttpService,
    private readonly snackBar: SnackBar
  ) {}
}
