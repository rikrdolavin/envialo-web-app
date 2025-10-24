"use client";

import LanguageSwitcher from "@/common/LanguageSwitcher";
import { Locale } from "@/models/language";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Image from "next/image";

interface LayoutClientWrapperProps {
  children: React.ReactNode;
  lang: Locale["locale"];
}

export default function LayoutClientWrapper({
  children,
  lang,
}: Readonly<LayoutClientWrapperProps>) {
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "0",
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
      <Content className="my-8">{children}</Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}
