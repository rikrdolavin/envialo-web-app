import { getDictionary } from "@/app/[lang]/dictionaries";
import FeedbackPage from "@/common/FeedbackPage";
import { Locale } from "@/models/language";
import { use } from "react";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default function Page({ params }: Readonly<PageProps>) {
  const { lang } = use(params);
  const dictionary = use(getDictionary(lang));
  const verifyEmailDict = dictionary.forgot_password.verify_email;

  return (
    <FeedbackPage
      title={verifyEmailDict.title}
      description={verifyEmailDict.description}
      success
    />
  );
}
