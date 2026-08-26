import {computed, inject} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withProps, withState} from '@ngrx/signals';
import {PublicRestaurantService} from '../services/public-restaurant.service';
import {PublicRestaurant} from '../models/public-restaurant';
import {PublicRestaurantIndex} from '../models/public-restaurant-index';
import {UUID} from '../../../shared/types/uuid';
import {searchAutocomplete} from '../../../shared/utils/autocomplete.util';

type PublicRestaurantState = {

  restaurants: PublicRestaurantIndex[];
  selectedRestaurant: PublicRestaurant | null;

  search: string;

  loading: boolean;
  error: string | null;
};

const initialState: PublicRestaurantState = {

  restaurants: [],
  selectedRestaurant: null,

  search: '',

  loading: false,
  error: null
};

export const PublicRestaurantStore = signalStore(
  {providedIn: 'root'},

  withState(initialState),

  withProps(() => ({

    restaurantService: inject(PublicRestaurantService)
  })),

  withMethods((store) => ({

    loadRestaurants(): void {

      if (store.restaurants().length) {
        return;
      }

      patchState(store, {
        loading: true,
        error: null
      });

      store.restaurantService.getAll().subscribe({

        next: restaurants => {

          patchState(store, {
            restaurants,
            loading: false
          });
        },

        error: () => {

          patchState(store, {
            loading: false,
            error: 'Unable to load restaurants.'
          });
        }
      });
    },

    setSearch(search: string): void {

      patchState(store, {
        search
      });
    },

    selectRestaurant(id: UUID): void {

      if (store.selectedRestaurant()?.id === id) {
        return;
      }

      patchState(store, {
        loading: true,
        error: null
      });

      store.restaurantService.getById(id).subscribe({

        next: restaurant => {

          patchState(store, {
            selectedRestaurant: restaurant,
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

    clearSelection(): void {

      patchState(store, {
        selectedRestaurant: null
      });
    }
  })),

  withComputed((store) => ({

    filteredRestaurants: computed(() => searchAutocomplete(
        store.restaurants(),
        store.search(),
        {
          label: restaurant => restaurant.name,
          keywords: restaurant => [restaurant.cuisineType],
          limit: 10
        }
      )
    )
  }))
);
