export class Configuration {
  public static basedURL = 'https://localhost:7152/v1/api';
  public static patientsURL = `${this.basedURL}/patients`;
  public static patientsHistoryURL = `${this.basedURL}/patientshistory`;
  public static patientsMovementsURL = `${this.basedURL}/patienstmovements`;
  public static token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg0OWZhZjUyLTIyNTEtNGI0MS05ZmI1LTZiZmNiNzJmZGQzOCIsInVzZXJOYW1lIjoiQWhtYWQgSmF3YWJyZWgiLCJzdWIiOiJBaG1hZEphd2FicmVoOTZAZ21haWwuY29tIiwiZW1haWwiOiJBaG1hZEphd2FicmVoOTZAZ21haWwuY29tIiwianRpIjoiYTYzN2JmNzAtNTdlOS00M2YxLWIxMWUtYmI4MzljZDRkMzgwIiwibmJmIjoxNzAxNjM1ODQ3LCJleHAiOjE3MDE2Mzk0NDcsImlhdCI6MTcwMTYzNTg0N30.gvVkRXT1sJG-T_Xfik8up3-amK1uTBHc8kvjeRmxD30`;
}
