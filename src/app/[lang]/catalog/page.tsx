import { Locale } from "@/models/language";
import { getDictionary } from "../dictionaries";
import { getProducts } from "@/lib/products";
import { ProductsPaginatedResponse } from "@/models/products";

import Link from "next/link";

import WrapperContainer from "@/common/layout/WrapperContainer";
import ProductsList from "../home/components/ProductsList";
import { Button } from "antd";
import { Pagination } from 'antd';
import Filter from "./components/Filter";


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
      <div >
         
        <WrapperContainer className="mx-auto my-10 px-4">
            <div className="flex justify-between items-center  mb-2  bg-[#ffffff] text-3xl text-shadow-black">
             <p className="ml-4 mb-2"> 
            <h2> <b>Lista de Productos</b></h2>
            <span>Se encontraron {products.total} resultados</span>
          </p>
          <Button className=" mr-4 bg-[#2c8254]! text-5xl text-white!"> Mostrar Filtros </Button>
          </div>  

           <div className="flex gap-2 sm:flex-col-1  md:flex lg:flex xl:flex">

            <Filter/>

            <div className="flex flex-col flex-wrap gap-3">
              
                 
                  {products.results && (
                   <ProductsList lang={lang} products={products.results} />
                  )}

              
              <Pagination align="center" defaultCurrent={1} total={products.total} />;

            </div>

            
        </div>
      

        </WrapperContainer>
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
