export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  rating: number;
  reviews: number;
};

export type Supplier = {
  id: number;
  name: string;
  location: string;
  distance: number;
  rating: number;
  orders: number;
  verified: boolean;
};

export type CartItem = Product & { quantity: number }; 