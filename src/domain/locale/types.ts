export interface IFormatPricePayload {
  price: number;
  currency?: string;
  options?: Intl.NumberFormatOptions;
}
