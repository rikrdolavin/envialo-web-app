import { Locale } from "@/models/language";
import { getDictionary } from "../dictionaries";
import { getProducts } from "@/lib/products";
import { ProductsPaginatedResponse } from "@/models/products";
import Link from "next/link";
import FilterSection from "./components/FilterSection";
import WrapperContainer from "@/common/layout/WrapperContainer";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const products: ProductsPaginatedResponse = await getProducts({
    limit: 20,
    offset: 0,
  });

  if (products.status == "success") {
    return (
      <WrapperContainer className="mx-auto py-10 px-4">
        <FilterSection products={products} lang={lang} />
      </WrapperContainer>
    );
  } else {
    // temporal para cuando no carguen los productos
    return (
      <WrapperContainer className="mx-auto py-10 px-4">
        <div className="h-screen">
          Hubo un error al cargar los productos{" "}
          <Link href={`/${lang}/home`}>Recargar</Link>
        </div>
      </WrapperContainer>
    );
  }
}
