"use client";

import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Carousel as AntCarousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { CarouselRef } from "antd/es/carousel";
import Image from "next/image";

// Constantes para breakpoints
const BREAKPOINTS = {
  XS: 320,
  SM: 375,
  MD: 425,
  LG: 768,
} as const;

// Tipos para las imágenes del carrusel
type ImageType = {
  src: string;
  alt: string;
  priority?: boolean;
};

const carouselImagesDesktop: ImageType[] = [
  {
    src: "/assets/images/carousel/pc/car_img1_PC.webp",
    alt: "Envíos rápidos y seguros a todo el país",
    priority: true,
  },
  {
    src: "/assets/images/carousel/pc/car_img2_PC.webp",
    alt: "Ofertas especiales en envíos internacionales",
  },
  {
    src: "/assets/images/carousel/pc/car_img3_PC.webp",
    alt: "Seguimiento en tiempo real de tus paquetes",
  },
  {
    src: "/assets/images/carousel/pc/car_img4_PC.webp",
    alt: "Atención al cliente 24/7",
  },
  {
    src: "/assets/images/carousel/pc/car_img5_PC.webp",
    alt: "Soluciones logísticas a tu medida",
  },
];

const carouselImagesMobile: ImageType[] = [
  {
    src: "/assets/images/carousel/mb/car_img1_mb.webp",
    alt: "Envíos rápidos y seguros a todo el país",
    priority: true,
  },
  {
    src: "/assets/images/carousel/mb/car_img2_mb.webp",
    alt: "Ofertas especiales en envíos internacionales",
  },
  {
    src: "/assets/images/carousel/mb/car_img3_mb.webp",
    alt: "Seguimiento en tiempo real de tus paquetes",
  },
  {
    src: "/assets/images/carousel/mb/car_img4_mb.webp",
    alt: "Atención al cliente 24/7",
  },
  {
    src: "/assets/images/carousel/mb/car_img5_mb.webp",
    alt: "Soluciones logísticas a tu medida",
  },
];

const HomeCarousel: React.FC = () => {
  const carouselRef = useRef<CarouselRef>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  useLayoutEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);
    onResize();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  const currentImages = useMemo(() => {
    return width === undefined || width < BREAKPOINTS.LG
      ? carouselImagesMobile
      : carouselImagesDesktop;
  }, [width]);

  const handlePrev = () => carouselRef.current?.prev();
  const handleNext = () => carouselRef.current?.next();

  const heightClass = useMemo(() => {
    if (!width || width < BREAKPOINTS.XS) return "h-[280px]";
    if (width < BREAKPOINTS.SM) return "h-80";
    if (width < BREAKPOINTS.MD) return "h-[360px]";
    if (width < BREAKPOINTS.LG) return "h-[420px]";
    return "aspect-32/10";
  }, [width]);

  return (
    <div className="relative w-full">
      <div className="relative w-full overflow-hidden">
        <div className="relative w-full h-auto pb-2 sm:pb-4">
          <AntCarousel
            ref={carouselRef}
            autoplay
            dots={false}
            arrows={false}
            effect="scrollx"
            className="w-full"
          >
            {currentImages.map((image) => (
              <div key={image.src} className={`relative w-full ${heightClass}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority={image.priority || false}
                  sizes={
                    width && width < BREAKPOINTS.LG
                      ? "(max-width: 767px) 100vw, 100vw"
                      : "100vw"
                  }
                  quality={85}
                  className={`${
                    width && width < BREAKPOINTS.LG
                      ? "object-contain"
                      : "object-cover"
                  } object-center`}
                />
              </div>
            ))}
          </AntCarousel>

          {/* Botón anterior */}
          <button
            onClick={handlePrev}
            aria-label="Imagen anterior"
            className={`absolute top-1/2 transform -translate-y-1/2 z-10 bg-green-800 text-white rounded-full flex items-center justify-center hover:bg-black/70 hover:scale-110 transition-all duration-200 focus:outline-none border-none shadow-lg ${
              width && width < BREAKPOINTS.LG
                ? "left-4 w-9 h-9"
                : "left-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handlePrev();
              }
            }}
          >
            <LeftOutlined
              className={`${
                width && width < BREAKPOINTS.LG
                  ? "text-[18px]"
                  : "text-[14px] sm:text-2xl lg:text-3xl xl:text-4xl"
              }`}
              aria-hidden="true"
            />
          </button>

          {/* Botón siguiente */}
          <button
            onClick={handleNext}
            aria-label="Siguiente imagen"
            className={`absolute top-1/2 transform -translate-y-1/2 z-10 bg-green-800 text-white rounded-full flex items-center justify-center hover:bg-black/70 hover:scale-110 transition-all duration-200 focus:outline-none border-none shadow-lg ${
              width && width < BREAKPOINTS.LG
                ? "right-4 w-9 h-9"
                : "right-4 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNext();
              }
            }}
          >
            <RightOutlined
              className={`${
                width && width < BREAKPOINTS.LG
                  ? "text-[18px]"
                  : "text-[14px] sm:text-2xl lg:text-3xl xl:text-4xl"
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
