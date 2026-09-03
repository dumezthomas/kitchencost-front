import {Component, DestroyRef, effect, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

import {ActivatedRoute, Router, RouterLink} from '@angular/router';

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
import {TitleCasePipe} from '@angular/common';
import {AuthStore} from '../../../auth/stores/auth.store';
import {NotificationService} from '../../../../shared/services/notification.service';

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
    MenuItemTypePipe,
    TitleCasePipe,
    TitleCasePipe
  ],
  templateUrl: './restaurants.html',
  styleUrl: './restaurants.scss'
})
export class Restaurants {

  protected readonly restaurantStore = inject(PublicRestaurantStore);
  protected readonly authStore = inject(AuthStore);
  private readonly notificationService = inject(NotificationService)

  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly form = this.fb.group({
    search: this.fb.control<PublicRestaurantIndex | string | null>(null)
  });

  constructor() {

    this.restaurantStore.loadRestaurants();

    effect(() => {

      const restaurants = this.restaurantStore.restaurants();

      if (!restaurants.length || this.restaurantStore.selectedRestaurant()) {
        return;
      }

      const id = this.route.snapshot.queryParamMap.get('id');

      if (!id) {
        return;
      }

      const restaurant = restaurants.find(r => r.id === id);

      if (!restaurant) {

        this.notificationService.error('Restaurant not found.');

        this.router.navigate([], {
          queryParams: {},
          replaceUrl: true
        });

        return;
      }

      this.form.controls.search.setValue(restaurant, {
        emitEvent: false
      });

      this.restaurantStore.selectRestaurant(id);

      this.router.navigate([], {
        queryParams: {},
        replaceUrl: true
      });
    });

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
