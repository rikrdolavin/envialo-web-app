"use client";

import ProductCard from "@/common/ProductCard";
import { Product } from "@/models/products";

interface ProductsListProps {
  products: Product[];
  lang: string;
  gridClassName:string;
}

export default function ProductsList({
  products,
  lang,
  gridClassName
}: Readonly<ProductsListProps>) {
  return (
    <div className={gridClassName}>
      {products.map((el) => (
        <ProductCard
          id={el.id.toString()}
          imageUrl={el.image ?? "/assets/no_image.png"}
          lang={lang}
          name={el.name}
          price={el.price_cost}
          key={el.id}
        />
      ))}
    </div>
  );
}
