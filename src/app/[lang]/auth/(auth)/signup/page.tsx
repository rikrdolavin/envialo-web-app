import { Locale } from "@/models/language";
import { AuthForm } from "../_components/SignUpForm";

interface PageProps {
  params: Promise<{ lang: Locale["locale"] }>;
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { lang } = await params;
  return (
    <div className="flex justify-center py-10">
      <AuthForm lang={lang} isSignUp={true} />
    </div>
  );
}
