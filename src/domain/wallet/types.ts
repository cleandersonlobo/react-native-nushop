export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}
export interface Offer {
  id: string;
  price: number;
  product: Product;
}

export interface Customer {
  id: string;
  name: string;
  balance: number;
}

export interface TCustomer extends Customer {
  offers: Offer[];
}

export interface Checkout {
  quantity: number;
  total: number;
}

export interface WalletHistory extends Checkout {
  id: string;
  offer: Offer;
  createdAt: string;
}

export interface Wallet {
  costumer?: Customer;
  history?: WalletHistory[];
}
