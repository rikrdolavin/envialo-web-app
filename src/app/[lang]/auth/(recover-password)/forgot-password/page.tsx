import ForgotPasswordForm from "./components/ForgotPasswordForm";
import { BiLockOpen } from "react-icons/bi";

export default function Page() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center flex-col gap-5 py-20">
      <p className="text-2xl font-semibold flex items-center gap-2">
        Recuperar contraseña{" "}
        <span>
          <BiLockOpen />
        </span>
      </p>
      <ForgotPasswordForm />
    </div>
  );
}
