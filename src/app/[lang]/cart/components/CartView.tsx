"use client";

import { Skeleton } from "antd";
import { useCart } from "@/context/CartContext";
import EmptyCart from "./EmptyCart";
import CartProducts from "./CartProducts";

export default function CartView() {
  const { loading, cartCount } = useCart();

  if (loading) {
    return (
      <div className="mt-10">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  return cartCount > 0 ? <CartProducts /> : <EmptyCart />;
}
