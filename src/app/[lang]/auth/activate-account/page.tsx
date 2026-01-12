import { FaCheckCircle } from "react-icons/fa";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-6 justify-center min-h-[70vh] p-4 text-center">
      <FaCheckCircle className="text-6xl text-brinco" />
      <h2 className="text-2xl font-bold text-gray-800">
        ¡Registro satisfactorio!
      </h2>
      <p className="text-gray-600 max-w-md text-lg">
        Revisa tu correo electrónico para activar tu cuenta y completar el
        proceso de registro.
      </p>
    </div>
  );
}
