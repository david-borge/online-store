import { CurrencyPipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

import { CURRENCY_CONFIG } from '@config/currency';

@Pipe({
    name: 'currencyFormat',
    standalone: true,
})
export class CurrencyFormatPipe implements PipeTransform {
    private readonly currencyPipe = inject(CurrencyPipe);

    transform(value: number | string): string | null {
        return this.currencyPipe.transform(
            value,
            CURRENCY_CONFIG.defaultCurrency,
            CURRENCY_CONFIG.currencyDisplayFormat,
            CURRENCY_CONFIG.digitsInfo,
        );
    }
}
