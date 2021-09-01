import { IFormatPricePayload } from './types';

class Service {
  formatePrice({ price, options, currency = 'BRL' }: IFormatPricePayload) {
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currencyDisplay: 'symbol',
      currency,
      ...options,
    }).format(price);

    return formatted;
  }
}

export const LocaleService = new Service();
