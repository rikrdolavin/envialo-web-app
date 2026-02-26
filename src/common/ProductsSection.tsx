import ProductCard from "@/common/ProductCard";
import SkeletonProductCard from "@/common/SkeletonProductCard";
import { Locale } from "@/models/language";
import { Product } from "@/models/products";
import { ApiPaginationResponse } from "@/types/api";
import { Suspense } from "react";

interface ProductsSection {
  products: ApiPaginationResponse<Product>;
  lang: Locale["locale"];
}

export default function ProductsSection({
  products,
  lang,
}: Readonly<ProductsSection>) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      <Suspense
        fallback={
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, i) => (
              <SkeletonProductCard key={i + el} />
            ))}
          </>
        }
      >
        {products.data && products.data.length > 0 ? (
          products.data.map((product, idx) => (
            <ProductCard lang={lang} product={product} key={idx + "-product"} />
          ))
        ) : (
          <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((el, i) => (
              <SkeletonProductCard key={i + el} />
            ))}
          </>
        )}
      </Suspense>
    </div>
  );
}
