import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Restaurant} from '../models/restaurant';
import {Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {UpdateRestaurantRequest} from '../models/update-restaurant-request';

@Service()
export class RestaurantService {

  private readonly http = inject(HttpClient);

  getRestaurant(): Observable<Restaurant> {

    return this.http.get<Restaurant>(
      `${environment.apiUrl}/restaurant`
    );
  }

  updateRestaurant(request: UpdateRestaurantRequest): Observable<void> {

    return this.http.put<void>(
      `${environment.apiUrl}/restaurant`,
      request
    );
  }
}
