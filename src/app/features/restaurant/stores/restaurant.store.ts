import {computed, inject} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withProps, withState} from '@ngrx/signals';

import {Restaurant} from '../models/restaurant';
import {UpdateRestaurantRequest} from '../models/update-restaurant-request';
import {RestaurantService} from '../services/restaurant.service';
import {NotificationService} from '../../../shared/services/notification.service';

type RestaurantState = {

  restaurant: Restaurant | null;

  loading: boolean;
  saving: boolean;
  error: string | null;
};

const initialState: RestaurantState = {

  restaurant: null,

  loading: false,
  saving: false,
  error: null
};

export const RestaurantStore = signalStore(
  {providedIn: 'root'},

  withState(initialState),

  withProps(() => ({

    restaurantService: inject(RestaurantService),
    notificationService: inject(NotificationService)
  })),

  withMethods((store) => ({

    loadRestaurant(): void {

      patchState(store, {
        loading: true,
        error: null
      });

      store.restaurantService.getRestaurant().subscribe({

        next: restaurant => {

          patchState(store, {
            restaurant,
            loading: false
          });
        },

        error: () => {

          patchState(store, {
            loading: false,
            error: 'Unable to load restaurant.'
          });
        }
      });
    },

    updateRestaurant(request: UpdateRestaurantRequest): void {

      patchState(store, {
        saving: true,
        error: null
      });

      store.restaurantService.updateRestaurant(request).subscribe({

        next: () => {

          patchState(store, {
            restaurant: {
              ...store.restaurant()!,
              ...request
            },
            saving: false
          });

          store.notificationService.success('Restaurant updated successfully.');
        },

        error: () => {

          patchState(store, {
            saving: false,
            error: 'Unable to update restaurant.'
          });

          store.notificationService.error('Unable to update restaurant.');
        }
      });
    },

    reset(): void {

      patchState(store, initialState);
    }
  })),

  withComputed((store) => ({

    hasRestaurant: computed(() => store.restaurant() !== null)
  }))
);
