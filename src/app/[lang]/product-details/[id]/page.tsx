import { Locale } from "@/models/language";
import { getDictionary } from "../../dictionaries";
import { getProductDetails } from "@/lib/products";
import { ProductDetailsResponse } from "@/models/products";
import { ProductDetailsCard } from "./components/ProductDetailCard";
import WrapperContainer from "@/common/layout/WrapperContainer";

interface PageProps {
  params: Promise<{ lang: Locale["locale"]; id: string }>;
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  const product: ProductDetailsResponse = await getProductDetails(id);

  return (
    <WrapperContainer className="min-h-screen my-10 mx-auto px-4">
      {product && <ProductDetailsCard product={product.result} />}
    </WrapperContainer>
  );
}
