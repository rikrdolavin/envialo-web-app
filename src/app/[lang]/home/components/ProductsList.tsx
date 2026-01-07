"use client";

import ProductCard from "@/common/ProductCard";
import { Product } from "@/models/products";

type GridVariant = "home" | "filtercatalog" | "catalog";

const gridVariants: Record<GridVariant, string> = {
  home: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 w-full",
  filtercatalog:
    "grid grid-cols-2 md:ml-5 md:grid-cols-2 gap-5 w-full lg:grid-cols-3 xl:grid-cols-4 2xl:grid-col-6",
  catalog:
    "grid grid-cols-2 md:grid-cols-3 gap-5 w-full lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6",
} as const;

interface ProductsListProps {
  products: Product[];
  lang: string;
  variant?: GridVariant;
}

export default function ProductsList({
  products,
  lang,
  variant = "home",
}: Readonly<ProductsListProps>) {
  const gridClassName = gridVariants[variant];

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
