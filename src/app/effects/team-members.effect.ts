import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ResourceCollection } from '../shared/resource-collection';
import { SnackBar } from '../shared/snackbar';
import { greenSnackBar, readSnackBar } from '../shared/constent';
import { createTeamMemberAction, createTeamMemberFailureAction, createTeamMemberSuccessAction, deleteTeamMemberAction, deleteTeamMemberFailureAction, deleteTeamMemberSuccessAction, loadTeamMembersAction, loadTeamMembersFailureAction, loadTeamMembersSuccessAction, updateTeamMemberAction, updateTeamMemberFailureAction, updateTeamMemberSccessAction } from '../actions/team-members.actions';
import { TeamMemberResource } from '../api-client-services/team-members/resources/team-member-resource';
import { TeamMembersHttpService } from '../api-client-services/team-members/team-members-http-service';
import { cantCreateTeamMember, cantDeleteTeamMember, cantUpdateTeamMember, teamMemberCreatedSuccessfully, teamMemberDeletedSuccessfully, teamMemberUpdateSuccessfully } from '../shared/messages';

@Injectable()
export class TeamMembersEffect {
  public loadTeamMembers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTeamMembersAction),
      switchMap((action) =>
        this.teamMembersHttpService.getTeams(action.filter).pipe(
          map((resource: ResourceCollection<TeamMemberResource>) => {
            return  loadTeamMembersSuccessAction({ response: resource });
          }
          ),
          catchError((error: string) =>
            of(loadTeamMembersFailureAction({ errorMessage: error }))
          )
        )
      )
    )
  );

  public createTeamMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createTeamMemberAction),
      switchMap((action) =>
        this.teamMembersHttpService.create(action.model).pipe(
          map((resource: TeamMemberResource) => {
            this.snackBar.showSnackbar(
              teamMemberCreatedSuccessfully,
              greenSnackBar
            );
            return createTeamMemberSuccessAction({ resource: resource });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0];
            this.snackBar.showSnackbar(
              errorMessage ?? cantCreateTeamMember,
              readSnackBar
            );
            return of(
              createTeamMemberFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );

  public updateTeamMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTeamMemberAction),
      switchMap((action) =>
        this.teamMembersHttpService.update(action.id, action.model).pipe(
          map((resource: TeamMemberResource) => {
            this.snackBar.showSnackbar(
              teamMemberUpdateSuccessfully,
              greenSnackBar
            );
            return updateTeamMemberSccessAction({ resource: resource });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0];
            this.snackBar.showSnackbar(
              errorMessage ?? cantUpdateTeamMember,
              readSnackBar
            );
            return of(
              updateTeamMemberFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );

  public deleteTeamMember$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTeamMemberAction),
      switchMap((action) =>
        this.teamMembersHttpService.delete(action.id).pipe(
          map(() => {
            this.snackBar.showSnackbar(
              teamMemberDeletedSuccessfully,
              greenSnackBar
            );
            return deleteTeamMemberSuccessAction({ id: action.id });
          }),
          catchError((exception: any) => {
            const errorMessage = exception.error?.errorDetails?.Id[0] ?? cantDeleteTeamMember;
            this.snackBar.showSnackbar(errorMessage, readSnackBar);
            return of(
              deleteTeamMemberFailureAction({ errorMessage: errorMessage })
            );
          })
        )
      )
    )
  );
  public constructor(
    private readonly actions$: Actions,
    private readonly teamMembersHttpService: TeamMembersHttpService,
    private readonly snackBar: SnackBar
  ) {}
}
