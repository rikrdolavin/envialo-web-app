"use client";

import { Select } from "antd";
import { Route } from "next";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LanguageSwitcher({
  currentLang,
}: Readonly<{
  currentLang: string;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [locale, setLocale] = useState(currentLang);

  const onChange = (e: string) => {
    const newLang = e;
    setLocale(newLang);
    const segments = pathname.split("/").slice(2);
    const newPath = `/${newLang}/${segments.join("/")}`;
    const search = searchParams.toString();
    router.push((newPath + (search ? `?${search}` : "")) as Route);
  };

  const options = [
    {
      value: "en",
      label: (
        <div className="flex items-center gap-2">
          <Image src="/assets/icons/gb.svg" width={15} height={5} alt="en" />
          <p>English</p>
        </div>
      ),
    },
    {
      value: "es",
      label: (
        <div className="flex items-center gap-2">
          <Image src="/assets/icons/es.svg" width={15} height={5} alt="es" />
          <p>Español</p>
        </div>
      ),
    },
  ];

  return (
    <Select
      defaultValue={locale}
      onChange={onChange}
      options={options}
    ></Select>
  );
}
