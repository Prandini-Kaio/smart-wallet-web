import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private snackBar: MatSnackBar) { };

  private showMessages(message: string, action: string, config: MatSnackBarConfig) {
    this.snackBar.open(message, action, config);
  }

  success(message: string, duration: number = 3000): void {
    this.showMessages(message, 'Fechar', {
      duration,
      panelClass: ['success-snackbar', 'snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  error(message: string, duration: number = 3000): void {
    this.showMessages(message, 'Fechar', {
      duration,
      panelClass: ['error-snackbar', 'snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  info(message: string, duration: number = 3000): void {
    this.showMessages(message, 'Fechar', {
      duration,
      panelClass: ['info-snackbar', 'snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  warning(message: string, duration: number = 3000): void {
    this.showMessages(message, 'Fechar', {
      duration,
      panelClass: ['warning-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
