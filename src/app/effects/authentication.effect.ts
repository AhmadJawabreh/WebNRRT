import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from '../actions/authentication';
import { AuthenticationResource } from '../api-client-services/authentication/resources/authentication-resource';
import { AuthenticationHttpService } from '../api-client-services/authentication/authentication-service';

@Injectable()
export class AuthenticationEffect {
  public createPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginAction),
      switchMap((action) =>
        this.authenticationService.login(action.model).pipe(
          map((resource: AuthenticationResource) => {
            return loginSuccessAction({ resource: resource });
          }),
          catchError((exception: any) => {
            return of(loginFailureAction({ errorMessage: exception }));
          })
        )
      )
    )
  );

  public constructor(
    private readonly actions$: Actions,
    private readonly authenticationService: AuthenticationHttpService
  ) {}
}
