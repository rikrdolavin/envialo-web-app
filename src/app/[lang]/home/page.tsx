import { Locale } from "@/models/language";
import { getDictionary } from "../dictionaries";
import { getProducts } from "@/lib/cart";
import { ProductsPaginatedResponse } from "@/models/products";
import ProductsList from "./components/ProductsList";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  // const products: ProductsPaginatedResponse = await getProducts({
  //   limit: 20,
  //   offset: 0,
  // });

  return (
    <div className="min-h-screen">
      {/* <ProductsList lang={lang} products={products.results} /> */}
    </div>
  );
}
