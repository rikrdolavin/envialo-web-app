import { Locale } from "@/models/language";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { getDictionary } from "../../dictionaries";

interface PromotionalPayBannerProps {
  lang: Locale["locale"];
}

export default function PromotionalPayBanner({
  lang,
}: Readonly<PromotionalPayBannerProps>) {
  const dict = use(getDictionary(lang));
  const banner2 = dict.home.promotional_banners.banner2;

  return (
    <section className="w-full bg-transparent py-4 mt-3">
      <div className="container mx-auto flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 px-5">
        <div className="flex-1 flex flex-col items-start text-center md:text-left lg:w-1/2">
          <p className="text-4xl lg:text-7xl font-bold mb-4 leading-tight">
            <span className="text-[#222]"> ¿{banner2.title} </span>
            <span className="text-brinco">BrincoXpress?</span>
          </p>
          <p className="text-[#757878] text-[15px] mb-4 text-justify">
            {banner2.description}
          </p>

          <Link
            href={`/${lang}/catalog`}
            className="bg-brinco w-[150px] hover:bg-olive-700 text-white text-[17px] py-2 px-6 rounded-full transition-all duration-200 text-center inline-flex items-center justify-center no-underline"
          >
            {dict.home.see_more}
          </Link>
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
