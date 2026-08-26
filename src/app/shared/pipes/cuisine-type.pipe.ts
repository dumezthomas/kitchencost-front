import {Pipe, PipeTransform} from '@angular/core';

import {CuisineType} from '../enums/cuisine-type.enum';

@Pipe({
  name: 'cuisineType',
  standalone: true
})
export class CuisineTypePipe implements PipeTransform {

  transform(value: CuisineType | null | undefined): string {

    if (!value) {
      return '';
    }
    
    switch (value) {

      case CuisineType.FAST_FOOD:
        return 'Fast Food';

      case CuisineType.FINE_DINING:
        return 'Fine Dining';

      case CuisineType.BISTRO:
        return 'Bistro';

      case CuisineType.BRASSERIE:
        return 'Brasserie';

      case CuisineType.STREET_FOOD:
        return 'Street Food';

      case CuisineType.FRENCH:
        return 'French';

      case CuisineType.ITALIAN:
        return 'Italian';

      case CuisineType.ASIAN:
        return 'Asian';

      case CuisineType.JAPANESE:
        return 'Japanese';

      case CuisineType.MEXICAN:
        return 'Mexican';

      case CuisineType.INDIAN:
        return 'Indian';

      case CuisineType.MEDITERRANEAN:
        return 'Mediterranean';

      case CuisineType.FAMILY:
        return 'Family';

      default:
        return 'Other';
    }
  }
}
