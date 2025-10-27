import { Locale } from "@/models/language";
import { getDictionary } from "../../dictionaries";
import { getProductDetails } from "@/lib/products";
import { Product, ProductDetailsResponse } from "@/models/products";
import ProductCard from "./components/ProductCard";
import ProductImagesCarousel from "./components/ProductImageCarousel";

interface PageProps {
  params: Promise<{ lang: Locale["locale"]; id: string }>;
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  const product: ProductDetailsResponse = await getProductDetails(id);

  const listImages: string[] = [];
  // listImages.push(product.result.image ?? "/assets/no_image.png");
  // listImages.push(product.result.image2 ?? "/assets/no_image.png");
  // listImages.push(product.result.image3 ?? "/assets/no_image.png");
  // listImages.push(product.result.image4 ?? "/assets/no_image.png");

  const elements: (keyof Product)[] = ["image", "image2", "image3", "image4"];

  for (const element of elements) {
    const image = product.result[element];
    listImages.push((image as string) ?? "/assets/no_image.png");
  }

  console.log(product);
  return (
    <div>
      <ProductImagesCarousel listImages={listImages} />

      {product && (
        <ProductCard
          id={product.result.id.toString()}
          lang={lang}
          name={product.result.name}
          price={product.result.price_unit}
          descripcion={product.result.description}
          // onAddToCart={() => {}}
          key={product.result.id.toString()}
        />
      )}
    </div>
  );
}
