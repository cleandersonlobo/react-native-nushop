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
