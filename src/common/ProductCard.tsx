"use client";

import { Card } from "antd";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AddProductCart from "./product-card/AddProductCart";
import { Product } from "@/models/products";
import Paragraph from "antd/es/typography/Paragraph";

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
        },
      }}
      cover={
        <Image
          src={(product.image as string) ?? "/assets/no_image.png"}
          alt={product.name}
          width={300}
          height={300}
        />
      }
      hoverable
      onClick={handleNavigate}
    >
      <div className="mb-1 min-h-12">
        <Paragraph
          ellipsis={{ rows: 2 }}
          style={{ marginBottom: 0 }}
          className="font-semibold text-base"
          title={product.name}
        >
          {product.name}
        </Paragraph>
      </div>
      <div onClick={(e) => e.stopPropagation()}>
        <AddProductCart
          price={product.priceUnit}
          productId={product.id.toString()}
          variant="small-card"
        />
      </div>
    </Card>
  );
}
