import { HttpHeaders } from "@angular/common/http";

export class Configuration {
  public static basedURL = 'https://localhost:7152/v1/api';
  public static patientsURL = `${this.basedURL}/patients`;
  public static teamsURL = `${this.basedURL}/teams`;
  public static teamMembersURL = `${this.basedURL}/teammembers`;
  public static patientsHistoryURL = `${this.basedURL}/patientshistory`;
  public static patientsMovementsURL = `${this.basedURL}/patienstmovements`;
  public static authenticationURL = `${this.basedURL}/authentication`;

  public static token = `Bearer ${localStorage.getItem('id_token')}`;

  public static get headers() {
    const token = localStorage.getItem('id_token');

    return new HttpHeaders()
    .append('Content-Type', 'application/json; charset=utf8')
    .append('Authorization', `Bearer ${token}`);
  }
}
