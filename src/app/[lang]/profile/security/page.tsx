import { Locale } from "@/models/language";
import { use } from "react";
import { getDictionary } from "../../dictionaries";
import { Divider } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import CancelAccountModal from "./components/CancelAccountModal";
import UpdatePasswordForm from "./components/UpdatePasswordForm";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default function Page({ params }: Readonly<PageProps>) {
  const { lang } = use(params);
  const dictionary = use(getDictionary(lang));
  const t = dictionary.profile.sections.security;
  return (
    <>
      <div>
        <p className="text-5xl font-bold text-brinco mb-2">{t.title}</p>
        <p className="text-base">{t.subtitle}</p>
      </div>
      <Divider />
      <div>
        <p className="text-4xl font-bold">{t.form.title}</p>
        <UpdatePasswordForm />
      </div>
      <Divider />
      <div className="flex flex-col gap-5">
        <p className="text-4xl font-bold">{t.cancel_account.title}</p>
        <div className="bg-brinco/60 text-white flex rounded-2xl p-4 text-base gap-2 items-start">
          <ExclamationCircleOutlined className="text-red-600/60! text-xl mt-2" />
          <p>{t.cancel_account.warning}</p>
        </div>
        <CancelAccountModal />
      </div>
    </>
  );
}
