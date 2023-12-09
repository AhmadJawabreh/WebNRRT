export class Configuration {
  public static basedURL = 'https://localhost:7152/v1/api';
  public static patientsURL = `${this.basedURL}/patients`;
  public static patientsHistoryURL = `${this.basedURL}/patientshistory`;
  public static patientsMovementsURL = `${this.basedURL}/patienstmovements`;
  public static token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmOWRmNjdmLWVlMmYtNGMwYS05MTMzLTQ0Y2Q5Y2JhMTc1ZSIsInVzZXJOYW1lIjoiQWhtYWQgSmF3YWJyZWgiLCJzdWIiOiJBaG1hZEphd2FicmVoOTZAZ21haWwuY29tQGdtYWlsLmNvbSIsImVtYWlsIjoiQWhtYWRKYXdhYnJlaDk2QGdtYWlsLmNvbUBnbWFpbC5jb20iLCJqdGkiOiI1YzAxY2E4Mi0yZTg1LTRiZDMtOTdmZC1jZjhjNjlmNzFkYzgiLCJuYmYiOjE3MDIxNTM5MDMsImV4cCI6MTcwMjE1NzUwMywiaWF0IjoxNzAyMTUzOTAzfQ.ystdwBZpMb_tgAM0hzPT8Z0tB78I1JCqQXHrakK454M`;
}
