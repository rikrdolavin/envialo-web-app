import React, { useEffect, useMemo, useRef, useState } from "react";
import { Carousel as AntCarousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { CarouselRef } from "antd/es/carousel";

interface CarouselProps {
  images: string[];
  responsiveImages?: {
    mobile: string[];
    desktop: string[];
  };
}

const HomeCarousel: React.FC<CarouselProps> = ({ images, responsiveImages }) => {
  const carouselRef = useRef<CarouselRef>(null);

  // Ancho de ventana y breakpoint
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
    const isMobile = width <= breakpoint;
    if (responsiveImages) {
      return isMobile ? responsiveImages.mobile : responsiveImages.desktop;
    }
    return images;
  }, [width, images, responsiveImages]);

  const handlePrev = () => {
    carouselRef.current?.prev();
  };

  const handleNext = () => {
    carouselRef.current?.next();
  };

  return (
    <div className="relative w-full h-auto ">
      <AntCarousel
        ref={carouselRef}
        autoplay={false}
        dots={false}
        arrows={false}
        effect="scrollx"
      >
        {currentImages.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Imagen ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        ))}
      </AntCarousel>

      {/* Flecha Izquierda */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-[14px] sm:text-2xl bg-green-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
      >
        <LeftOutlined />
      </button>

      {/* Flecha Derecha */}
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-[14px] sm:text-2xl bg-green-800 rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70"
      >
        <RightOutlined />
      </button>
    </div>
  );
};

export default HomeCarousel;
