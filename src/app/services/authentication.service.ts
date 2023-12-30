import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { loginAction } from '../actions/authentication';
import { AuthenticationModel } from '../api-client-services/authentication/models/authentication-model';
import { AppState } from '../reducers/app-state';
import { AuthenticationSelectors } from '../selectors/authentication.selector';
import { AuthenticationResource } from '../api-client-services/authentication/resources/authentication-resource';

@Injectable({
  providedIn: `root`,
})
export class AuthenticationService {
  public constructor(private store: Store<AppState>) {}

  public isloading = this.store.pipe(select(AuthenticationSelectors.isLoading));

  public userAuthentication = this.store.pipe(
    select(AuthenticationSelectors.userAuthentication)
  );

  public errorMessage = this.store.pipe(
    select(AuthenticationSelectors.errorMessage)
  );

  public login(model: AuthenticationModel) {
    this.store.dispatch(loginAction({ model: model }));
  }

  public setSession(authenticationResource: AuthenticationResource) {
    const expiresAt = new Date(authenticationResource.expireAt).getTime() / 1000;

    localStorage.setItem('id_token', authenticationResource.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }

  public logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn(): boolean {
    const currentTime = new Date().getTime() / 1000;
    const expireTime = this.getExpiration();
    const result =  currentTime < expireTime;
    return result;
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public getExpiration() {
    const expiration = localStorage.getItem('expires_at') ?? '0';
    return JSON.parse(expiration);
  }
}
