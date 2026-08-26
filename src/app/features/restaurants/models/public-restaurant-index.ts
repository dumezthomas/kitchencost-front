import {CuisineType} from '../../../shared/enums/cuisine-type.enum';
import {UUID} from '../../../shared/types/uuid';

export interface PublicRestaurantIndex {

  id: UUID;
  name: string;
  description: string;
  cuisineType: CuisineType;
}
