import { ProductDetails } from "./components/ProductDetails";
import WrapperContainer from "@/common/layout/WrapperContainer";
import { Suspense, use } from "react";
import ProductDetailsSkeleton from "./components/ProductDetailsSkeleton";
import { Locale } from "@/models/language";

interface PageProps {
  params: Promise<{ id: string; lang: Locale["locale"] }>;
}

export default function Page({ params }: Readonly<PageProps>) {
  const { id, lang } = use(params);

  return (
    <Suspense
      fallback={
        <WrapperContainer className="min-h-screen py-10 mx-auto px-4">
          <ProductDetailsSkeleton />
        </WrapperContainer>
      }
    >
      <ProductDetails id={id} lang={lang} />
    </Suspense>
  );
}
