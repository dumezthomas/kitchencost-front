import {Component, DestroyRef, inject} from '@angular/core';
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
import {MatCard, MatCardContent} from '@angular/material/card';
import {MenuItemType} from '../../../../shared/enums/menu-item-type.enum';
import {AllergenPipe} from '../../../../shared/pipes/allergen.pipe';
import {DietType} from '../../../../shared/enums/diet-type.enum';
import {DietTypePipe} from '../../../../shared/pipes/diet-type.pipe';
import {Badge} from '../../../../shared/components/badge/badge';
import {MenuItemPricePipe} from '../../../../shared/pipes/menu-item-price.pipe';
import {MenuItemTypePipe} from '../../../../shared/pipes/menu-item-type.pipe';

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
    MatIconButton,
    MatCard,
    MatCardContent,
    MenuItemTypePipe,
    AllergenPipe,
    DietTypePipe,
    Badge,
    MenuItemTypePipe,
    MenuItemTypePipe,
    MenuItemTypePipe,
    MenuItemTypePipe,
    MenuItemPricePipe,
    MenuItemTypePipe
  ],
  templateUrl: './restaurants.html',
  styleUrl: './restaurants.scss'
})
export class Restaurants {

  readonly restaurantStore = inject(PublicRestaurantStore);

  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

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

    this.destroyRef.onDestroy(() => {

      this.form.reset();
      this.restaurantStore.clearSelection();

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

  protected readonly MenuItemType = MenuItemType;
  protected readonly DietType = DietType;
}
