import { Locale } from "@/models/language";
import { Suspense, use } from "react";
import { getDictionary } from "../dictionaries";
import PersonalInfoForm from "./components/PersonalInfoForm";
import SkeletonInput from "antd/lib/skeleton/Input";
import { Card } from "antd";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default function Page({ params }: Readonly<PageProps>) {
  const { lang } = use(params);
  const dictionary = use(getDictionary(lang));
  const t = dictionary.profile.sections.profile;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-[45px] font-bold">{t.hello}, CCC</p>
        <p className="text-base">{t.welcome}</p>
      </div>
      <Suspense
        fallback={
          <Card
            classNames={{
              body: "flex flex-col gap-5 text-lg shadow-xl",
            }}
          >
            <div className="flex md:flex-row flex-col gap-5">
              <div className="flex-1">
                <p className="text-brinco">{t.edit_form.name}</p>
                <SkeletonInput active block />
              </div>
              <div className="flex-1">
                <p className="text-brinco">{t.edit_form.lastName}</p>
                <SkeletonInput active block />
              </div>
            </div>
            <div className="flex md:flex-row flex-col gap-5">
              <div className="flex-1">
                <p className="text-brinco">{t.edit_form.phone}</p>
                <SkeletonInput active block />
              </div>
              <div className="flex-1">
                <p className="text-brinco">{t.edit_form.email}</p>
                <SkeletonInput active block />
              </div>
            </div>
          </Card>
        }
      >
        <PersonalInfoForm />
      </Suspense>
    </div>
  );
}
