import {computed, inject} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withProps, withState} from '@ngrx/signals';
import {forkJoin} from 'rxjs';
import {DashboardService} from '../services/dashboard.service';
import {RestaurantAnalysis} from '../models/restaurant-analysis';
import {MenuItemIndex} from '../models/menu-item-index';
import {BadgeVariant} from '../../../shared/components/badge/badge';
import {FoodCostStatus} from '../../../shared/enums/food-cost-status.enum';

type DashboardState = {

  restaurantAnalysis: RestaurantAnalysis | null;

  bestFoodCostMenuItems: MenuItemIndex[];
  worstFoodCostMenuItems: MenuItemIndex[];

  loading: boolean;
  error: string | null;
};

const initialState: DashboardState = {

  restaurantAnalysis: null,

  bestFoodCostMenuItems: [],
  worstFoodCostMenuItems: [],

  loading: false,
  error: null
};

export const DashboardStore = signalStore(
  {providedIn: 'root'},

  withState(initialState),

  withProps(() => ({

    dashboardService: inject(DashboardService)
  })),

  withMethods((store) => ({

    loadDashboard(): void {

      patchState(store, {
        loading: true,
        error: null
      });

      forkJoin({
        restaurantAnalysis: store.dashboardService.getRestaurantAnalysis(),
        bestFoodCostMenuItems: store.dashboardService.getBestFoodCostMenuItems(),
        worstFoodCostMenuItems: store.dashboardService.getWorstFoodCostMenuItems()
      }).subscribe({

        next: dashboard => {

          patchState(store, {
            ...dashboard,
            loading: false
          });
        },

        error: () => {

          patchState(store, {
            loading: false,
            error: 'Unable to load dashboard.'
          });
        }
      });
    },

    reset(): void {

      patchState(store, initialState);
    }
  })),

  withComputed((store) => ({

    foodCostBadgeVariant: computed<BadgeVariant>(() => {

      switch (store.restaurantAnalysis()?.averageFoodCostStatus) {

        case FoodCostStatus.GOOD:
          return 'success';

        case FoodCostStatus.WARNING:
          return 'warning';

        case FoodCostStatus.CRITICAL:
          return 'error';

        default:
          return 'neutral';
      }
    })
  }))
);
