import {
  API_PRODUCTS_ALL,
  API_PRODUCTS_DETAILS,
  API_PRODUCTS_DETAILS_PARAM,
} from "@/constants/products/endpoints";

import { doFetch } from "./utils";

export async function getProducts({
  page,
  pageSize,
  onlyExternalProducts,
}: {
  page?: number;
  pageSize?: number;
  onlyExternalProducts?: boolean;
} = {}) {
  const queryParams = new URLSearchParams();

  if (page !== undefined) queryParams.append("page", String(page));
  if (pageSize !== undefined) queryParams.append("pageSize", String(pageSize));
  if (onlyExternalProducts !== undefined)
    queryParams.append("onlyExternalProducts", String(onlyExternalProducts));

  // todo: cambiar all en dependencia de lo que se quiera con respecto a los productos mas adelante
  const endpointWithParams =
    queryParams.toString().length > 0
      ? `${API_PRODUCTS_ALL}?${queryParams.toString()}`
      : API_PRODUCTS_ALL;

  return await doFetch({
    data: null,
    method: "GET",
    endpoint: endpointWithParams,
  });
}

export async function getProductDetails(id: string) {
  return await doFetch({
    data: null,
    method: "GET",
    endpoint: API_PRODUCTS_DETAILS.replace(API_PRODUCTS_DETAILS_PARAM, id),
  });
}
