"use client";

import { useState } from "react";
import { Button, InputNumber } from "antd";
import { TbShoppingBag } from "react-icons/tb";

interface AddProductCartProps {
  price: number;
  productId: string;
  variant?: "small-card" | "product-detail";
  onAddToCart?: (productId: string, quantity: number) => void;
}

export default function AddProductCart({
  price,
  productId,
  variant = "small-card",
  onAddToCart,
}: Readonly<AddProductCartProps>) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(productId, quantity);
  };

  return (
    <div
      className={`flex flex-col justify-end grow  ${
        variant === "small-card" ? "mt-4 gap-2 sm:gap-0" : "gap-4"
      }`}
    >
      <div
        className={`${
          variant === "small-card"
            ? "text-lg text-red-500 font-semibold"
            : "text-3xl text-brinco font-bold"
        }`}
      >
        {price.toFixed(2).replace(".", ",")} USD
      </div>

      <div
        className={`flex flex-col sm:flex-row items-center ${
          variant === "small-card" ? "justify-between" : "sm:gap-5"
        } mb-0 gap-2 sm:gap-0`}
      >
        <div
          className={`flex items-center gap-1 ${
            variant === "small-card" ? "w-full" : ""
          }`}
        >
          <Button
            style={{
              padding: 0,
              width: 30,
              fontWeight: "bold",
              ...(variant === "product-detail" && {
                fontSize: 18,
              }),
            }}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </Button>
          <div className="w-full sm:max-w-20 font-bold">
            <InputNumber
              style={{
                width: "100%",

                ...(variant === "product-detail" && {
                  fontSize: 18,
                }),
              }}
              min={1}
              value={quantity}
              onChange={(value) => setQuantity(value || 1)}
            />
          </div>
          <Button
            style={{
              padding: 0,
              width: 30,
              fontWeight: "bold",
              ...(variant === "product-detail" && {
                fontSize: 18,
              }),
            }}
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </Button>
        </div>

        <div className="w-full sm:w-auto">
          <Button
            type="primary"
            onClick={handleAddToCart}
            style={{
              width: "100%",
              padding: `${variant === "small-card" ? "0 10px" : "0"}`,
              boxShadow: "none",
            }}
            styles={{
              icon: { fontSize: 25 },
            }}
            size="middle"
            icon={
              variant === "small-card" ? (
                <TbShoppingBag size={25} className="" />
              ) : null
            }
            className="aspect-square"
          >
            {variant === "product-detail" && (
              <p className="text-xl py-1 px-5 font-semibold rounded-xl w-full sm:w-auto">
                Añadir al carrito
              </p>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
