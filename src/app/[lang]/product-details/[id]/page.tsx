import { Locale } from "@/models/language";
import { getDictionary } from "../../dictionaries";
import { getProductDetails } from "@/lib/products";
import { ProductDetailsResponse } from "@/models/products";
import { ProductDetailsCard } from "./components/ProductDetailCard";

interface PageProps {
  params: Promise<{ lang: Locale["locale"]; id: string }>;
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  const product: ProductDetailsResponse = await getProductDetails(id);

  return (
    <div className="min-h-screen">
      {product && <ProductDetailsCard product={product.result} />}
    </div>
  );
}
