import { Locale } from "@/models/language";
import { getDictionary } from "../dictionaries";
import { getProducts } from "@/lib/products";
import { ProductsPaginatedResponse } from "@/models/products";
import ProductsList from "./components/ProductsList";
import Link from "next/link";
import HomeCarousel from "./components/HomeCarousel";
import WrapperContainer from "@/common/layout/WrapperContainer";
import PromotionalBanner from "./components/PromotionalBanner";
import PromotionalPayBanner from "./components/PromotionalPayBanner";
import LinkButton from "@/common/LinkButton";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const products: ProductsPaginatedResponse = await getProducts({
    limit: 10,
    offset: 0,
  });

  if (products.results) {
    return (
      <div>
        <HomeCarousel />
        {/* <BreadCrumbs /> */}
        <WrapperContainer className="mx-auto py-10 px-4">
          <div className="mb-4 w-full ">
            <LinkButton
              url={`/${lang}/catalog`}
              text="Ver más"
              className="ml-auto"
            />
          </div>
          {products.results && (
            <ProductsList
              lang={lang}
              products={products.results}
              variant="home"
            />
          )}

          <PromotionalBanner />
          {products.results && (
            <ProductsList
              lang={lang}
              products={products.results}
              variant="home"
            />
          )}
          <PromotionalPayBanner lang={lang} />
        </WrapperContainer>
      </div>
    );
  } else {
    return (
      <div className="h-screen">
        <HomeCarousel />
        {/* <BreadCrumbs /> */}
        Hubo un error al cargar los productos{" "}
        <Link href={`/${lang}/home`}>Recargar</Link>
        <PromotionalBanner />
        <PromotionalPayBanner lang={lang} />
      </div>
    );
  }
}
