"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Checkbox, Collapse, Divider } from "antd";
import { ReloadOutlined, AppstoreOutlined } from "@ant-design/icons";
import RangePriceSlider from "./RangePriceSlider";

const { Panel } = Collapse;

const Filter: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const ratingRows = [5, 4, 3, 2, 1];

  return (
    <div className="w-[550px] bg-white px-6 py-5 mr-8 transition-all duration-300">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 mb-4 text-2xl font-semibold text-gray-800">
        <AppstoreOutlined style={{ fontSize: 26 }} />
        <span>Filtros</span>
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
        <Panel header={<b className="text-[22px]">Precio</b>} key="0" className="py-1 mb-0">
          <RangePriceSlider />
        </Panel>

        {/* CATEGORÍAS */}
        <Panel header={<b className="text-[22px]">Categorías</b>} key="1" className="py-1 mb-0">
          <div className="flex flex-col gap-1 text-[20px]">
            <Link href="/categoria/alimentos" className="hover:text-blue-700 transition-colors">Alimentos y Bebidas</Link>
            <Link href="/categoria/electrodomesticos" className="hover:text-blue-700 transition-colors">Electrodomésticos</Link>
            <Link href="/categoria/ferreteria" className="hover:text-blue-700 transition-colors">Ferretería y Construcción</Link>
            <Link href="/categoria/aseo" className="hover:text-blue-700 transition-colors">Aseo y Limpieza</Link>
            <Link href="/categoria/hogar" className="hover:text-blue-700 transition-colors">Hogar</Link>
            <Link href="/categoria/automotriz" className="hover:text-blue-700 transition-colors">Automotriz</Link>
          </div>
        </Panel>

        {/* PROMOCIONES */}
        <Panel header={<b className="text-[22px]">Promociones</b>} key="2" className="py-1 mb-0">
          <div className="flex flex-col gap-3 text-[20px]">
            <Checkbox className="custom-checkbox text-[22px]">Productos recientes</Checkbox>
            <Checkbox className="custom-checkbox text-[22px]">Productos en oferta</Checkbox>
            <Checkbox className="custom-checkbox text-[22px]">Productos con entrega gratis</Checkbox>
          </div>
        </Panel>

        {/* PUNTUACIÓN */}
        <Panel header={<b className="text-[22px]">Puntuación</b>} key="3" className="py-1 mb-0">
          <div className="flex flex-col gap-1 text-[20px]">
            {ratingRows.map((filledStars, index) => (
              <div key={index} className="flex items-center gap-2">
                <Checkbox className="custom-checkbox" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < filledStars ? (
                      <span key={i} style={{ color: "#f5b301", fontSize: 24 }}>★</span>
                    ) : (
                      <span key={i} style={{ color: "#f5b301", fontSize: 24 }}>☆</span>
                    )
                  )}
                </div>
                <span className="ml-2 text-gray-700 text-[19px]">y más</span>
              </div>
            ))}
          </div>
        </Panel>

      </Collapse>

      {/* Divider ahora 100% pegado */}
      <Divider className="mt-1 mb-3 border-gray-300" />

      {/* BOTÓN */}
      <div className="flex justify-center">
        <button className="flex items-center gap-2 text-red-600 font-light text-xl capitalize hover:text-red-500">
          <ReloadOutlined style={{ transform: "rotate(-320deg) scaleX(-1)", fontSize: 24 }} />
          Borrar filtros
        </button>
      </div>

      <style jsx>{`
        .ant-collapse-header {
          padding: 0 !important;
          min-height: 38px !important;
          line-height: 38px !important;
          display: flex !important;
          align-items: center !important;
        }

        .ant-collapse-header-text {
          display: flex !important;
          align-items: center !important;
        }

        .ant-collapse-item {
          margin-bottom: 0 !important;
        }

        .ant-collapse-content {
          padding: 0 !important;
        }

        .ant-collapse-content-box {
          padding: 0 !important; /* ← esto pega el contenido */
        }

        .custom-checkbox :global(.ant-checkbox-inner) {
          width: 26px !important;
          height: 26px !important;
        }

        .custom-checkbox :global(.ant-checkbox-checked) .ant-checkbox-inner {
          background-color: #23c55e !important;
          border-color: #23c55e !important;
        }
      `}</style>
    </div>
  );
};

export default Filter;







