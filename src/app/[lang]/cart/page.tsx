import WrapperContainer from "@/common/layout/WrapperContainer";
import { Locale } from "@/models/language";
import { use } from "react";
import { getDictionary } from "../dictionaries";
import CartView from "./components/CartView";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default function Page({ params }: Readonly<PageProps>) {
  const { lang } = use(params);
  const t = use(getDictionary(lang)).cart;
  return (
    <WrapperContainer className="py-10 min-h-[calc(100vh-100px)] mx-auto px-4">
      <p className="text-xl md:text-3xl font-bold">{t.title}</p>
      <CartView />
    </WrapperContainer>
  );
}
