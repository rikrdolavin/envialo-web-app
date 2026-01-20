import NewPasswordForm from "./components/NewPasswordForm";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function Page({ params }: Readonly<PageProps>) {
  const { lang } = await params;

  return (
    <div className="min-h-[50vh] flex items-center justify-center flex-col gap-5 py-20">
      <NewPasswordForm />
    </div>
  );
}
