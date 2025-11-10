"use client";

import Image from "next/image";
import Link from "next/link";

export default function PromotionalPayBanner() {
  return (
    <section className="w-full bg-transparent py-4 mt-3">
      <div className="container mx-auto flex flex-col lg:flex-row lg:items-center gap-2 px-5">
        <div className="flex-1 flex flex-col items-start text-center md:text-left lg:w-1/2">
          <p className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4">
            <span className="text-[#222]"> ¿Cómo pagar en </span>
            <span className="text-[#2c8254]">BrincoXpress?</span>
          </p>
          <p className="text-gray-700 mb-4 text-justify lg:text-[14px]">
            Para realizar el pago en BrincoXpress, completa los campos
            requeridos en el checkout y confirme su pago, utilizando su método
            de pago preferido.
          </p>

          <div>
            <button className="bg-[#2c8254] h-auto w-[150px] hover:bg-olive-700 text-white text-xl lg:text-2xl lg:w-[170px] py-2 px-6 rounded-full transition-all duration-200">
              <Link className="text-white!" href={"#"}>
                Ver más
              </Link>
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/assets/images/banner/bn2_pay_image.webp"
            alt="Imagen del banner"
            width={1920} // mitad del ancho original
            height={2221} // mantiene proporción
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
