import {
  API_PRODUCTS,
  API_PRODUCTS_DETAILS,
  API_PRODUCTS_DETAILS_PARAM,
} from "@/constants/products/endpoints";

import { doFetch } from "./utils";

export async function getProducts({
  limit,
  offset,
}: {
  limit?: number;
  offset?: number;
} = {}) {
  const queryParams = new URLSearchParams();

  if (limit !== undefined) queryParams.append("limit", String(limit));
  if (offset !== undefined) queryParams.append("offset", String(offset));

  const endpointWithParams =
    queryParams.toString().length > 0
      ? `${API_PRODUCTS}?${queryParams.toString()}`
      : API_PRODUCTS;

  return await doFetch({
    data: null,
    method: "GET",
    endpoint: endpointWithParams,
    apiBase: process.env.API_BASE_URL2,
  });
}

export async function getProductDetails(id: string) {
  return await doFetch({
    data: null,
    method: "GET",
    endpoint: API_PRODUCTS_DETAILS.replace(API_PRODUCTS_DETAILS_PARAM, id),
  });
}
