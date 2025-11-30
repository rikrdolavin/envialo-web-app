"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Collapse, Divider } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import RangePriceSlider from "./RangePriceSlider";
import Image from "next/image";

const Filter: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const [checkedPromos, setCheckedPromos] = useState([false, false, false]);
  const [checkedRatings, setCheckedRatings] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const ratingRows = [5, 4, 3, 2, 1];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      if (activeKeys.length === 0) {
        containerRef.current.style.height = "390px";
      } else {
        containerRef.current.style.height = "auto";
      }
    }
  }, [activeKeys]);

  const handlePromoCheck = (index: number) => {
    setCheckedPromos((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  const handleRatingCheck = (index: number) => {
    setCheckedRatings((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  };

  // NUEVO: items para Collapse en lugar de Panel como children
  const collapseItems = [
    {
      key: "0",
      label: <b className="text-[18px]">Precio</b>,
      children: <RangePriceSlider />,
    },
    {
      key: "1",
      label: <b className="text-[18px]">Categorías</b>,
      children: (
        <div className="flex flex-col gap-1 ">
          <Link
            href="/categoria/alimentos"
            className="text-[17px]! categoria-link"
          >
            Alimentos y Bebidas
          </Link>
          <Link
            href="/categoria/electrodomesticos"
            className="text-[17px]! categoria-link"
          >
            Electrodomésticos
          </Link>
          <Link
            href="/categoria/ferreteria"
            className="text-[17px]! categoria-link"
          >
            Ferretería y Construcción
          </Link>
          <Link href="/categoria/aseo" className="text-[17px]! categoria-link">
            Aseo y Limpieza
          </Link>
          <Link href="/categoria/hogar" className="text-[17px]! categoria-link">
            Hogar
          </Link>
          <Link
            href="/categoria/automotriz"
            className="text-[17px]! categoria-link"
          >
            Automotriz
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      label: <b className="text-[18px]">Promociones</b>,
      children: (
        <div className="flex flex-col gap-3 text-[16px]">
          {[
            "Productos recientes",
            "Productos en oferta",
            "Productos con entrega gratis",
          ].map((texto, i) => (
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
      ),
    },
    {
      key: "3",
      label: <b className="text-[18px]">Puntuación</b>,
      children: (
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
                    <span
                      key={j}
                      className="text-[28px] "
                      style={{ color: "#f5b301" }}
                    >
                      ★
                    </span>
                  ) : (
                    <span
                      key={j}
                      className="text-[28px] "
                      style={{ color: "#f5b301" }}
                    >
                      ☆
                    </span>
                  )
                )}
              </div>
              <span className=" text-gray-700 text-[15px]">y más</span>
            </label>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="w-auto h-auto sm:w-[450px] bg-white pt-12 pb-3  px-3 gap-1 rounded-lg transition-all duration-300 overflow-hidden"
    >
      {/* HEADER */}
      <div className="flex items-center  justify-baseline  px-3 pb-2 gap-2 text-2xl font-semibold text-gray-800">
        <Image
          width={23}
          height={23}
          src="/assets/icons/filterp.svg"
          alt="Icono de Sustítulo de filtro"
        />
        <span className="text-[28px]">Filtros</span>
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
              `,
            }}
          >
            ⌵
          </span>
        )}
        expandIconPosition="end"
        bordered={false}
        ghost={true}
        items={collapseItems} 
      />

      <Divider className="border-gray-300" />

      <div className="flex justify-center">
        <button className="flex items-center gap-2 text-red-600 font-light text-[14px] capitalize hover:text-red-500">
          <ReloadOutlined
            style={{
              transform: "rotate(-320deg) scaleX(-1)",
              fontSize: 16,
            }}
          />
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

