export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  priceCost: number;
  priceUnit: number;
  locations: ProductLocation[];
  categories: string[];
  image: string | null;
  image2: string | null;
  image3: string | null;
  image4: string | null;
  last_updated: Date;
}

export interface ProductLocation {
  location: string;
  quantity: number;
}

export interface ProductDetailsResponse {
  status: string;
  result: Product;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  slug: string;
  price: number;
  priceCost?: number;
  priceUnit?: number;
  name: string;
  description: string;
  isActive: boolean;
  viaNotification: string;
  previousPrice: number | null;
  costPrice: number;
  weight: number;
  height: number;
  width: number;
  length: number;
  stockAlert: boolean;
  umbralStockAlert: number;
  image?: string;
}
