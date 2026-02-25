import { Locale } from "@/models/language";
import { getProducts } from "@/lib/products";
import { ProductsPaginatedResponse } from "@/models/products";
import HomeCarousel from "./components/HomeCarousel";
import WrapperContainer from "@/common/layout/WrapperContainer";
import PromotionalBanner from "./components/PromotionalBanner";
import PromotionalPayBanner from "./components/PromotionalPayBanner";
import LinkButton from "@/common/LinkButton";
import ProductsSection from "@/common/ProductsSection";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { lang } = await params;

  const products: Promise<ProductsPaginatedResponse> = getProducts({
    page: 1,
    pageSize: 10,
  });
  return (
    <div>
      <HomeCarousel />
      <WrapperContainer className="mx-auto py-10 px-4">
        <div className="mb-4 w-full ">
          <LinkButton
            url={`/${lang}/catalog`}
            text="Ver más"
            className="ml-auto"
          />
        </div>
        <ProductsSection productsResponse1={products} />
        <PromotionalBanner lang={lang} />
        <ProductsSection productsResponse1={products} />
        <PromotionalPayBanner lang={lang} />
        <ProductsSection productsResponse1={products} />
      </WrapperContainer>
    </div>
  );
}
