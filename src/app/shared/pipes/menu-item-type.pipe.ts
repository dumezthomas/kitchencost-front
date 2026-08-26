import {Pipe, PipeTransform} from '@angular/core';

import {MenuItemType} from '../enums/menu-item-type.enum';

@Pipe({
  name: 'menuItemType',
  standalone: true
})
export class MenuItemTypePipe implements PipeTransform {

  transform(value: MenuItemType | null | undefined): string {

    if (!value) {
      return '';
    }

    switch (value) {

      case MenuItemType.AMUSE_BOUCHE:
        return 'Amuse-bouche';

      case MenuItemType.STARTER:
        return 'Starters';

      case MenuItemType.MAIN:
        return 'Main Courses';

      case MenuItemType.DESSERT:
        return 'Desserts';
    }
  }
}
