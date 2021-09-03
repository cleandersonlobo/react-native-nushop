import { TransactionMessages } from '../checkout.interface';

export const ptBRErrors: { [key: string]: string } = {
  "You don't have that much money.": TransactionMessages.YouDontHaveMuchMoney,
  'Offer expired': TransactionMessages.OfferExpired,
};
