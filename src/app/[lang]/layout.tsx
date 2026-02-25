import LayoutClientWrapper from "@/common/layout/LayoutClientWrapper";
import { Locale } from "@/models/language";
import { getDictionary } from "./dictionaries";

interface LayoutProps {
  params: Promise<{ lang: Locale["locale"] }>;
  children: React.ReactNode;
}

export default async function Layout({
  children,
  params,
}: Readonly<LayoutProps>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <LayoutClientWrapper lang={lang} dictionary={dictionary}>
      {children}
    </LayoutClientWrapper>
  );
}
