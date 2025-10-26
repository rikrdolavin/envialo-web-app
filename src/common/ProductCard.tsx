"use client";

import { useState } from "react";
import { Card, Button, InputNumber } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ShoppingOutlined } from "@ant-design/icons";

interface ProductCardProps {
  id: string;
  lang: string;
  name: string;
  price: number;
  imageUrl: string;
  onAddToCart?: (productId: string, quantity: number) => void;
}

export default function ProductCard({
  id,
  lang,
  name,
  price,
  imageUrl,
  onAddToCart,
}: Readonly<ProductCardProps>) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/${lang}/product/${id}`);
  };

  const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(id, quantity);
  };

  return (
    <Card
      className="w-full max-w-sm shadow-sm"
      styles={{
        body: {
          padding: "1rem",
          height: "100%",
        },
      }}
    >
      <div className="flex flex-col h-full">
        <div className="cursor-pointer" onClick={handleNavigate}>
          <Image
            src={imageUrl}
            alt={name}
            width={300}
            height={300}
            className="object-contain w-full h-40"
          />
          <p className="line-clamp-2 my-2">{name}</p>
        </div>

        <div className="flex flex-col justify-end grow mt-4 gap-2 sm:gap-0">
          <div className="text-lg font-semibold text-red-500">
            ${price.toFixed(2).replace(".", ",")}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between mb-0 gap-2 sm:gap-0">
            <div className="flex items-center gap-1 w-full">
              <Button
                style={{ padding: 0, width: 30 }}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </Button>
              <div className="w-full sm:max-w-20">
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  value={quantity}
                  onChange={(value) => setQuantity(value || 1)}
                />
              </div>
              <Button
                style={{ padding: 0, width: 30 }}
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </Button>
            </div>

            <div className="w-full sm:w-auto">
              <Button
                type="primary"
                onClick={handleAddToCart}
                style={{ width: "100%", padding: "0 4px" }}
                styles={{
                  icon: { fontSize: 25 },
                }}
                size="middle"
                icon={<ShoppingOutlined />}
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
