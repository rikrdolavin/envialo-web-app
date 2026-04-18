"use client";

import { useCart } from "@/context/CartContext";
import { Button } from "antd";
import { BsTrash3Fill } from "react-icons/bs";

interface RemoveCartItemButtonProps {
  itemId: string;
}

export default function RemoveCartItemButton({
  itemId,
}: Readonly<RemoveCartItemButtonProps>) {
  const { removeFromCart } = useCart();

  const removeItem = async () => {
    await removeFromCart(itemId);
  };

  return (
    <Button
      icon={<BsTrash3Fill className="text-red-600 text-base" />}
      type="text"
      className="rounded-full flex-1 sm:hidden lg:block"
      onClick={removeItem}
    />
  );
}
