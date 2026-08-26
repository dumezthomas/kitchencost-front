import {Pipe, PipeTransform} from '@angular/core';

import {DietType} from '../enums/diet-type.enum';

@Pipe({
  name: 'dietType',
  standalone: true
})
export class DietTypePipe implements PipeTransform {

  transform(value: DietType | null | undefined): string {

    if (!value) {
      return '';
    }

    switch (value) {

      case DietType.NONE:
        return 'None';

      case DietType.VEGETARIAN:
        return 'Vegetarian';

      case DietType.VEGAN:
        return 'Vegan';
    }
  }
}
