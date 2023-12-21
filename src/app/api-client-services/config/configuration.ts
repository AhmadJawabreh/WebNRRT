export class Configuration {
  public static basedURL = 'https://localhost:7152/v1/api';
  public static patientsURL = `${this.basedURL}/patients`;
  public static patientsHistoryURL = `${this.basedURL}/patientshistory`;
  public static patientsMovementsURL = `${this.basedURL}/patienstmovements`;
  public static token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkxNGNmZWIwLWI0ZTYtNDAwNC1hZDNlLTU5Y2M0NDdkMGQwNiIsInVzZXJOYW1lIjoiQWhtYWQgQW1qYWQiLCJzdWIiOiJhaG1hZGphd2FicmVoOTZAZ21haWwuY29tIiwiZW1haWwiOiJhaG1hZGphd2FicmVoOTZAZ21haWwuY29tIiwianRpIjoiNjUwM2QzMWYtNDU0OS00NzliLWFkNGMtNTI1YWQ3NDZjM2EwIiwibmJmIjoxNzAzMTU3NTEyLCJleHAiOjE3MDMxNjExMTIsImlhdCI6MTcwMzE1NzUxMn0.UhUdM0-n4FWjU0fXPUlebBaWvMO9_xyyLpPgpuAVkjA`;
}
