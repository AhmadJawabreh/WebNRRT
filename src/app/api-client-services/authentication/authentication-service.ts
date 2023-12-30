import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from '../config/configuration';
import { AuthenticationModel } from './models/authentication-model';
import { AuthenticationResource } from './resources/authentication-resource';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationHttpService {

  public headers = new HttpHeaders()
  .append('Content-Type', 'application/json; charset=utf8');

  constructor(private http: HttpClient) {}

  public login(model: AuthenticationModel): Observable<AuthenticationResource> {
    return this.http.post<AuthenticationResource>(
      Configuration.authenticationURL,
      JSON.stringify(model),
      { headers: this.headers }
    );
  }
}
