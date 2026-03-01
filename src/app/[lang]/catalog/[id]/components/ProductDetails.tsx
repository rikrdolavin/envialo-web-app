import WrapperContainer from "@/common/layout/WrapperContainer";
import AddProductCart from "@/common/product-card/AddProductCart";
import { TextWithLineBreaks } from "@/common/TextWithLineBreaks";
import { getProductDetails } from "@/lib/products";
import { Product } from "@/models/products";
import { ApiResponse } from "@/types/api";
import Image from "next/image";
import { use } from "react";
import ProductDetailsSkeleton from "./ProductDetailsSkeleton";
import { getBackRoute } from "@/lib/utils";
import { headers } from "next/headers";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Locale } from "@/models/language";

interface ProductDetailsProps {
  id: string;
  lang: Locale["locale"];
}

export function ProductDetails({ id, lang }: Readonly<ProductDetailsProps>) {
  const headersResponse = use(headers());
  const referer = headersResponse.get("referer");
  const backRoute = getBackRoute(referer);

  const productResponse: ApiResponse<Product> = use(getProductDetails(id));
  const product = productResponse.data;

  return (
    <WrapperContainer className="min-h-screen py-10 mx-auto px-4">
      <Link href={`/${lang}/${backRoute}`}>
        <ArrowLeftOutlined className="text-brinco cursor-pointer text-2xl" />
      </Link>
      {!productResponse.success || !product ? (
        <ProductDetailsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full lg:max-w-6xl mx-auto">
          <div className="md:sticky md:top-20 md:self-start">
            <Image
              src={product?.image ?? "/assets/no_image.png"}
              width={500}
              height={500}
              className="mx-auto shadow-lg rounded-lg"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="py-0.5 px-2 bg-brinco w-min rounded-2xl text-white text-sm">
              {product.categories.length > 0
                ? product.categories[0]
                : "Categoria"}
            </p>

            <p className="text-4xl font-semibold">{product.name}</p>
            <AddProductCart
              price={product.priceUnit}
              productId={product.id.toString()}
              variant="product-detail"
            />

            <TextWithLineBreaks
              className="text-lg"
              text={product.description}
            />
          </div>
        </div>
      )}
    </WrapperContainer>
  );
}
