import {Allergen} from '../../../shared/enums/allergen.enum';
import {DietType} from '../../../shared/enums/diet-type.enum';
import {MenuItemType} from '../../../shared/enums/menu-item-type.enum';
import {UUID} from '../../../shared/types/uuid';

export interface PublicMenuItem {

  id: UUID;
  name: string;
  description: string;
  type: MenuItemType;
  price: number;
  dietType: DietType;
  allergens: Allergen[];
}
