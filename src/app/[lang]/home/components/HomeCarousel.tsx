"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Carousel as AntCarousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { CarouselRef } from "antd/es/carousel";

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

  // Estado del ancho de ventana
  const [width, setWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Definimos el breakpoint
  const breakpoint = 768;

  // Elegimos imágenes según el tamaño de pantalla
  const currentImages = useMemo(() => {
    const isMobile = width <= breakpoint;
    return isMobile ? carouselImagesMobile : carouselImagesDesktop;
  }, [width]);

  // Handlers de navegación
  const handlePrev = () => carouselRef.current?.prev();
  const handleNext = () => carouselRef.current?.next();

  return (
    <div className="relative w-full h-ful">
      <AntCarousel
        ref={carouselRef}
        autoplay
        dots={false}
        arrows={false}
        effect="scrollx"
      >
        {currentImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Imagen ${index + 1}`}
               className="w-full h-[300px] sm:h-[400px] md:h-auto object-cover"
               loading="lazy"
            />
          </div>
        ))}
      </AntCarousel>

      {/* Flecha Izquierda */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 
          text-white text-[14px] sm:text-2xl bg-green-800 rounded-full w-8 h-8 sm:w-10 sm:h-10
          flex items-center justify-center hover:bg-black/70"
      >
        <LeftOutlined />
      </button>

      {/* Flecha Derecha */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 
          text-white text-[14px] sm:text-2xl bg-green-800 rounded-full w-8 h-8 sm:w-10 sm:h-10
          flex items-center justify-center hover:bg-black/70"
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default HomeCarousel;
