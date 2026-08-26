import {CuisineType} from '../../../shared/enums/cuisine-type.enum';
import {PublicMenuItem} from './public-menu-item';
import {UUID} from '../../../shared/types/uuid';

export interface PublicRestaurant {

  id: UUID;
  name: string;
  description: string;
  cuisineType: CuisineType;
  menu: PublicMenuItem[];
}
