"use client";

import { Locale } from "@/models/language";
import NavHeader from "./NavHeader";
import FooterCustom from "./FooterCustom";

import { AuthProvider } from "@/context/AuthContext";
import { App as AntdApp, ConfigProvider } from "antd";
import { LanguageProvider } from "@/context/LangContext";

import enUS from "antd/locale/en_US";
import esEs from "antd/locale/es_ES";
import { CartProvider } from "@/context/CartContext";

interface LayoutClientWrapperProps {
  children: React.ReactNode;
  lang: Locale["locale"];
  dictionary: Record<string, unknown>;
}

export default function LayoutClientWrapper({
  children,
  lang,
  dictionary,
}: Readonly<LayoutClientWrapperProps>) {
  return (
    <ConfigProvider
      locale={lang === "es" ? esEs : enUS}
      theme={{
        token: {
          colorPrimary: "#2C8254",
        },
      }}
      tooltip={{
        unique: true,
      }}
    >
      <AntdApp>
        <LanguageProvider initLang={lang} initDictionary={dictionary}>
          <AuthProvider>
            <CartProvider>
              <NavHeader lang={lang} />
              <main className="bg-brinco-bg">{children}</main>
              <FooterCustom />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </AntdApp>
    </ConfigProvider>
  );
}
