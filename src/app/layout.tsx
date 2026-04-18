import type { Metadata } from "next";
import "./globals.css";
import FloatingWhatsAppButton from "@/common/FloatingWhatsAppButton";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export const metadata: Metadata = {
  title: "Envialo",
  description: "Envialo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <AntdRegistry layer>
          {children}
          <FloatingWhatsAppButton />
        </AntdRegistry>
      </body>
    </html>
  );
}
