import { Locale } from "@/models/language";
import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { BiLockOpen } from "react-icons/bi";
import { use } from "react";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default function Page({ params }: Readonly<PageProps>) {
  const { lang } = use(params);
  const dictionary = use(getDictionary(lang));
  const forgotPasswordDict = dictionary.forgot_password;

  return (
    <div className="min-h-[50vh] flex items-center justify-center flex-col gap-5 py-20">
      <p className="text-2xl font-semibold flex items-center gap-2">
        {forgotPasswordDict.recover_passowrd}{" "}
        <span>
          <BiLockOpen />
        </span>
      </p>
      <ForgotPasswordForm />
    </div>
  );
}
