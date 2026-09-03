import {CuisineType} from '../../../shared/enums/cuisine-type.enum';
import {UUID} from '../../../shared/types/uuid';

export interface Restaurant {

  id: UUID;
  name: string;
  description: string;

  cuisineType: CuisineType;

  targetFoodCostPercentage: number;
  criticalFoodCostPercentage: number;
}
