import AddProductCart from "@/common/product-card/AddProductCart";
import { TextWithLineBreaks } from "@/common/TextWithLineBreaks";
import { Product } from "@/models/products";
import Image from "next/image";

interface ProductDetailsCardProps {
  product: Product;
}

export async function ProductDetailsCard({
  product,
}: Readonly<ProductDetailsCardProps>) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full lg:max-w-6xl mx-auto">
      <div className="md:sticky md:top-20 md:self-start">
        <Image
          src={product.image ?? "/assets/no_image.png"}
          width={500}
          height={500}
          className="mx-auto shadow-lg rounded-lg"
          alt=""
        />
      </div>
      <div className="flex flex-col gap-5">
        {/* category tag */}
        <p className="py-0.5 px-2 bg-brinco w-min rounded-2xl text-white text-sm">
          Categoria
        </p>

        <p className="text-4xl font-semibold">{product.name}</p>
        <AddProductCart
          price={product.price_unit}
          productId={product.id.toString()}
          variant="product-detail"
        />

        <TextWithLineBreaks className="text-lg" text={product.description} />
      </div>
    </div>
  );
}
