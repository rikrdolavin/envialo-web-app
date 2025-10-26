import LayoutClientWrapper from "@/common/layout/LayoutClientWrapper";
import { Locale } from "@/models/language";

interface LayoutProps {
  params: Promise<{ lang: Locale["locale"] }>;
  children: React.ReactNode;
}

export default async function Layout({
  children,
  params,
}: Readonly<LayoutProps>) {
  const { lang } = await params;
  return <LayoutClientWrapper lang={lang}>{children}</LayoutClientWrapper>;
}
