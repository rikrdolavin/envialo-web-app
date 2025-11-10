"use client";

import Image from "next/image";
import Link from "next/link";

export default function PromotionalBanner() {
  return (
    <section className="w-full bg-transparent py-4 mt-3">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row lg:items-center gap-5 px-5">

        {/* Imagen */}
        <div className="w-full lg:w-1/2 relative rounded-lg overflow-hidden aspect-[1.2] lg:aspect-[1.1]">
          <Image
            src="/assets/images/banner/bn1_image.webp"
            alt="Imagen del banner"
            fill
            className="object-contain object-center" 
          />
        </div>

        {/* Texto */}
        <div className="flex-1 flex flex-col items-start text-center h-auto md:text-left lg:w-1/2">
          <p className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
            <span className="text-[#222]"> ¿Qué hacemos </span>
            <span className="text-[#2c8254]"> en BrincoXpress?</span>
          </p>
          <p className="text-gray-700 mb-4 text-justify lg:text-[14px]">
            Somos una tienda de ventas online que oferta una amplia gama de productos de calidad 
            desde alimentos básicos, productos de aseo y limpieza, electrodomésticos,
            herramientas de ferretería, hasta materiales de la construcción.
            Las compras se pueden realizar desde cualquier parte del mundo con entregas 
            directas a Cuba, estamos a su disposición las 24h del día los 365 días del año. 
            Ofrecemos una experiencia de compra fácil, segura y sin fronteras. 
            Trabajamos con las mejores marcas que nos permiten ofrecerle productos
            de la mejor calidad al mejor precio, haciendo una experiencia de compra confiable,
            cómoda y segura hasta la puerta de su casa.
          </p>

          <div>
            <button className="bg-[#2c8254] h-auto w-[150px] hover:bg-olive-700 text-white text-xl lg:text-2xl lg:w-[170px] py-2 px-6 rounded-full transition-all duration-200">
              <Link className="text-white!" href={"#"}>Ver más</Link>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
