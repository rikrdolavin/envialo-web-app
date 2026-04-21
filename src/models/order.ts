export interface OrderCreated {
  id: string;
  createdAt: string;
  totalAmount: number;
  status: string;
  items: OrderCreatedItem[];
}

export interface OrderCreatedItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}
