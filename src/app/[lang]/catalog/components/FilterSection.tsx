"use client";

import { useState } from "react";
import { Button, Pagination } from "antd";
import IconoFiltro from "./FilterIcon"; // solo cambia ruta si lo mueves
import Filter from "./Filter";
import { ProductsPaginatedResponse } from "@/models/products";
import ProductsList from "../../home/components/ProductsList";

interface Props {
  products: ProductsPaginatedResponse;
  lang: string;
  dict: any;
}

export default function FilterSection({ products, lang, dict }: Props) {
  const [showFilter, setShowFilter] = useState(true);

  return (
    <div>
     {/* Header y botón */}
        <div className="flex flex-col sm:flex-row justify-between items-center mx-5 mb-4 mt-20 bg-[#ffffff] text-shadow-black rounded-sm">
        <p className="flex flex-col ml-4 mb-2">
            <span className="text-[26px] font-bold">Lista de Productos</span>
            <span className="text-[22px]">Se encontraron {products.total} resultados</span>
        </p>
        <Button
            className="mb-4 sm:mr-4 sm:mb-0"
            style={{
            backgroundColor: showFilter ? "#fff" : "#2c8254",
            borderColor: "#2c8254",
            color: showFilter ? "#2c8254" : "#fff",
            height: 54,              
            fontSize: 20,             
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 600,
            padding: "0 20px",       
            transition: "all 0.2s",
            }}
            icon={
            showFilter
                ? <IconoFiltro fill="#2c8254" size={24} />
                : <IconoFiltro fill="#fff" bg="#2c8254" size={24} />
            }
            onClick={() => setShowFilter((prev) => !prev)}
        >
            {showFilter ? "Ocultar Filtros" : "Mostrar Filtros"}
        </Button>
        </div>


      {/* Filtro y grid de productos */}
      <div className="flex flex-col  gap-2 sm:flex-row">
        {showFilter && <Filter />}
        <div className={`flex flex-col ml-5 mr-5 flex-wrap gap-3 transition-all duration-300 ${showFilter ? "sm:ml-0" : "ml-5"}`}>
          {products.results && (
            <ProductsList lang={lang} products={products.results} gridClassName="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full" />
          )}
          <div className="flex justify-center my-5 sm:my-10 ">
            <Pagination defaultCurrent={1} total={products.total} />
          </div>
        </div>
      </div>
    </div>
  );
}
