import {Component, DestroyRef, inject} from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {RouterLink} from '@angular/router';
import {DecimalPipe, TitleCasePipe} from '@angular/common';
import {DashboardStore} from '../../stores/dashboard.store';
import {Badge} from '../../../../shared/components/badge/badge';
import {RestaurantHealthChart} from '../../components/restaurant-health-chart/restaurant-health-chart';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatCardModule,
    MatIconModule,
    RouterLink,
    DecimalPipe,
    Badge,
    TitleCasePipe,
    RestaurantHealthChart
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  protected readonly dashboardStore = inject(DashboardStore);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {

    this.dashboardStore.loadDashboard();

    this.destroyRef.onDestroy(() => {

      this.dashboardStore.reset();
    });
  }
}
