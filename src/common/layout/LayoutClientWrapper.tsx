"use client";

import LanguageSwitcher from "@/common/LanguageSwitcher";
import { Locale } from "@/models/language";
import { Layout } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Image from "next/image";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import { useEffect } from "react";
import NavHeader from "./NavHeader";

interface LayoutClientWrapperProps {
  children: React.ReactNode;
  lang: Locale["locale"];
}

export default function LayoutClientWrapper({
  children,
  lang,
}: Readonly<LayoutClientWrapperProps>) {
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
    <AntdRegistry>
      <Layout>
        <NavHeader lang={lang} />
        <Content className="py-8 bg-[#edf7fa] px-4 lg:px-16">
          {children}
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </AntdRegistry>
  );
}
