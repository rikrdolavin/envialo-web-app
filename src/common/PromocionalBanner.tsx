"use client";

import Image from "next/image";
import Link from "next/link";

export default function PromocionalBanner() {
  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-6">
        {/* Imagen a la izquierda */}
            <Image
            src="/assets/images/banner/bn1_image.webp" 
            alt="Imagen del banner"
            width={400}
            height={400}
            className="rounded-lg object-cover"
          />
       
        {/* Texto a la derecha */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left">
          <p className="text-3xl md:text-4xl font-bold text-olive-600 mb-4">
           <span className ="text-[#222]" > ¿Qué hacemos </span>
           <span className ="text-[#2c8254]"> en BrincoXpress?</span>
          </p>
          <p className="text-gray-700 mb-6">
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

          {/* Botón alineado */}
          <div>
            <button className="bg-[#2c8254]  hover:bg-olive-700 text-white text-2xl font-semibold py-2 px-6 rounded-md transition-all duration-200">
              <Link className="text-white!" href={"#"}>Ver más</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
