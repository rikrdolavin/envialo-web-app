"use client";

import { Card } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AddProductCart from "./product-card/AddProductCart";

interface ProductCardProps {
  id: string;
  lang: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function ProductCard({
  id,
  lang,
  name,
  price,
  imageUrl,
}: Readonly<ProductCardProps>) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/${lang}/product-details/${id}`);
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

        <AddProductCart price={price} productId={id} />
      </div>
    </Card>
  );
}
