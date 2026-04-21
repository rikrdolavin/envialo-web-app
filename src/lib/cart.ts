"use server";

import {
  API_CART,
  API_CART_ITEMS,
  API_CART_DELETE_ITEM,
  API_CART_ITEMS_PARAM,
  API_CART_CHECKOUT,
} from "@/constants/cart/endpoints";
import { doFetch } from "./utils";
import { cookies } from "next/headers";
import { CartItem } from "@/models/cart";

async function getGuestCookie() {
  try {
    const cookieStore = await cookies();
    const guestCartKey = cookieStore.get("guestCartKey")?.value;
    return guestCartKey ? `guest_id=${guestCartKey}` : undefined;
  } catch (error) {
    return undefined;
  }
}

export async function getCart() {
  const guestCookie = await getGuestCookie();
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const res = await doFetch({
    data: null,
    method: "GET",
    endpoint: API_CART,
    ...(guestCookie ? { extraCookies: guestCookie } : {}),
    ...(token ? { token } : {}),
  });

  const normalizedData = res.data.items.map((item: CartItem) => {
    return {
      ...item,
      productId: item.productId,
    };
  });

  const resp = {
    ...res,
    data: {
      ...res.data,
      items: normalizedData,
    },
  };

  return resp;
}

export async function addToCartApi(productId: string, quantity: number) {
  const guestCookie = await getGuestCookie();
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const res = await doFetch({
    data: { productId: productId, quantity },
    method: "POST",
    endpoint: API_CART_ITEMS,
    extraCookies: guestCookie,
    token,
  });

  return res;
}

export async function removeFromCartApi(productId: string) {
  const guestCookie = await getGuestCookie();
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  return await doFetch({
    data: null,
    method: "DELETE",
    endpoint: API_CART_DELETE_ITEM.replace(API_CART_ITEMS_PARAM, productId),
    extraCookies: guestCookie,
    token,
  });
}

export async function clearCartApi() {
  const guestCookie = await getGuestCookie();
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  return await doFetch({
    data: null,
    method: "DELETE",
    endpoint: API_CART,
    extraCookies: guestCookie,
    token,
  });
}

export async function checkout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  const res = await doFetch({
    data: {},
    method: "POST",
    endpoint: API_CART_CHECKOUT,
    token,
  });

  return res;
}
