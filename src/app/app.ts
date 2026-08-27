import {Component, inject, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthStore} from './features/auth/stores/auth.store';

@Component({
  imports: [RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {

  private readonly authStore = inject(AuthStore);

  protected readonly title = signal('KitchenCost');

  constructor() {

    this.authStore.initialize();
  }
}
