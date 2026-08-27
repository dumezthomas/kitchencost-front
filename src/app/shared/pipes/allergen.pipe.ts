import {Pipe, PipeTransform} from '@angular/core';
import {Allergen} from '../enums/allergen.enum';

@Pipe({
  name: 'allergen',
  standalone: true
})
export class AllergenPipe implements PipeTransform {

  transform(value: Allergen | null | undefined): string {

    if (!value) {
      return '';
    }

    switch (value) {

      case Allergen.GLUTEN:
        return 'Gluten';

      case Allergen.CRUSTACEANS:
        return 'Crustaceans';

      case Allergen.EGGS:
        return 'Eggs';

      case Allergen.FISH:
        return 'Fish';

      case Allergen.PEANUTS:
        return 'Peanuts';

      case Allergen.SOYBEANS:
        return 'Soybeans';

      case Allergen.MILK:
        return 'Milk';

      case Allergen.NUTS:
        return 'Nuts';

      case Allergen.CELERY:
        return 'Celery';

      case Allergen.MUSTARD:
        return 'Mustard';

      case Allergen.SESAME:
        return 'Sesame';

      case Allergen.SULFITES:
        return 'Sulfites';

      case Allergen.LUPIN:
        return 'Lupin';

      case Allergen.MOLLUSCS:
        return 'Molluscs';

      default:
        return value;
    }
  }
}
