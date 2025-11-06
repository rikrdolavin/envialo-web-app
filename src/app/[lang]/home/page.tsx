import { Locale } from "@/models/language";
import { getDictionary } from "../dictionaries";
import { getProducts } from "@/lib/products";
import { ProductsPaginatedResponse } from "@/models/products";
import ProductsList from "./components/ProductsList";
import Link from "next/link";

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

  if (products.status == "success") {
    return (
      <div>
        {products.results && (
          <ProductsList lang={lang} products={products.results} />
        )}
      </div>
    );
  } else {
    return (
      <div className="h-screen">
        Hubo un error al cargar los productos{" "}
        <Link href={`/${lang}/home`}>Recargar</Link>
      </div>
    );
  }
}
