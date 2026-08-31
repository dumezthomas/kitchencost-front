import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';
import {RestaurantAnalysis} from '../../models/restaurant-analysis';
import {ApexOptions, NgApexchartsModule} from 'ng-apexcharts';

@Component({
  selector: 'app-restaurant-health-chart',
  imports: [NgApexchartsModule],
  templateUrl: './restaurant-health-chart.html',
  styleUrl: './restaurant-health-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RestaurantHealthChart {

  readonly analysis = input.required<RestaurantAnalysis>();

  readonly chartOptions = computed<ApexOptions>(() => ({

    series: [
      this.analysis().goodItems,
      this.analysis().warningItems,
      this.analysis().criticalItems
    ],

    chart: {
      type: 'donut' as const,
      toolbar: {
        show: false
      }
    },

    labels: [
      'Good',
      'Warning',
      'Critical'
    ],

    colors: [
      '#2e7d32',
      '#f59e0b',
      '#dc2626'
    ],

    legend: {
      show: false
    },

    tooltip: {
      enabled: false
    },

    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '60%'
        }
      }
    },

    dataLabels: {
      enabled: false
    },

    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },

    stroke: {
      width: 0
    },

  }));
}
