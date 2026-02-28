import { getProducts } from "@/lib/products";
import Catalog from "./components/Catalog";
import WrapperContainer from "@/common/layout/WrapperContainer";
import { use } from "react";
import { ApiPaginationResponse, ApiResponse } from "@/types/api";
import { Product } from "@/models/products";

export default function Page() {
  const productsResponse: ApiResponse<ApiPaginationResponse<Product>> = use(
    getProducts({
      page: 1,
      pageSize: 24,
    }),
  );

  const products = productsResponse.success
    ? (productsResponse.data as ApiPaginationResponse<Product>)
    : { page: 1, pageSize: 0, totalCount: 0, totalPages: 0, data: [] };

  return (
    <WrapperContainer className="mx-auto py-10 px-4">
      <Catalog initialProducts={products} />
    </WrapperContainer>
  );
}
