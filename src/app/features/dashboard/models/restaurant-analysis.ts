import {FoodCostStatus} from '../../../shared/enums/food-cost-status.enum';

export interface RestaurantAnalysis {

  ingredients: number;
  recipes: number;
  menuItems: number;

  averageFoodCostPercentage: number;
  averageFoodCostStatus: FoodCostStatus;
  averageMargin: number;
  averageMarkup: number;

  goodItems: number;
  warningItems: number;
  criticalItems: number;
}
