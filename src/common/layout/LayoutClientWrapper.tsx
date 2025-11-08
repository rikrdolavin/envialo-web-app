"use client";

import { Locale } from "@/models/language";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import NavHeader from "./NavHeader";
import FooterCustom from "./FooterCustom";
import { AuthProvider } from "@/context/AuthContext";
import "@ant-design/v5-patch-for-react-19";
import HomeCarousel from "@/app/[lang]/home/components/HomeCarousel";

interface LayoutClientWrapperProps {
  children: React.ReactNode;
  lang: Locale["locale"];
}


// Ejemplo dentro de LayoutClientWrapper
const carouselImagesDesktop = [
  "/assets/images/carousel/pc/car_img1_PC.webp",
  "/assets/images/carousel/pc/car_img2_PC.webp",
  "/assets/images/carousel/pc/car_img3_PC.webp",
  "/assets/images/carousel/pc/car_img4_PC.webp",
  "/assets/images/carousel/pc/car_img5_PC.webp",
];

const carouselImagesMobile = [
  "/assets/images/carousel/mb/car_img1_mb.webp",
  "/assets/images/carousel/mb/car_img2_mb.webp",
  "/assets/images/carousel/mb/car_img3_mb.webp",
  "/assets/images/carousel/mb/car_img4_mb.webp",
  "/assets/images/carousel/mb/car_img5_mb.webp",
];




export default function LayoutClientWrapper({
  children,
  lang,
}: Readonly<LayoutClientWrapperProps>) {
  return (
    <AntdRegistry>
      <Layout>
        <AuthProvider>
         <NavHeader lang={lang} />
         <HomeCarousel images={carouselImagesDesktop} responsiveImages={{ mobile: carouselImagesMobile, desktop: carouselImagesDesktop }} />
         <Content className="py-8 bg-[#edf7fa] px-4 lg:px-16">
            {children}
          </Content>
          <FooterCustom lang={lang} />
        </AuthProvider>
      </Layout>
    </AntdRegistry>
  );
}
