"use client";

import { Locale } from "@/models/language";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NavHeader from "./NavHeader";
import FooterCustom from "./FooterCustom";

import { AuthProvider } from "@/context/AuthContext";

interface LayoutClientWrapperProps {
  children: React.ReactNode;
  lang: Locale["locale"];
}

export default function LayoutClientWrapper({
  children,
  lang,
}: Readonly<LayoutClientWrapperProps>) {
  return (
    <AntdRegistry>
      <AuthProvider>
        <NavHeader lang={lang} />

        <main className="bg-[#edf7fa]">{children}</main>
        <FooterCustom lang={lang} />
      </AuthProvider>
    </AntdRegistry>
  );
}
