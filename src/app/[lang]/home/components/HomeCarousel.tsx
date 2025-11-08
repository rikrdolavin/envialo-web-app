// components/HomeCarousel.tsx

import React, { useRef } from "react";
import { Carousel as AntCarousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { CarouselRef } from "antd/es/carousel";

interface CarouselProps {
  images: string[]; // Array de URLs de imágenes
}

const HomeCarousel: React.FC<CarouselProps> = ({ images }) => {
  const carouselRef = useRef<CarouselRef>(null);

  const handlePrev = () => {
    carouselRef.current?.prev(); // Mueve a la diapositiva anterior
  };

  const handleNext = () => {
    carouselRef.current?.next(); // Mueve a la siguiente diapositiva
  };

  return (
    <div className="relative w-full h-auto">
      <AntCarousel
        ref={carouselRef}
        autoplay={false} // Desactivamos el autoplay
        dots={false} // No queremos puntos de navegación
        arrows={false} // Desactivamos las flechas por defecto de Ant Design
        effect="scrollx"
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Imagen ${index + 1}`}
              className="w-full max-w-full h-auto md:h-150 object-cover rounded-lg"
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

{
  /*
import React from "react";
import MyCarousel from "../components/MyCarousel";

const HomePage: React.FC = () => {
  const images = [
    "/images/imagen1.jpg",
    "/images/imagen2.jpg",
    "/images/imagen3.jpg",
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">Bienvenido a mi sitio web</h1>
      <MyCarousel images={images} />
    </main>
  );
};

export default HomePage;
*/
}
