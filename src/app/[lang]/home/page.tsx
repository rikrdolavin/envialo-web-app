import { Locale } from "@/models/language";
import { getDictionary } from "../dictionaries";
import { getProducts } from "@/lib/products";
import { ProductsPaginatedResponse } from "@/models/products";
import ProductsList from "./components/ProductsList";
import HomeCarousel from "./components/HomeCarousel"
import PromocionalBanner from "@/common/PromocionalBanner";
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
     console.log(products);
    return (
     
      <div>
         <HomeCarousel/>
         {products.results && (
          <ProductsList lang={lang} products={products.results} />
        )}
        <PromocionalBanner/>

      </div>
     
      
    );
  } else {
    return (
           
       <div className="h-screen">
       <HomeCarousel/>
        Hubo un error al cargar los productos{" "}
       <Link href={`/${lang}/home`}>Recargar</Link>
        <PromocionalBanner/>
       </div>
         
    );
  }
}
