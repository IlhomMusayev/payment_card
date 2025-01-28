export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  desc: string;
  // Add other product properties you're using
}

export interface CheckoutProps {
  onSubmit?: (data: FormData) => void;
  products: Product[];
}

export interface PaymentProps {
  products: {
    id: number;
    name: string;
    desc: string;
    price: number;
    quantity: number;
  }[];
  // Add other props if needed
} 