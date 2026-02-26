"use client";

import { Card } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AddProductCart from "./product-card/AddProductCart";
import { Product } from "@/models/products";

interface ProductCardProps {
  product: Product;
  lang: string;
}

export default function ProductCard({
  product,
  lang,
}: Readonly<ProductCardProps>) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/${lang}/product-details/${product.id}`);
  };

  return (
    <Card
      className="w-full max-w-sm shadow-md rounded-2xl! border border-gray-200/70!"
      variant="outlined"
      styles={{
        body: {
          padding: "1rem",
          height: "100%",
        },
      }}
    >
      <div className="flex flex-col h-full min-h-96">
        <div className="cursor-pointer" onClick={handleNavigate}>
          <Image
            src={(product.image as string) ?? "/assets/no_image.png"}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain w-full h-52"
          />
          <p className="line-clamp-2 my-2">{product.name}</p>
        </div>

        <AddProductCart
          price={product.priceUnit}
          productId={product.id.toString()}
        />
      </div>
    </Card>
  );
}
