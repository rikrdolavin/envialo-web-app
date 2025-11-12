"use client";

import { Breadcrumb } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const pathname = usePathname();

  // Divide la ruta en segmentos: /es/productos/item → ["es", "productos", "item"]
  const pathSegments = pathname.split("/").filter(Boolean);

  // Detecta si el primer segmento es un código de idioma (2 o más letras)
  const firstSegment = pathSegments[0];
  const isLang = /^[a-z]{2}(-[a-z]{2})?$/i.test(firstSegment);
  const lang = isLang ? firstSegment : null;

  // Quita el idioma para mostrar los labels
  const elements = isLang ? pathSegments.slice(1) : pathSegments;

  
  const items = [
    {
      key: "home",
      title: <Link href={lang ? `/${lang}` : "/"}>Home</Link>,
    },
    ...elements.map((segment, index) => {
      const realPath =
        "/" +
        (lang
          ? [lang, ...elements.slice(0, index + 1)].join("/")
          : elements.slice(0, index + 1).join("/"));

      const label = decodeURIComponent(segment)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      return {
        key: realPath,
        title: <Link href={realPath}>{label}</Link>,
      };
    }),
  ];

  return (
    <Breadcrumb
      items={items}
      style={{ marginLeft: "20px", marginBottom: "20px" }}
    />
  );
}
