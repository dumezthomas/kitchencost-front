import {Component, DestroyRef, effect, inject, ViewChild} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIcon} from '@angular/material/icon';
import {MatSlider, MatSliderThumb} from '@angular/material/slider';

import {QRCodeComponent} from 'angularx-qrcode';

import {RestaurantStore} from '../../stores/restaurant.store';
import {CuisineType} from '../../../../shared/enums/cuisine-type.enum';
import {CuisineTypePipe} from '../../../../shared/pipes/cuisine-type.pipe';
import {NotificationService} from '../../../../shared/services/notification.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-restaurant',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIcon,
    MatSlider,
    MatSliderThumb,
    CuisineTypePipe,
    QRCodeComponent
  ],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.scss'
})
export class Restaurant {

  protected readonly restaurantStore = inject(RestaurantStore);
  private readonly notificationService = inject(NotificationService);

  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  @ViewChild(QRCodeComponent)
  private qrCode?: QRCodeComponent;

  private readonly cuisineTypePipe = new CuisineTypePipe();

  protected readonly cuisineTypes = Object.values(CuisineType)
    .sort((a, b) => {

      if (a === CuisineType.OTHER) {
        return 1;
      }

      if (b === CuisineType.OTHER) {
        return -1;
      }

      return this.cuisineTypePipe
        .transform(a)
        .localeCompare(this.cuisineTypePipe.transform(b));
    });

  protected readonly form = this.fb.nonNullable.group({

    name: ['', [
      Validators.required,
      Validators.maxLength(100)
    ]],

    description: ['', Validators.maxLength(250)],

    cuisineType: [CuisineType.OTHER, Validators.required],

    targetFoodCostPercentage: [30, [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ]],

    criticalFoodCostPercentage: [40, [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ]]
  });

  constructor() {

    this.restaurantStore.loadRestaurant();

    effect(() => {

      const restaurant = this.restaurantStore.restaurant();

      if (!restaurant) {
        return;
      }

      this.form.patchValue(restaurant, {
        emitEvent: false
      });
    });

    this.destroyRef.onDestroy(() => {

      this.restaurantStore.reset();
    });
  }

  protected save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;
    }

    const {
      targetFoodCostPercentage,
      criticalFoodCostPercentage
    } = this.form.getRawValue();

    if (targetFoodCostPercentage >= criticalFoodCostPercentage) {

      this.form.setErrors({
        thresholds: true
      });

      return;
    }

    this.restaurantStore.updateRestaurant(
      this.form.getRawValue()
    );
  }

  protected reset(): void {

    const restaurant = this.restaurantStore.restaurant();

    if (!restaurant) {
      return;
    }

    this.form.reset({
      name: restaurant.name,
      description: restaurant.description,
      cuisineType: restaurant.cuisineType,
      targetFoodCostPercentage: restaurant.targetFoodCostPercentage,
      criticalFoodCostPercentage: restaurant.criticalFoodCostPercentage
    });

    this.form.markAsPristine();
    this.form.markAsUntouched();
  }

  protected get publicMenuUrl(): string {

    const restaurant = this.restaurantStore.restaurant();

    return `${environment.publicAppUrl}/restaurants?id=${this.restaurantStore.restaurant()?.id}`;
  }

  protected async copyQrCodeLink(): Promise<void> {

    try {

      await navigator.clipboard.writeText(this.publicMenuUrl);

      this.notificationService.success(
        'Public menu link copied.'
      );

    } catch {

      this.notificationService.error(
        'Unable to copy the public menu link.'
      );
    }
  }

  protected downloadQrCode(): void {

    const canvas = this.qrCode?.qrcElement?.nativeElement.querySelector('canvas');

    if (!canvas) {

      this.notificationService.error(
        'Unable to generate the QR code.'
      );

      return;
    }

    const link = document.createElement('a');

    link.download = 'restaurant-qr-code.png';
    link.href = canvas.toDataURL('image/png');

    link.click();

    this.notificationService.success(
      'QR code downloaded.'
    );
  }
}
