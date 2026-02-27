import FeedbackPage from "@/common/FeedbackPage";
import { Locale } from "@/models/language";
import { use } from "react";
import { getDictionary } from "../../dictionaries";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default function Page({ params }: Readonly<PageProps>) {
  const { lang } = use(params);
  const dictionary = use(getDictionary(lang));

  return (
    <FeedbackPage
      title={dictionary.account_activation.title}
      description={dictionary.account_activation.description}
      success
    />
  );
}
