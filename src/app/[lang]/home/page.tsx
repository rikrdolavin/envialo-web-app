import { Locale } from "@/models/language";
import { getProducts } from "@/lib/products";
import HomeCarousel from "./components/HomeCarousel";
import WrapperContainer from "@/common/layout/WrapperContainer";
import PromotionalBanner from "./components/PromotionalBanner";
import PromotionalPayBanner from "./components/PromotionalPayBanner";
import LinkButton from "@/common/LinkButton";
import ProductsSection from "@/common/ProductsSection";
import { getDictionary } from "../dictionaries";
import { ApiPaginationResponse, ApiResponse } from "@/types/api";
import { Product } from "@/models/products";
import { use } from "react";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export const dynamic = "force-dynamic";

export default function Page({ params }: Readonly<PageProps>) {
  const { lang } = use(params);
  const see_more_text = use(getDictionary(lang)).home.see_more;

  const productsResponse: ApiResponse<ApiPaginationResponse<Product>> = use(
    getProducts({
      page: 1,
      pageSize: 10,
    }),
  );

  const products = productsResponse.success
    ? productsResponse.data
    : { page: 1, pageSize: 0, totalCount: 0, totalPages: 0, data: [] };

  return (
    <div>
      <HomeCarousel />
      <WrapperContainer className="mx-auto py-10 px-4">
        <div className="mb-4 w-full ">
          <LinkButton
            url={`/${lang}/catalog`}
            text={see_more_text}
            className="ml-auto"
          />
        </div>
        <ProductsSection products={products!} lang={lang} />
        <PromotionalBanner lang={lang} />
        <ProductsSection products={products!} lang={lang} />
        <PromotionalPayBanner lang={lang} />
        <ProductsSection products={products!} lang={lang} />
      </WrapperContainer>
    </div>
  );
}
