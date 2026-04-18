"use client";

import LinkButton from "@/common/LinkButton";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

export default function EmptyCart() {
  const { lang, dictionary } = useLang();
  const t = dictionary.cart.empty;

  return (
    <div className="flex flex-col items-center gap-7 mt-10 text-center">
      <Image
        src="/assets/images/emptyCart.webp"
        width={300}
        height={300}
        alt=""
        className="md:w-60 max-w-60"
        draggable={false}
      />
      <p className="text-3xl font-bold">{t.title}</p>
      <p className="text-base max-w-96">{t.description}</p>
      <LinkButton
        text={t.button}
        url={`/${lang}/catalog`}
        className="font-bold w-auto py-4 px-14"
      />
    </div>
  );
}
