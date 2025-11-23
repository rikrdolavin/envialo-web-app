"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Checkbox, Collapse, Divider } from "antd";
import {
  StarFilled,
  StarOutlined,
  ReloadOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import RangePriceSlider from "./RangePriceSlider";

const { Panel } = Collapse;

const Filter: React.FC = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  const ratingRows = [5, 4, 3, 2, 1];

  return (
    <div className="w-[550px] bg-white px-6 py-5 transition-all duration-300">
      {/* Header con icono */}
      <div className="flex items-center gap-2 mb-4 text-2xl font-semibold text-gray-800">
        <AppstoreOutlined style={{ fontSize: 26 }} />
        <span>Filtros</span>
      </div>

      <Collapse
        accordion={false}
        activeKey={activeKeys}
        onChange={(keys) => setActiveKeys(keys as string[])}
        expandIconPosition="end"
        bordered={false}
        ghost={true}
        className="bg-white"
      >
        <Panel
          header={<b className="text-[22px]">Precio</b>}
          key="0"
          className="bg-white border-none py-2 mb-1"
        >
          <RangePriceSlider />
        </Panel>

        <Panel
          header={<b className="text-[22px]">Categorías</b>}
          key="1"
          className="bg-white border-none py-2 mb-1"
        >
          <div className="flex flex-col gap-1 text-[20px]">
            <Link href="/categoria/alimentos" className="hover:text-blue-700 transition-colors">
              Alimentos y Bebidas
            </Link>
            <Link href="/categoria/electrodomesticos" className="hover:text-blue-700 transition-colors">
              Electrodomésticos
            </Link>
            <Link href="/categoria/ferreteria" className="hover:text-blue-700 transition-colors">
              Ferretería y Construcción
            </Link>
            <Link href="/categoria/aseo" className="hover:text-blue-700 transition-colors">
              Aseo y Limpieza
            </Link>
            <Link href="/categoria/hogar" className="hover:text-blue-700 transition-colors">
              Hogar
            </Link>
            <Link href="/categoria/automotriz" className="hover:text-blue-700 transition-colors">
              Automotriz
            </Link>
          </div>
        </Panel>

        <Panel
          header={<b className="text-[22px]">Promociones</b>}
          key="2"
          className="bg-white border-none py-2 mb-1"
        >
          <div className="flex flex-col gap-3 text-[20px]"> {/* Más espacio entre checkboxes */}
            <Checkbox className="custom-checkbox text-[22px]">Productos recientes</Checkbox> {/* Checkbox más grande */}
            <Checkbox className="custom-checkbox text-[22px]">Productos en oferta</Checkbox>
            <Checkbox className="custom-checkbox text-[22px]">Productos con entrega gratis</Checkbox>
          </div>
        </Panel>

        <Panel
          header={<b className="text-[22px]">Puntuación</b>}
          key="3"
          className="bg-white border-none py-2 mb-1"
        >
          <div className="flex flex-col gap-1 text-[20px]">
            {ratingRows.map((filledStars, index) => (
              <div key={index} className="flex items-center gap-2">
                <Checkbox className="custom-checkbox" />
                <div className="flex gap-1">
                  {Array.from({ length: 5 }, (_, i) =>
                    i < filledStars ? (
                      <StarFilled key={i} style={{ color: "#f5b301", fontSize: 24 }} />
                    ) : (
                      <StarOutlined key={i} style={{ color: "#f5b301", fontSize: 24 }} />
                    )
                  )}
                </div>
                <span className="ml-2 text-gray-700 text-[19px]">y más</span>
              </div>
            ))}
          </div>
        </Panel>
      </Collapse>

      {/* Separador único antes del botón borrar */}
      <Divider className="my-7 border-gray-300" />

      <div className="flex justify-center">
        <button className="flex items-center gap-2 text-red-600 font-light text-xl capitalize bg-white border-none cursor-pointer hover:text-red-500">
          <ReloadOutlined style={{ transform: "rotate(-320deg) scaleX(-1)", fontSize: 24 }} />
          Borrar filtros
        </button>
      </div>

      <style jsx>{`
        .ant-collapse,
        .ant-collapse-item,
        .ant-collapse-header,
        .ant-collapse-content {
          background: white !important;
          border: none !important;
        }

        .ant-collapse-item {
          border-bottom: 0 !important;
        }

        .ant-collapse-item {
          margin-bottom: 4px !important;
        }

        .ant-collapse-header {
          font-size: 22px !important;
          padding: 6px 0 !important;
          min-height: 40px !important;
          display: flex;
          align-items: center;
        }

        /* Flecha centrada con subtítulo */
        .ant-collapse-arrow {
          top: 50% !important;
          transform: translateY(-50%) !important;
          font-size: 20px !important;
          right: 0 !important;
        }

        .ant-collapse-content {
          font-size: 20px !important;
          padding: 6px 0 !important;
        }

        /* Checkboxes más grandes */
        .custom-checkbox :global(.ant-checkbox-inner) {
          width: 26px !important;
          height: 26px !important;
        }

        /* Color verde cuando checkbox marcado */
        .custom-checkbox :global(.ant-checkbox-checked) .ant-checkbox-inner {
          background-color: #23c55e !important;
          border-color: #23c55e !important;
        }
      `}</style>
    </div>
  );
};

export default Filter;



