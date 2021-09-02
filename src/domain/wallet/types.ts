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

export interface User {
  id: string;
  name: string;
  balance: number;
}

export interface WalletHistory {
  id: string;
  offer: Offer;
  createdAt: string;
}

export interface Wallet {
  user?: User;
  history?: WalletHistory[];
}
