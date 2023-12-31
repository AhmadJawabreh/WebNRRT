import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackBar {
  constructor(private readonly matSnackBar: MatSnackBar) {}

  public showSnackbar(message: string, style: string) {
    this.matSnackBar.open(message, 'X', {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      duration: 3000,
      direction: 'ltr',
      panelClass: [style]
    });
  }
}
