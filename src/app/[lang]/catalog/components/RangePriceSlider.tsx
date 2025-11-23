"use client";

import React, { useState, useRef } from "react";

const RangePriceSlider = () => {
  const MIN = 0;
  const MAX = 200;

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(200);
  const [hoverThumb, setHoverThumb] = useState<"min" | "max" | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const getValueFromPosition = (x: number) => {
    if (!sliderRef.current) return 0;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const ratio = Math.min(Math.max((x - left) / width, 0), 1);
    return Math.round(MIN + ratio * (MAX - MIN));
  };

  const handleDrag = (thumb: "min" | "max", e: React.MouseEvent | MouseEvent) => {
    const move = (moveEvent: MouseEvent) => {
      const newValue = getValueFromPosition(moveEvent.clientX);
      if (thumb === "min" && newValue <= maxValue && newValue >= MIN) setMinValue(newValue);
      if (thumb === "max" && newValue >= minValue && newValue <= MAX) setMaxValue(newValue);
    };

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };

    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  return (
    <div className="w-full flex flex-col gap-6 mt-6 relative">
      {/* Slider */}
      <div className="relative w-full h-6" ref={sliderRef}>
        {/* Barra gris */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-300 rounded-full"></div>

        {/* Barra verde entre los puntos */}
        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full"
          style={{
            left: `${(minValue / MAX) * 100}%`,
            width: `${((maxValue - minValue) / MAX) * 100}%`,
            backgroundColor: "#016630",
          }}
        ></div>

        {/* Punto Min */}
        <div
          className={`absolute w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-transform duration-200 ease-out`}
          style={{
            left: `${(minValue / MAX) * 100}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#016630",
          }}
          onMouseDown={(e) => handleDrag("min", e)}
          onMouseEnter={() => setHoverThumb("min")}
          onMouseLeave={() => setHoverThumb(null)}
        >
          {/* Tooltip */}
          {hoverThumb === "min" && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#999999] text-white text-base rounded-md grid place-items-center shadow-lg">
              {minValue}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#999999]"></div>
            </div>
          )}
        </div>

        {/* Punto Max */}
        <div
          className={`absolute w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-transform duration-200 ease-out`}
          style={{
            left: `${(maxValue / MAX) * 100}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#016630",
          }}
          onMouseDown={(e) => handleDrag("max", e)}
          onMouseEnter={() => setHoverThumb("max")}
          onMouseLeave={() => setHoverThumb(null)}
        >
          {/* Tooltip */}
          {hoverThumb === "max" && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#999999] text-white text-base rounded-md grid place-items-center shadow-lg">
              {maxValue}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[#999999]"></div>
            </div>
          )}
        </div>
      </div>

      {/* Inputs reducidos y consistentes */}
      <div className="flex items-center justify-between w-full">
        <input
          type="number"
          value={minValue}
          readOnly
          className="w-15 h-9 text-center border border-gray-400 rounded-sm"
        />
        <input
          type="number"
          value={maxValue}
          readOnly
          className="w-15 h-9 text-center border border-gray-400 rounded-sm"
        />
      </div>

      {/* Hover efecto para puntos */}
      <style jsx>{`
        div[style*="background-color: #016630"] {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        div[style*="background-color: #016630"]:hover {
          transform: translate(-50%, -50%) scale(1.3);
          box-shadow: 0 0 12px rgba(1, 102, 48, 0.5);
        }
      `}</style>
    </div>
  );
};

export default RangePriceSlider;
