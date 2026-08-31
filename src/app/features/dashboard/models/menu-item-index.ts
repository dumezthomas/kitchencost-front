import {UUID} from '../../../shared/types/uuid';

export interface MenuItemIndex {

  id: UUID;
  name: string;
  price: number;
  totalCost: number;
  foodCostPercentage: number;
}
