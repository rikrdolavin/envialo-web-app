import { ProductVariant } from "./products";

export interface CartItem {
  quantity: number;
  productId: string;
  product: ProductVariant;
}
