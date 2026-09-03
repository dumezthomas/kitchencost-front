import {CuisineType} from '../../../shared/enums/cuisine-type.enum';

export interface UpdateRestaurantRequest {

  name: string;
  description: string;

  cuisineType: CuisineType;

  targetFoodCostPercentage: number;
  criticalFoodCostPercentage: number;
}
