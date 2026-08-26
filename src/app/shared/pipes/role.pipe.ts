import {Pipe, PipeTransform} from '@angular/core';

import {Role} from '../enums/role.enum';

@Pipe({
  name: 'role',
  standalone: true
})
export class RolePipe implements PipeTransform {

  transform(value: Role | null | undefined): string {

    if (!value) {
      return '';
    }
    
    switch (value) {

      case Role.CHEF:
        return 'Chef';

      case Role.COOK:
        return 'Cook';

    }
  }
}
