"use client";

import { CartItem as CartItemType } from "@/models/cart";
import { Button, Card } from "antd";
import Image from "next/image";
import { BsTrash3Fill } from "react-icons/bs";
import RemoveCartItemButton from "./RemoveCartItemButton";
import { useCart } from "@/context/CartContext";

interface CartItemProps {
  cartItem: CartItemType;
}

export default function CartItem({ cartItem }: Readonly<CartItemProps>) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleUpdateQuantity = async (amount: number) => {
    if (cartItem.quantity + amount < 1) return;
    await updateQuantity(cartItem.productId, amount);
  };

  const handleRemove = async () => {
    await removeFromCart(cartItem.productId);
  };

  return (
    <Card
      classNames={{
        body: "flex items-center justify-between shadow-lg gap-5 lg:gap-0 text-base",
      }}
      className="rounded-2xl"
    >
      {/* imagen y nombre */}
      <div className="w-28 aspect-square border lg:hidden shrink-0">
        <Image
          src={(cartItem.product?.image as string) ?? "/assets/no_image.png"}
          width={200}
          height={200}
          alt={cartItem.productId}
          className="w-28 aspect-square object-contain"
        />
      </div>
      <div className="flex lg:grid lg:grid-cols-5 lg:items-center justify-between w-full flex-wrap flex-col lg:flex-row gap-2">
        <div className="flex items-start lg:items-center gap-5 lg:col-span-2">
          {/* imagen */}
          <div className="w-20 aspect-square border hidden lg:block shrink-0">
            <Image
              src={
                (cartItem.product?.image as string) ?? "/assets/no_image.png"
              }
              width={100}
              height={100}
              alt={cartItem.productId}
              className="w-20 aspect-square object-contain"
            />
          </div>
          {/* nombre */}
          <p className="line-clamp-1 md:line-clamp-2">
            {cartItem.product?.name}
          </p>
          <Button
            icon={<BsTrash3Fill className="text-red-600 text-base" />}
            type="text"
            className="rounded-full flex-1 max-sm:hidden lg:hidden"
            onClick={handleRemove}
          />
        </div>

        {/* precio y cantidad */}
        <p className="font-bold md:font-normal w-full lg:w-auto lg:text-end">
          {cartItem.product?.priceUnit ?? 0} USD
        </p>
        <div className="flex items-center justify-center gap-2 w-full lg:w-auto font-bold">
          <Button
            type="primary"
            className="text-xl h-6 pb-1 px-4 lg:px-5"
            onClick={() => handleUpdateQuantity(-1)}
            disabled={cartItem.quantity <= 1}
          >
            -
          </Button>
          <p className="text-lg min-w-8 text-center">{cartItem.quantity}</p>
          <Button
            type="primary"
            className="text-xl h-6 pb-1 px-4 lg:px-5"
            onClick={() => handleUpdateQuantity(1)}
          >
            +
          </Button>
        </div>

        {/* total y eliminar */}
        <div className="flex justify-between items-center lg:justify-end gap-5">
          <div className="lg:text-end pe-5">
            <p className="lg:hidden text-sm text-gray-500">Total</p>
            <strong className="text-brinco lg:text-black">
              {cartItem.quantity * (cartItem.product?.priceUnit ?? 0)} USD
            </strong>
          </div>
          <RemoveCartItemButton itemId={cartItem.productId} />
        </div>
      </div>
    </Card>
  );
}
