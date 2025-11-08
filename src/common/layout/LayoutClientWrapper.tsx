"use client";

import { Locale } from "@/models/language";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NavHeader from "./NavHeader";
import FooterCustom from "./FooterCustom";
import { AuthProvider } from "@/context/AuthContext";
import "@ant-design/v5-patch-for-react-19";

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
      <Layout>
        <AuthProvider>
         <NavHeader lang={lang} />
         <Content className="py-8 bg-[#edf7fa] px-4 lg:px-16">
            {children}
          </Content>
          <FooterCustom lang={lang} />
        </AuthProvider>
      </Layout>
    </AntdRegistry>
  );
}
