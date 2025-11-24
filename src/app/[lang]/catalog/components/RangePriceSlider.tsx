"use client";
import React, { useState, useRef } from "react";

const MIN = 0;
const MAX = 200;

const RangePriceSlider: React.FC = () => {
  const [minValue, setMinValue] = useState<number>(MIN);
  const [maxValue, setMaxValue] = useState<number>(MAX);
  const [hoverThumb, setHoverThumb] = useState<"min" | "max" | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const getValueFromPosition = (x: number) => {
    if (!sliderRef.current) return 0;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const ratio = Math.min(Math.max((x - left) / width, 0), 1);
    return Math.round(MIN + ratio * (MAX - MIN));
  };

  const handleDrag = (thumb: "min" | "max") => {
    const move = (moveEvent: MouseEvent) => {
      const newValue = getValueFromPosition(moveEvent.clientX);
      if (thumb === "min" && newValue <= maxValue && newValue >= MIN) {
        setMinValue(newValue);
      }
      if (thumb === "max" && newValue >= minValue && newValue <= MAX) {
        setMaxValue(newValue);
      }
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  /** Tooltip corregido, con color más oscuro **/
  const tooltipClass =
    "absolute px-3 py-1 text-white bg-[#7a7a7a] text-base rounded-md grid place-items-center shadow-lg";

  /** Tooltip más abajo y pegado al anillo **/
  const tooltipStyle = {
    top: "-2.55rem", // <-- bajado un poquito
    left: "50%",
    transform: "translateX(-50%)",
    transition: "top 0.18s ease-out",
  } as React.CSSProperties;

  const arrowStyle = {
    position: "absolute" as const,
    bottom: "-6px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: 0,
    borderLeft: "6px solid transparent",
    borderRight: "6px solid transparent",
    borderTop: "6px solid #7a7a7a", // <-- flecha oscurecida también
  };

  const size = 22;
  const ringSize = 44;

  return (
    <div className="w-full flex flex-col gap-6 mt-2 relative">
      <div className="relative w-full h-6" ref={sliderRef}>
        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-gray-300 rounded-full" />

        <div
          className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full"
          style={{
            backgroundColor: "#2c8254",
            left: `${(minValue / MAX) * 100}%`,
            width: `${((maxValue - minValue) / MAX) * 100}%`,
          }}
        ></div>

        {/* ------- THUMB MIN -------- */}
        <div
          className="absolute z-30"
          style={{
            left: `${(minValue / MAX) * 100}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: ringSize, height: ringSize }}
            onMouseDown={() => handleDrag("min")}
            onMouseEnter={() => setHoverThumb("min")}
            onMouseLeave={() => setHoverThumb(null)}
          >
            <div
              className="absolute rounded-full transition-all duration-200"
              style={{
                width: hoverThumb === "min" ? ringSize : size,
                height: hoverThumb === "min" ? ringSize : size,
                backgroundColor:
                  hoverThumb === "min"
                    ? "rgba(44,130,84,0.22)"
                    : "transparent",
              }}
            />

            <div
              className="absolute rounded-full"
              style={{
                backgroundColor: "#2c8254",
                width: size,
                height: size,
              }}
            />
          </div>

          {hoverThumb === "min" && (
            <div className={tooltipClass} style={tooltipStyle}>
              {minValue}
              <div style={arrowStyle}></div>
            </div>
          )}
        </div>

        {/* ------- THUMB MAX -------- */}
        <div
          className="absolute z-30"
          style={{
            left: `${(maxValue / MAX) * 100}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: ringSize, height: ringSize }}
            onMouseDown={() => handleDrag("max")}
            onMouseEnter={() => setHoverThumb("max")}
            onMouseLeave={() => setHoverThumb(null)}
          >
            <div
              className="absolute rounded-full transition-all duration-200"
              style={{
                width: hoverThumb === "max" ? ringSize : size,
                height: hoverThumb === "max" ? ringSize : size,
                backgroundColor:
                  hoverThumb === "max"
                    ? "rgba(44,130,84,0.22)"
                    : "transparent",
              }}
            />

            <div
              className="absolute rounded-full"
              style={{
                backgroundColor: "#2c8254",
                width: size,
                height: size,
              }}
            />
          </div>

          {hoverThumb === "max" && (
            <div className={tooltipClass} style={tooltipStyle}>
              {maxValue}
              <div style={arrowStyle}></div>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <input
          type="number"
          value={minValue}
          readOnly
          className="w-20 h-11 text-center border border-black rounded-xl text-xl font-medium"
        />
        <input
          type="number"
          value={maxValue}
          readOnly
          className="w-20 h-11 text-center border border-black rounded-xl text-xl font-medium"
        />
      </div>
    </div>
  );
};

export default RangePriceSlider;

















