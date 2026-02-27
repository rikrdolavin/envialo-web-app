"use client";

import { activeAccountAction } from "@/app/actions/auth";
import FeedbackPage from "@/common/FeedbackPage";
import { useLang } from "@/context/LangContext";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

export default function AccountVerification() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { dictionary } = useLang();
  const accountVerificationDict =
    dictionary.account_activation.account_verification;

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error",
  );
  const [message, setMessage] = useState(
    token ? "" : accountVerificationDict.errors.invalid_token,
  );

  useEffect(() => {
    if (token) {
      activeAccountAction(token)
        .then((response) => {
          if (response) {
            setStatus("success");
          } else {
            setStatus("error");
            setMessage(
              response.message ||
                accountVerificationDict.errors.activation_error,
            );
          }
        })
        .catch(() => {
          setStatus("error");
          setMessage(accountVerificationDict.errors.activation_error);
        });
    }
  }, [token, accountVerificationDict]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      {status === "loading" && (
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="animate-spin text-4xl text-brinco" />
          <p className="text-lg font-medium text-gray-700">
            {accountVerificationDict.activating_account}
          </p>
        </div>
      )}

      {status === "success" && (
        <FeedbackPage
          title={accountVerificationDict.account_activated}
          description={accountVerificationDict.account_activated_description}
          success
          redirectButton={{
            url: "/auth/login",
            text: accountVerificationDict.login,
          }}
        />
      )}

      {status === "error" && (
        <FeedbackPage
          title={accountVerificationDict.errors.activation_error2}
          description={message}
          success={false}
          redirectButton={{
            url: "/auth/login",
            text: accountVerificationDict.login,
          }}
        />
      )}
    </div>
  );
}
