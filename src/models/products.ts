import { ApiPaginationResponse } from "@/types/api";

export interface Product {
  id: number;
  sku: string;
  name: string;
  description: string;
  priceCost: number;
  priceUnit: number;
  locations: ProductLocation[];
  categories: [];
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

export interface ProductsPaginatedResponse extends ApiPaginationResponse {
  data: Product[];
}

export interface ProductDetailsResponse {
  status: string;
  result: Product;
}
