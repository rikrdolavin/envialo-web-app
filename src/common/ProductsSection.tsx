"use client";

import ProductCard from "@/common/ProductCard";
import SkeletonProductCard from "@/common/SkeletonProductCard";
import { Product, ProductsPaginatedResponse } from "@/models/products";
import { use } from "react";

interface ProductsSection {
  productsResponse1: Promise<ProductsPaginatedResponse>;
}

export default function ProductsSection({
  productsResponse1,
}: Readonly<ProductsSection>) {
  const productsResponse = use(productsResponse1);
  let products: Product[] = [];
  if (productsResponse.data) {
    products = productsResponse.data;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {products.length > 0 ? (
        products.map((product, idx) => (
          <ProductCard lang="es" product={product} key={idx} />
        ))
      ) : (
        <>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((el, i) => (
            <SkeletonProductCard key={i} />
          ))}
        </>
      )}
    </div>
  );
}
