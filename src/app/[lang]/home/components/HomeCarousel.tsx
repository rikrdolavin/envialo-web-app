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
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const breakpoint = 768;
  const currentImages = useMemo(() => {
    return width <= breakpoint ? carouselImagesMobile : carouselImagesDesktop;
  }, [width]);

  const handlePrev = () => carouselRef.current?.prev();
  const handleNext = () => carouselRef.current?.next();

  return (
    <div className="relative w-full">
     
      <div className="relative w-full overflow-hidden">
        <AntCarousel
          ref={carouselRef}
          autoplay
          dots={false}
          arrows={false}
          effect="scrollx"
          className="w-full"
        >
          {currentImages.map((image, index) => (
            <div key={index} className="relative w-full aspect-video sm:aspect-16/8 md:aspect-4/3 lg:aspect-video 2xl:aspect-16/7">
              <Image
                src={image}
                alt={`Imagen ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>
          ))}
        </AntCarousel>

        <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        
          <button
            onClick={handlePrev}
            className="pointer-events-auto
              bg-green-800 text-white
              w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-13 xl:h-13 2xl:w-15 2xl:h-15 3xl:w-20 3xl:h-20
              rounded-full flex items-center justify-center
              hover:bg-black/70 hover:scale-110 transition-all duration-200
              focus:outline-none focus:ring-0 border-none shadow-lg"
          >
            <LeftOutlined className="text-[14px] sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl" />
          </button>

          {/* Flecha derecha */}
          <button
            onClick={handleNext}
            className="pointer-events-auto
              bg-green-800 text-white
              w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 xl:w-13 xl:h-13 2xl:w-15 2xl:h-15 3xl:w-20 3xl:h-20
              rounded-full flex items-center justify-center
              hover:bg-black/70 hover:scale-110 transition-all duration-200
              focus:outline-none focus:ring-0 border-none shadow-lg"
          >
            <RightOutlined className="text-[14px] sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
