import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarServices {
  constructor(private _snackBar: MatSnackBar) {}

  successSnack(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'right';
    config.panelClass = ['mat-newtoolbar', 'successSnack'];
    this._snackBar.open(message, 'Dismiss', config);
  }

  warningSnack(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'right';
    config.panelClass = ['mat-newtoolbar', 'warningSnack'];
    this._snackBar.open(message, 'Dismiss', config);
  }

  errorsSnack(message: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.verticalPosition = 'top';
    config.horizontalPosition = 'right';
    config.panelClass = ['mat-newtoolbar', 'errorSnack'];
    this._snackBar.open(message, 'Dismiss', config);
  }
}
