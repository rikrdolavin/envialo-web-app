"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Carousel as AntCarousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { CarouselRef } from "antd/es/carousel";
import Image from "next/image";

const HomeCarousel: React.FC = () => {
  const carouselRef = useRef<CarouselRef>(null);

  const carouselImagesDesktop = [
    "/assets/images/carousel/pc/car_img1_PC.webp",
    "/assets/images/carousel/pc/car_img2_PC.webp",
    "/assets/images/carousel/pc/car_img3_PC.webp",
    "/assets/images/carousel/pc/car_img4_PC.webp",
    "/assets/images/carousel/pc/car_img5_PC.webp",
  ];

  const carouselImagesMobile = [
    "/assets/images/carousel/mb/car_img1_mb.webp",
    "/assets/images/carousel/mb/car_img2_mb.webp",
    "/assets/images/carousel/mb/car_img3_mb.webp",
    "/assets/images/carousel/mb/car_img4_mb.webp",
    "/assets/images/carousel/mb/car_img5_mb.webp",
  ];

  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const breakpoint = 768;
  const currentImages = useMemo(() => {
    return width < breakpoint ? carouselImagesMobile : carouselImagesDesktop;
  }, [width]);

  const handlePrev = () => carouselRef.current?.prev();
  const handleNext = () => carouselRef.current?.next();

  return (
    <div className="relative w-full">
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full h-auto mb-2 sm:mb-4">
          <AntCarousel
            ref={carouselRef}
            autoplay
            dots={false}
            arrows={false}
            effect="scrollx"
            className="w-full"
          >
            {currentImages.map((image, index) => (
              <div
                key={index}
                className={`relative w-full ${
                  width < 320
                    ? "h-[280px]"
                    : width < 375
                      ? "h-80"
                      : width < 425
                        ? "h-[360px]"
                        : width < breakpoint
                          ? "h-[420px]"
                          : "aspect-32/10"
                }`}
              >
                <Image
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  fill
                  priority={index === 0}
                  className={`${
                    width < breakpoint ? "object-contain" : "object-cover"
                  } object-center`}
                />
              </div>
            ))}
          </AntCarousel>

          {/* Botón izquierda */}
          <button
            onClick={handlePrev}
            className={`absolute top-1/2 transform -translate-y-1/2 z-10 bg-green-800 text-white rounded-full flex items-center justify-center hover:bg-black/70 hover:scale-110 transition-all duration-200 focus:outline-none border-none shadow-lg ${
              width < breakpoint
                ? "left-4 w-9 h-9"
                : "left-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
            }`}
          >
            <LeftOutlined
              className={`${
                width < breakpoint
                  ? "text-[18px]"
                  : "text-[14px] sm:text-2xl lg:text-3xl xl:text-4xl"
              }`}
            />
          </button>

          {/* Botón derecha */}
          <button
            onClick={handleNext}
            className={`absolute top-1/2 transform -translate-y-1/2 z-10 bg-green-800 text-white rounded-full flex items-center justify-center hover:bg-black/70 hover:scale-110 transition-all duration-200 focus:outline-none border-none shadow-lg ${
              width < breakpoint
                ? "right-4 w-9 h-9"
                : "right-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
            }`}
          >
            <RightOutlined
              className={`${
                width < breakpoint
                  ? "text-[18px]"
                  : "text-[14px] sm:text-2xl lg:text-3xl xl:text-4xl"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
