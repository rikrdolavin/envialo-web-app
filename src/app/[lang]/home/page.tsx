import { Locale } from "@/models/language";
import { getDictionary } from "../dictionaries";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return <div>Home</div>;
}
