"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Collapse, Divider } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import RangePriceSlider from "./RangePriceSlider";
import Image from "next/image";
const { Panel } = Collapse;

const Filter: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [checkedPromos, setCheckedPromos] = useState([false, false, false]);
  const [checkedRatings, setCheckedRatings] = useState([false, false, false, false, false]);
  const ratingRows = [5, 4, 3, 2, 1];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (activeKeys.length === 0) {
        containerRef.current.style.height = "490px";
      } else {
        containerRef.current.style.height = "auto";
      }
    }
  }, [activeKeys]);

  // handler para checkboxes de promociones
  const handlePromoCheck = (index: number) => {
    setCheckedPromos((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  // handler para checkboxes de puntuación
  const handleRatingCheck = (index: number) => {
    setCheckedRatings((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  return (
    <div
      ref={containerRef}
      className="w-auto h-auto sm:w-[400px] bg-white px-5 ml-5 mr-5  mt-0.5 rounded-lg transition-all duration-300 overflow-hidden"
    >
      {/* HEADER */}
      <div className="flex items-center justify-start gap-2 ml-3 mb-4 mt-12 text-2xl font-semibold text-gray-800">
        <Image width={30} height={30} src="/assets/icons/filterp.svg" alt="Icono de Sustítulo de filtro" />
        <span className="text-[30px]">Filtros</span>
      </div>

      <Collapse
        accordion={false}
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(keys as string[])}
        expandIcon={({ isActive }) => (
          <span
            style={{
              fontSize: "22px",
              color: "#757575",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "22px",
              height: "22px",
              lineHeight: "22px",
              transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
              textShadow: `
                0.3px 0 0 #757575,
                -0.3px 0 0 #757575,
                0 0.3px 0 #757575,
                0 -0.3px 0 #757575
              `
            }}
          >
            ⌵
          </span>
        )}
        expandIconPosition="end"
        bordered={false}
        ghost={true}
      >
        {/* PRECIO */}
        <Panel header={<b className="text-[18px]">Precio</b>} key="0" >
          <RangePriceSlider />
        </Panel>

        {/* CATEGORÍAS: Links personalizados */}
        <Panel header={<b className="text-[18px]">Categorías</b>} key="1">
          <div className="flex flex-col gap-1 ">
            <Link href="/categoria/alimentos" className="text-[17px]! categoria-link">Alimentos y Bebidas</Link>
            <Link href="/categoria/electrodomesticos" className="text-[17px]! categoria-link">Electrodomésticos</Link>
            <Link href="/categoria/ferreteria" className="text-[17px]! categoria-link">Ferretería y Construcción</Link>
            <Link href="/categoria/aseo" className="text-[17px]! categoria-link">Aseo y Limpieza</Link>
            <Link href="/categoria/hogar" className="text-[17px]! categoria-link">Hogar</Link>
            <Link href="/categoria/automotriz" className="text-[17px]! categoria-link">Automotriz</Link>
          </div>
        </Panel>

        {/* PROMOCIONES */}
        <Panel header={<b className="text-[18px]">Promociones</b>} key="2">
          <div className="flex flex-col gap-3 text-[16px]">
            {["Productos recientes", "Productos en oferta", "Productos con entrega gratis"].map((texto, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedPromos[i]}
                  onChange={() => handlePromoCheck(i)}
                  className="w-[7px] h-[7px] accent-[#2c8254] border-2 border-[#666666] rounded transition-all"
                  style={{ minWidth: "1rem", minHeight: "1rem" }}
                />
                <span className="text-[18px]">{texto}</span>
              </label>
            ))}
          </div>
        </Panel>

        {/* PUNTUACIÓN */}
        <Panel header={<b className="text-[18px]">Puntuación</b>} key="3">
          <div className="flex flex-col justify-center items-center gap-2 text-[18px]">
            {ratingRows.map((filledStars, i) => (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedRatings[i]}
                  onChange={() => handleRatingCheck(i)}
                  className="w-[7px] h-[7px] accent-[#2c8254] border-2 border-[#666666] rounded transition-all"
                  style={{ minWidth: "1rem", minHeight: "1rem" }}
                />
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, j) =>
                    j < filledStars ? (
                      <span key={j} className="text-[28px] " style={{ color: "#f5b301"}}>★</span>
                    ) : (
                      <span key={j} className="text-[28px] " style={{ color: "#f5b301" }}>☆</span>
                    )
                  )}
                </div>
                <span className=" text-gray-700 text-[15px]">y más</span>
              </label>
            ))}
          </div>
        </Panel>
      </Collapse>

      <Divider className="mt-1 mb-0 border-gray-300" />

      {/* BOTÓN */}
      <div className="flex justify-center">
        <button className="flex mb-4 sm:mb-0 items-center gap-2 text-red-600 font-light text-[14px] capitalize hover:text-red-500">
          <ReloadOutlined style={{ transform: "rotate(-320deg) scaleX(-1)", fontSize: 16 }} />
          Borrar filtros
        </button>
      </div>

      {/* Forzar estilos de los links */}
      <style jsx>{`
        :global(.categoria-link) {
          font-size: 22px !important;
          color: #2d2d2d !important;
          text-decoration: none !important;
          transition: color 0.2s, text-decoration 0.2s;
          cursor: pointer;
        }
        :global(.categoria-link:hover) {
          color: #2c8254 !important;
          text-decoration: underline !important;
        }
      `}</style>
    </div>
  );
};

export default Filter;

