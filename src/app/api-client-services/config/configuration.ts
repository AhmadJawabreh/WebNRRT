export class Configuration {
  public static basedURL = 'https://localhost:7152/v1/api';
  public static patientsURL = `${this.basedURL}/patients`;
  public static patientsHistoryURL = `${this.basedURL}/patientshistory`;
  public static patientsMovementsURL = `${this.basedURL}/patienstmovements`;
  public static token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxNGNmZWIwLWI0ZTYtNDAwNC1hZDNlLTU5Y2M0NDdkMGQwNiIsInVzZXJOYW1lIjoiQWhtYWQgQW1qYWQiLCJzdWIiOiJhaG1hZGphd2FicmVoOTZAZ21haWwuY29tIiwiZW1haWwiOiJhaG1hZGphd2FicmVoOTZAZ21haWwuY29tIiwianRpIjoiZmY3MTc2MGEtYjM3ZC00NmRlLTgxMGYtZjgxNjFkMTg4MjcyIiwibmJmIjoxNzAyNzMxMjUzLCJleHAiOjE3MDI3MzQ4NTMsImlhdCI6MTcwMjczMTI1M30.fXTOFzjKvy3-SUXG7LejsPjRNqX2WyWKjNFdyRa2zUE`;
}
