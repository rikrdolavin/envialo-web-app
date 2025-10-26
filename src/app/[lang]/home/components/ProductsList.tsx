"use client";

import ProductCard from "@/common/ProductCard";
import { Product } from "@/models/products";

interface ProductsListProps {
  products: Product[];
  lang: string;
}

export default function ProductsList({
  products,
  lang,
}: Readonly<ProductsListProps>) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full">
      {products.map((el) => (
        <ProductCard
          id={el.id.toString()}
          imageUrl={el.image ?? "/assets/no_image.png"}
          lang={lang}
          name={el.name}
          price={el.price_cost}
          onAddToCart={() => {}}
          key={el.id}
        />
      ))}
    </div>
  );
}
