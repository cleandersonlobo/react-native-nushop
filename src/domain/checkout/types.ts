import { TCustomer } from 'domain/wallet/types';

export interface TDataPurchase {
  purchase: {
    success?: boolean;
    errorMessage?: null | string;
    customer?: TCustomer;
  };
}
