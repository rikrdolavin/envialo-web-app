"use client";

import { Locale } from "@/models/language";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NavHeader from "./NavHeader";
import FooterCustom from "./FooterCustom";

import { AuthProvider } from "@/context/AuthContext";
import { App as AntdApp, ConfigProvider } from "antd";

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
      <ConfigProvider
        locale={{ locale: "es_ES" }}
        theme={{
          token: {
            colorPrimary: "#2C8254",
          },
        }}
      >
        <AntdApp>
          <AuthProvider>
            <NavHeader lang={lang} />
            <main className="bg-brinco-bg">{children}</main>
            <FooterCustom lang={lang} />
          </AuthProvider>
        </AntdApp>
      </ConfigProvider>
    </AntdRegistry>
  );
}
