"use client";

import { activeAccountAction } from "@/app/actions/auth";
import FeedbackPage from "@/common/FeedbackPage";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

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
        <FeedbackPage
          title="¡Cuenta activada satisfactoriamente!"
          description="Tu cuenta ha sido verificada correctamente. Ahora puedes iniciar sesión para acceder a la plataforma."
          success
          redirectButton={{
            url: "/auth/login",
            text: "Iniciar Sesión",
          }}
        />
      )}

      {status === "error" && (
        <FeedbackPage
          title="Error de activación"
          description={message}
          success={false}
          redirectButton={{
            url: "/auth/login",
            text: "Iniciar Sesión",
          }}
        />
      )}
    </div>
  );
}
