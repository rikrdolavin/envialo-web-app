"use client";
import React, { useState, useRef, useCallback, useMemo } from "react";

const MIN = 0;
const MAX = 200;

interface SliderThumbProps {
  value: number;
  type: "min" | "max";
  isHovered: boolean;
  isActive: boolean;
  onMouseDown: (e: React.MouseEvent | React.TouchEvent) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const SliderThumb: React.FC<SliderThumbProps> = ({
  value,
  type,
  isHovered,
  isActive,
  onMouseDown,
  onMouseEnter,
  onMouseLeave,
  onKeyDown,
}) => {
  const size = 19;
  const ringSize = 38;

  const percentage = (value / MAX) * 100;

  return (
    <div
      className="absolute z-30"
      style={{
        left: `${percentage}%`,
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: isActive ? 40 : 30,
      }}
    >
      <div
        className="relative flex items-center justify-center cursor-pointer outline-none"
        style={{ width: ringSize, height: ringSize }}
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        role="slider"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={value}
        aria-label={`${type === "min" ? "Minimum" : "Maximum"} price`}
        tabIndex={0}
      >
        <div
          className="absolute rounded-full transition-all duration-200"
          style={{
            width: isHovered || isActive ? ringSize : size,
            height: isHovered || isActive ? ringSize : size,
            backgroundColor:
              isHovered || isActive ? "rgba(44,130,84,0.22)" : "transparent",
          }}
        />

        <div
          className="absolute rounded-full shadow-sm"
          style={{
            backgroundColor: "#2c8254",
            width: size,
            height: size,
          }}
        />
      </div>

      {(isHovered || isActive) && (
        <div
          className="absolute px-3 py-1 text-white bg-[#7a7a7a] text-base rounded-md grid place-items-center shadow-lg transition-opacity duration-200 pointer-events-none"
          style={{
            top: "-2.40rem",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {value}
          <div
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid #7a7a7a",
            }}
          />
        </div>
      )}
    </div>
  );
};

const RangePriceSlider: React.FC = () => {
  const [minValue, setMinValue] = useState<number>(MIN);
  const [maxValue, setMaxValue] = useState<number>(MAX);
  const [hoverThumb, setHoverThumb] = useState<"min" | "max" | null>(null);
  const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const getValueFromPosition = useCallback((x: number) => {
    if (!sliderRef.current) return 0;
    const { left, width } = sliderRef.current.getBoundingClientRect();
    const ratio = Math.min(Math.max((x - left) / width, 0), 1);
    return Math.round(MIN + ratio * (MAX - MIN));
  }, []);

  const handleDrag = useCallback(
    (thumb: "min" | "max") => (e: React.MouseEvent | React.TouchEvent) => {
      setActiveThumb(thumb);

      const move = (moveEvent: MouseEvent | TouchEvent) => {
        const clientX =
          "touches" in moveEvent
            ? moveEvent.touches[0].clientX
            : moveEvent.clientX;
        const newValue = getValueFromPosition(clientX);

        if (thumb === "min") {
          setMinValue((prev) => Math.max(MIN, Math.min(newValue, maxValue)));
        } else {
          setMaxValue((prev) => Math.min(MAX, Math.max(newValue, minValue)));
        }
      };

      const up = () => {
        setActiveThumb(null);
        document.removeEventListener("mousemove", move);
        document.removeEventListener("mouseup", up);
        document.removeEventListener("touchmove", move);
        document.removeEventListener("touchend", up);
      };

      document.addEventListener("mousemove", move);
      document.addEventListener("mouseup", up);
      document.addEventListener("touchmove", move, { passive: false });
      document.addEventListener("touchend", up);
    },
    [getValueFromPosition, maxValue, minValue]
  );

  const handleKeyDown = useCallback(
    (thumb: "min" | "max") => (e: React.KeyboardEvent) => {
      const step = 1;
      if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        if (thumb === "min") setMinValue((prev) => Math.max(MIN, prev - step));
        else setMaxValue((prev) => Math.max(minValue, prev - step));
      } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        if (thumb === "min")
          setMinValue((prev) => Math.min(maxValue, prev + step));
        else setMaxValue((prev) => Math.min(MAX, prev + step));
      }
    },
    [minValue, maxValue]
  );

  const trackStyles = useMemo(
    () => ({
      backgroundColor: "#2c8254",
      left: `${(minValue / MAX) * 100}%`,
      width: `${((maxValue - minValue) / MAX) * 100}%`,
    }),
    [minValue, maxValue]
  );

  return (
    <div className="w-full flex flex-col gap-6 mt-2 relative">
      <div className="relative w-full h-8 flex items-center" ref={sliderRef}>
        <div className="absolute w-full h-1.5 bg-gray-300 rounded-full" />
        <div className="absolute h-1.5 rounded-full" style={trackStyles} />

        <SliderThumb
          value={minValue}
          type="min"
          isHovered={hoverThumb === "min"}
          isActive={activeThumb === "min"}
          onMouseDown={handleDrag("min")}
          onMouseEnter={() => setHoverThumb("min")}
          onMouseLeave={() => setHoverThumb(null)}
          onKeyDown={handleKeyDown("min")}
        />

        <SliderThumb
          value={maxValue}
          type="max"
          isHovered={hoverThumb === "max"}
          isActive={activeThumb === "max"}
          onMouseDown={handleDrag("max")}
          onMouseEnter={() => setHoverThumb("max")}
          onMouseLeave={() => setHoverThumb(null)}
          onKeyDown={handleKeyDown("max")}
        />
      </div>

      <div className="flex items-center justify-between w-full px-1">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Min</span>
          <input
            type="number"
            value={minValue}
            readOnly
            className="w-20 h-9 text-center border border-gray-300 rounded-xl text-base font-semibold bg-gray-50 shadow-sm"
          />
        </div>
        <div className="h-px w-4 bg-gray-300 mt-5" />
        <div className="flex flex-col gap-1">
          <span className="text-xs text-gray-500 font-medium">Max</span>
          <input
            type="number"
            value={maxValue}
            readOnly
            className="w-20 h-9 text-center border border-gray-300 rounded-xl text-base font-semibold bg-gray-50 shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default RangePriceSlider;
