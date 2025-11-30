"use client";

import { useState } from "react";
import { Button, Pagination } from "antd";
import IconoFiltro from "./FilterIcon"; 
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
        <div className="flex flex-col sm:flex-row justify-between items-center  px-3 py-3  mb-3  bg-white text-shadow-black rounded-sm">
        <p className="flex flex-col">
            <span className="text-[22px] font-bold">Lista de Productos</span>
            <span className="text-[18px]">Se encontraron {products.total} resultados</span>
        </p>
        <Button
            style={{
            backgroundColor: showFilter ? "#fff" : "#2c8254",
            borderColor: "#2c8254",
            color: showFilter ? "#2c8254" : "#fff",
            height: 45,     
            width:155,         
            fontSize: 16,             
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontWeight: 600,
            padding: "0 10px",       
            transition: "all 0.2s",
            }}
            icon={
            showFilter
                ? <IconoFiltro fill="#2c8254" size={20} />
                : <IconoFiltro fill="#fff" bg="#2c8254" size={20} />
            }
            onClick={() => setShowFilter((prev) => !prev)}
        >
            {showFilter ? "Ocultar Filtros" : "Mostrar Filtros"}
        </Button>
        </div>


      <div className="flex flex-col  gap-2 sm:flex-row">
        {showFilter && <Filter />}
        <div className="flex flex-col0 flex-wrap gap-3 transition-all duration-300">
          {products.results && (
            <ProductsList lang={lang} products={products.results} variant={`${showFilter ? 'filtercatalog':'catalog'}`}/>
          )}
          <div className="flex justify-center">
            <Pagination defaultCurrent={1} total={products.total} />
          </div>
        </div>
      </div>
    </div>
  );
}
