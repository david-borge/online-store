import { Currency } from './enums/currencies.enum';
import { CurrencyDisplayFormat } from './enums/currency-display.enum';

const DEFAULT_CURRENCY = Currency.EUR;

const CURRENCY_CONFIG = {
    defaultCurrency: DEFAULT_CURRENCY,
    supportedCurrencies: [DEFAULT_CURRENCY],
    currencyDisplayFormat: CurrencyDisplayFormat.SYMBOL,
    digitsInfo: '1.0-2',
};

export default CURRENCY_CONFIG;
