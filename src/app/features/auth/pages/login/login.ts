import {Component, effect, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

import {AuthStore} from '../../stores/auth.store';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinner,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  readonly authStore = inject(AuthStore);

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  hidePassword = true;

  readonly form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor() {

    effect(() => {

      if (this.authStore.isAuthenticated()) {

        this.router.navigate(['/dashboard']);
      }
    });
  }

  login(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;
    }

    this.authStore.login(this.form.getRawValue());
  }
}
