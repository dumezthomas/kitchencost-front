import {Component, DestroyRef, inject} from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {CurrencyPipe, DecimalPipe, TitleCasePipe} from '@angular/common';
import {DashboardStore} from '../../stores/dashboard.store';
import {Badge} from '../../../../shared/components/badge/badge';
import {AuthStore} from '../../../auth/stores/auth.store';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatIconModule,
    RouterLink,
    DecimalPipe,
    CurrencyPipe,
    Badge,
    TitleCasePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  protected readonly dashboardStore = inject(DashboardStore);
  protected readonly authStore = inject(AuthStore);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {

    this.dashboardStore.loadDashboard();

    this.destroyRef.onDestroy(() => {

      this.dashboardStore.reset();
    });
  }
}
