import {inject, Service} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../../../environments/environment';

import {PublicRestaurant} from '../models/public-restaurant';
import {PublicRestaurantIndex} from '../models/public-restaurant-index';

import {UUID} from '../../../shared/types/uuid';

@Service()
export class PublicRestaurantService {

  private readonly http = inject(HttpClient);

  getAll(): Observable<PublicRestaurantIndex[]> {

    return this.http.get<PublicRestaurantIndex[]>(
      `${environment.apiUrl}/restaurants`
    );
  }

  getById(id: UUID): Observable<PublicRestaurant> {

    return this.http.get<PublicRestaurant>(
      `${environment.apiUrl}/restaurants/${id}`
    );
  }

}
