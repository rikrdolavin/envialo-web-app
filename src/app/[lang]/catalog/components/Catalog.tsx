"use client";

import { useCallback, useState } from "react";
import { Button } from "antd";
import IconoFiltro from "./FilterIcon";
import Filter from "./Filter";
import { Product, ProductVariant } from "@/models/products";
import { ApiPaginationResponse } from "@/types/api";
import { useLang } from "@/context/LangContext";
import SkeletonProductCard from "@/common/SkeletonProductCard";
import ProductCard from "@/common/ProductCard";
import Pagination from "./Pagination";

interface CatalogProps {
  initialProducts: ApiPaginationResponse<Product>;
}

export default function Catalog({ initialProducts }: Readonly<CatalogProps>) {
  const { lang, dictionary } = useLang();
  const catalogDict = dictionary.catalog;
  const [showFilter, setShowFilter] = useState(true);
  const [filtersControl, setFiltersControl] = useState({
    page: initialProducts.page,
  });
  const [productsResponse, setProductsResponse] =
    useState<ApiPaginationResponse<Product>>(initialProducts);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    const res = await fetch(`/api/product?page=${page}`);
    const products = await res.json();

    setProductsResponse(products.data);
    setLoading(false);
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center px-3 py-3 mb-10 bg-white text-shadow-black rounded-sm">
        <p className="flex flex-col">
          <span className="text-[22px] font-bold">{catalogDict.title}</span>
          <span className="text-[18px]">
            {catalogDict.subtitle_p1} {productsResponse.totalCount}{" "}
            {catalogDict.subtitle_p2}
          </span>
        </p>
        <Button
          style={{
            backgroundColor: showFilter ? "#fff" : "#2c8254",
            borderColor: "#2c8254",
            color: showFilter ? "#2c8254" : "#fff",
            height: 45,
            width: 155,
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600,
            padding: "0 10px",
            transition: "all 0.2s",
          }}
          className=""
          icon={
            showFilter ? (
              <IconoFiltro fill="#2c8254" size={20} />
            ) : (
              <IconoFiltro fill="#fff" bg="#2c8254" size={20} />
            )
          }
          onClick={() => setShowFilter((prev) => !prev)}
        >
          {showFilter
            ? catalogDict.filters.hide_filters
            : catalogDict.filters.show_filters}
        </Button>
      </div>

      <div className="flex flex-col  gap-5 sm:flex-row">
        {showFilter && <Filter />}
        <div className="flex flex-col flex-wrap gap-3 transition-all duration-300">
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-${showFilter ? "4" : "6"} gap-5`}
          >
            {!loading &&
            productsResponse.data &&
            productsResponse.data.length > 0 ? (
              productsResponse.data.map((product, idx) => (
                <div key={idx + "-product"} className="flex justify-center">
                  <ProductCard
                    lang={lang}
                    product={product as unknown as ProductVariant}
                  />
                </div>
              ))
            ) : (
              <>
                {[1, 2, 3, 4, 5, 6].map((el, i) => (
                  <SkeletonProductCard key={i + el} />
                ))}
              </>
            )}
          </div>
          <div className="flex justify-center mt-5">
            <Pagination
              page={filtersControl.page}
              totalCount={productsResponse.totalCount}
              pageSize={productsResponse.pageSize}
              onChange={(page) => {
                setFiltersControl((prev) => ({ ...prev, page }));
                fetchProducts(page);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
