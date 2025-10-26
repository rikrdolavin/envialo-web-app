import { API_FRONTEND_PRODUCTS } from "@/constants/products/endpoints";
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
      ? `${API_FRONTEND_PRODUCTS}?${queryParams.toString()}`
      : API_FRONTEND_PRODUCTS;

  return await doFetch({
    data: null,
    method: "GET",
    endpoint: endpointWithParams,
  });
}
