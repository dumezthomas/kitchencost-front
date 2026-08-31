import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RestaurantAnalysis} from '../models/restaurant-analysis';
import {environment} from '../../../../environments/environment';
import {MenuItemIndex} from '../models/menu-item-index';

@Service()
export class DashboardService {

  private readonly http = inject(HttpClient);

  getRestaurantAnalysis(): Observable<RestaurantAnalysis> {

    return this.http.get<RestaurantAnalysis>(
      `${environment.apiUrl}/restaurant/analysis`
    );
  }

  getBestFoodCostMenuItems(): Observable<MenuItemIndex[]> {

    return this.http.get<MenuItemIndex[]>(
      `${environment.apiUrl}/menu-items/best-food-cost`
    );
  }

  getWorstFoodCostMenuItems(): Observable<MenuItemIndex[]> {

    return this.http.get<MenuItemIndex[]>(
      `${environment.apiUrl}/menu-items/worst-food-cost`
    );
  }
}
