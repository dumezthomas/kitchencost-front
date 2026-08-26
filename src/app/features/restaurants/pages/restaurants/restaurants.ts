import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

import {RouterLink} from '@angular/router';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

import {CuisineTypePipe} from '../../../../shared/pipes/cuisine-type.pipe';

import {PublicRestaurantStore} from '../../stores/public-restaurant.store';
import {PublicRestaurantIndex} from '../../models/public-restaurant-index';

@Component({
  selector: 'app-restaurants',
  imports: [
    ReactiveFormsModule,
    RouterLink,

    MatAutocompleteModule,
    MatButton,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,

    CuisineTypePipe,
    MatIconButton
  ],
  templateUrl: './restaurants.html',
  styleUrl: './restaurants.scss'
})
export class Restaurants {

  readonly restaurantStore = inject(PublicRestaurantStore);

  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.group({
    search: this.fb.control<PublicRestaurantIndex | string | null>(null)
  });

  constructor() {

    this.restaurantStore.loadRestaurants();

    this.form.controls.search.valueChanges.subscribe(value => {

      this.restaurantStore.setSearch(
        typeof value === 'string'
          ? value
          : value?.name ?? ''
      );
    });
  }

  displayRestaurant = (restaurant: PublicRestaurantIndex | null): string =>
    restaurant?.name ?? '';

  selectRestaurant(restaurant: PublicRestaurantIndex): void {

    this.restaurantStore.selectRestaurant(restaurant.id);
  }

  clearSelection(): void {

    this.form.controls.search.setValue(null);
    this.restaurantStore.clearSelection();
  }
}
