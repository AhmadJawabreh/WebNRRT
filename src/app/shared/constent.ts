import { HttpHeaders } from "@angular/common/http";

export const pageSize = 50;
export const greenSnackBar = 'green-snackbar';
export const readSnackBar = 'red-snackbar';

export const headers = new HttpHeaders()
.append('Content-Type', 'application/json; charset=utf8');
