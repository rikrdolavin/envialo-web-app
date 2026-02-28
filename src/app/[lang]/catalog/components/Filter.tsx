"use client";

import React, { useState, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { Collapse, Divider } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import RangePriceSlider from "./RangePriceSlider";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import {
  BADGE_STYLE,
  CATEGORIES,
  EXPAND_ICON_STYLE,
  PROMOTION_OPTIONS,
  RATING_ROWS,
} from "./filterConstants";
import { useLang } from "@/context/LangContext";

const Filter: React.FC = () => {
  const { dictionary } = useLang();
  const filterDict = dictionary.catalog.filters;
  const [activeKeys, setActiveKeys] = useState<string[]>(["0", "1", "2", "3"]);
  const [checkedPromos, setCheckedPromos] = useState([false, false, false]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const topRef = useRef<HTMLDivElement>(null);

  // Memoized checkbox handlers to prevent recreation on every render
  const handlePromoCheck = useCallback((index: number) => {
    setCheckedPromos((prev) => {
      const copy = [...prev];
      copy[index] = !copy[index];
      return copy;
    });
  }, []);

  const handleRatingCheck = useCallback((index: number) => {
    setSelectedRating((prev) => (prev === index ? null : index));
  }, []);

  const clearRatings = useCallback(() => {
    setSelectedRating(null);
  }, []);

  const anyRatingChecked = selectedRating !== null;
  const ratingPanelOpen = activeKeys.includes("3");

  const promoCount = checkedPromos.filter(Boolean).length;
  const ratingCount = selectedRating === null ? 0 : 1;
  const totalFilters = promoCount + ratingCount;

  const handleClearAll = useCallback(() => {
    setCheckedPromos([false, false, false]);
    setSelectedRating(null);

    if (topRef.current) {
      topRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);

  const handleCollapseChange = useCallback((keys: string | string[]) => {
    setActiveKeys(keys as string[]);
  }, []);

  // region Collapse items
  const collapseItems = useMemo(() => {
    return [
      {
        key: "0",
        label: <b className="text-[18px]">{filterDict.price}</b>,
        children: <RangePriceSlider />,
      },
      {
        key: "1",
        label: <b className="text-[18px]">{filterDict.categories}</b>,
        children: (
          <div className="flex flex-col gap-1 ">
            {CATEGORIES.map((category) => (
              <Link
                key={category.href}
                href={category.href}
                className="text-[17px]! categoria-link"
              >
                {category.label}
              </Link>
            ))}
          </div>
        ),
      },
      {
        key: "2",
        label: <b className="text-[18px]">{filterDict.promotions}</b>,
        children: (
          <div className="flex flex-col gap-3 text-[16px]">
            {PROMOTION_OPTIONS.map((texto, i) => (
              <label
                key={i + "-options"}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checkedPromos[i]}
                  onChange={() => handlePromoCheck(i)}
                  className="w-[7px] h-[7px] accent-brinco border-2 border-[#666666] rounded transition-all"
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
        label: (
          <div className="flex items-center justify-between w-full">
            <b className="text-[18px] flex items-center">{filterDict.rating}</b>
            <div className="flex items-center gap-1">
              {ratingPanelOpen && anyRatingChecked && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearRatings();
                  }}
                  className="p-1 hover:bg-red-50 rounded-full transition-all flex items-center justify-center"
                  title={filterDict.clear_rating}
                >
                  <FaTrash
                    size={18}
                    className="text-red-500"
                    style={{ fill: "#ef4444" }}
                  />
                </button>
              )}
            </div>
          </div>
        ),
        children: (
          <div className="flex flex-col justify-center items-center gap-3 text-[18px]">
            {RATING_ROWS.map((filledStars, i) => (
              <label
                key={i + "-rating"}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedRating === i}
                  onChange={() => handleRatingCheck(i)}
                  className="accent-brinco border-3 border-[#666666] rounded transition-all"
                  style={{ minWidth: "1.1rem", minHeight: "1.1rem" }}
                />
                <div className="flex gap-0.5 items-center">
                  {Array.from({ length: 5 }, (_, j) => {
                    const isFilled = j < filledStars;
                    return (
                      <svg
                        key={j}
                        className="w-6 h-6 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill={isFilled ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth={isFilled ? 0 : 1.4}
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    );
                  })}
                </div>
                <span className="text-gray-700 text-[15px]">
                  {filterDict.rating_more}
                </span>
              </label>
            ))}
          </div>
        ),
      },
    ];
  }, [
    checkedPromos,
    selectedRating,
    ratingPanelOpen,
    anyRatingChecked,
    clearRatings,
    handlePromoCheck,
    handleRatingCheck,
    filterDict,
  ]);

  // Memoized expand icon to prevent recreation on every render
  const renderExpandIcon = useCallback(
    (props: { isActive?: boolean }) => (
      <span
        style={{
          ...EXPAND_ICON_STYLE,
          transform: props.isActive ? "rotate(180deg)" : "rotate(0deg)",
        }}
      >
        ⌵
      </span>
    ),
    [],
  );

  // region JSX
  return (
    <div ref={topRef} className="relative w-auto sm:w-[450px]">
      {/* BADGE: Derecha completa, Centrado verticalmente en el borde superior */}
      <span
        className="absolute flex items-center justify-center text-white text-sm font-semibold z-20"
        style={BADGE_STYLE}
      >
        {totalFilters}
      </span>

      <div
        className={`w-full bg-white pt-12 pb-3 px-3 gap-1 rounded-lg transition-all duration-300 overflow-hidden ${
          activeKeys.length === 0 ? "h-[390px]" : "h-auto"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-baseline px-3 pb-2 gap-2 text-2xl font-semibold text-gray-800">
          <Image
            width={23}
            height={23}
            src="/assets/icons/filterp.svg"
            alt="Icono de Sustítulo de filtro"
          />
          <span className="text-[28px]">{filterDict.title}</span>
        </div>

        <Collapse
          accordion={false}
          activeKey={activeKeys}
          onChange={handleCollapseChange}
          expandIcon={renderExpandIcon}
          expandIconPlacement="end"
          ghost
          items={collapseItems}
        />

        <Divider className="border-gray-300" />

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-2 text-red-600 font-light text-[14px] capitalize hover:text-red-500"
          >
            <ReloadOutlined
              style={{
                transform: "rotate(-320deg) scaleX(-1)",
                fontSize: 16,
              }}
            />
            Borrar filtros
          </button>
        </div>

        <style jsx>{`
          :global(.categoria-link) {
            font-size: 22px !important;
            color: #2d2d2d !important;
            text-decoration: none !important;
            transition:
              color 0.2s,
              text-decoration 0.2s;
            cursor: pointer;
          }
          :global(.categoria-link:hover) {
            color: #2c8254 !important;
            text-decoration: underline !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Filter;
