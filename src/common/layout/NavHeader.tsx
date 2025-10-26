import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import { Locale } from "@/models/language";

interface NavHeaderProps {
  lang: Locale["locale"];
}

export default function NavHeader({ lang }: Readonly<NavHeaderProps>) {
  return (
    <Header
      id="main-header"
      className="transition-shadow"
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        padding: "0",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div className="flex items-center justify-between w-full px-2 md:px-10">
        <div>
          <Image src="/assets/logo.png" alt="Logo" width={200} height={200} />
        </div>
        <div>
          <LanguageSwitcher currentLang={lang} />
        </div>
      </div>
    </Header>
  );
}
