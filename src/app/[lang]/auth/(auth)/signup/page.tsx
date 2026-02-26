import { Card } from "antd";
import { AuthForm } from "../_components/AuthForm";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex justify-center py-10">
      <Card className="w-4xl rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          <Image
            className="w-full h-full object-cover hidden md:block rounded-2xl"
            src="/assets/promotion.webp"
            alt="Promoción"
            width={480}
            height={480}
            priority
          />
          <AuthForm isSignUp />
        </div>
      </Card>
    </div>
  );
}
