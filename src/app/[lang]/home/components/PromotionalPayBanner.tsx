"use client";

import Image from "next/image";
import Link from "next/link";

interface PromotionalPayBannerProps {
 
  lang: string;
 
}

export default function PromotionalPayBanner({
  lang
}: Readonly<PromotionalPayBannerProps>) {
  return (
    <section className="w-full bg-transparent py-4 mt-3">
      <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 px-5">
        <div className="flex-1 flex flex-col items-start text-center md:text-left lg:w-1/2">
          <p className="text-4xl lg:text-7xl font-bold mb-4 leading-tight">
            <span className="text-[#222]"> ¿Cómo pagar en </span>
            <span className="text-[#2c8254]">BrincoXpress?</span>
          </p>
          <p className="text-[#757878] text-[15px] mb-4 text-justify">
            Para realizar el pago en BrincoXpress, completa los campos
            requeridos en el checkout y confirme su pago, utilizando su método
            de pago preferido.
          </p>

          <Link
             href={`/${lang}/catalog`}
            className="bg-[#2c8254]! w-[150px] hover:bg-olive-700 text-white! text-[17px] py-2 px-6 rounded-full transition-all duration-200 text-center inline-flex items-center justify-center no-underline"
          >
            Ver más
          </Link>

         {/* <button className="bg-[#2c8254] h-auto w-[150px] hover:bg-olive-700 text-white text-[17px] py-2 px-6 rounded-full transition-all duration-200">
            <Link className="text-white!" href={"#"}>
              Ver más
            </Link>
          </button>*/}
        </div>

        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src="/assets/images/banner/bn2_pay_image.webp"
            alt="Imagen del banner"
            width={1920}
            height={2221}
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
