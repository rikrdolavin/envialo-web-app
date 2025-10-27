import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import { Locale } from "@/models/language";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useEffect } from "react";
import Link from "next/link";

interface NavHeaderProps {
  lang: Locale["locale"];
}

export default function NavHeader({ lang }: Readonly<NavHeaderProps>) {
  const items: MenuProps["items"] = [
    {
      key: 0,
      label: <Link href={`/${lang}/auth/login`}>{"Iniciar sesión"}</Link>,
    },
    {
      key: 1,
      label: <Link href={`/${lang}/auth/signup`}>{"Crear cuenta"}</Link>,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("main-header");
      if (!header) return;

      if (window.scrollY > 1) {
        header.classList.add("shadow-sm");
      } else {
        header.classList.remove("shadow-sm");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <Link href={`/${lang}/home`} className="cursor-pointer">
          <Image src="/assets/logo.png" alt="Logo" width={200} height={200} />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLang={lang} />
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
