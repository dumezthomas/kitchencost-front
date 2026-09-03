import {inject, Service} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Service()
export class NotificationService {

  private readonly snackBar = inject(MatSnackBar);

  success(message: string): void {

    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  info(message: string): void {

    this.snackBar.open(message, 'Close', {
      duration: 3000
    });
  }

  error(message: string): void {

    this.snackBar.open(message, 'Close', {
      duration: 4000
    });
  }
}
