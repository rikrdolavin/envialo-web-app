"use client";

import { activeAccountAction } from "@/app/actions/auth";
import LinkButton from "@/common/LinkButton";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaSpinner, FaTimesCircle } from "react-icons/fa";

export default function AccountVerification() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error"
  );
  const [message, setMessage] = useState(token ? "" : "Token no válido");

  useEffect(() => {
    if (token) {
      activeAccountAction(token)
        .then((response) => {
          if (response) {
            setStatus("success");
          } else {
            setStatus("error");
            setMessage(
              response.message || "Hubo un error al activar su cuenta"
            );
          }
        })
        .catch(() => {
          setStatus("error");
          setMessage("Hubo un error al activar su cuenta");
        });
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="animate-spin text-4xl text-brinco" />
          <p className="text-lg font-medium text-gray-700">
            Activando cuenta...
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="flex flex-col items-center gap-6">
          <FaCheckCircle className="text-6xl text-brinco" />
          <h2 className="text-2xl font-bold text-gray-800">
            ¡Cuenta activada satisfactoriamente!
          </h2>
          <p className="text-gray-600 max-w-md">
            Tu cuenta ha sido verificada correctamente. Ahora puedes iniciar
            sesión para acceder a la plataforma.
          </p>
          <LinkButton
            url="/auth/login"
            text="Iniciar Sesión"
            className="w-[200px]"
          />
        </div>
      )}

      {status === "error" && (
        <div className="flex flex-col items-center gap-4">
          <FaTimesCircle className="text-6xl text-red-500" />
          <h2 className="text-2xl font-bold text-gray-800">
            Error de activación
          </h2>
          <p className="text-red-600 font-medium">{message}</p>
        </div>
      )}
    </div>
  );
}
