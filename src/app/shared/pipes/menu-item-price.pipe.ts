import {Pipe, PipeTransform} from '@angular/core';
import {CurrencyPipe} from '@angular/common';


@Pipe({
  name: 'menuItemPrice',
  standalone: true
})
export class MenuItemPricePipe implements PipeTransform {

  private readonly currencyPipe = new CurrencyPipe('en');

  transform(price: number | null | undefined): string {

    if (price == null || price === 0) {
      return 'FREE';
    }

    return this.currencyPipe.transform(price, 'EUR') ?? '';
  }
}
