import { HttpHeaders } from "@angular/common/http";
import { Configuration } from "../api-client-services/config/configuration";

export const pageSize = 50;
export const headers = new HttpHeaders()
.append('Content-Type', 'application/json; charset=utf8')
.append('Authorization', Configuration.token);
