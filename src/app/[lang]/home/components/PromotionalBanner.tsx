import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../dictionaries";
import { use } from "react";
import { Locale } from "@/models/language";

export default function PromotionalBanner({
  lang,
}: Readonly<{ lang: Locale["locale"] }>) {
  const dict = use(getDictionary(lang));
  const banner1 = dict.home.promotional_banners.banner1;

  return (
    <section className="w-full bg-transparent py-4 mt-3">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row lg:justify-between lg:items-center gap-5 px-5">
        <div className="w-full lg:w-1/2 relative rounded-lg overflow-hidden aspect-[1.2] lg:aspect-[1.1]">
          <Image
            src="/assets/images/banner/bn1_image.webp"
            alt="Imagen del banner"
            fill
            className="object-contain object-center"
          />
        </div>

        <div className="flex-1 flex flex-col items-start text-center h-auto md:text-left lg:w-1/2">
          <p className="text-[35px] lg:text-[70px] font-bold mb-3 leading-tight">
            <span className="text-[#222]"> ¿{banner1.title} </span>
            <span className="text-brinco"> BrincoXpress?</span>
          </p>
          <p className="text-[#757878] text-[15px] mb-4 text-justify">
            {banner1.description}
          </p>

          <div>
            <button className="bg-brinco h-auto w-[150px] hover:bg-olive-700 text-white text-[17px]  py-2 px-6 rounded-full transition-all duration-200">
              <Link className="text-white!" href={"#"}>
                {dict.home.see_more}
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
