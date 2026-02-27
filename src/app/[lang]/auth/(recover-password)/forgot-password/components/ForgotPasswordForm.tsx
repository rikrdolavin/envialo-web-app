"use client";

import { forgotPasswordAction } from "@/app/actions/auth";
import { ErrorCode } from "@/constants/errorCodes";
import { useLang } from "@/context/LangContext";
import { Alert, Button, Form, Input } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { startTransition, useActionState, useEffect, useState } from "react";

export default function ForgotPasswordForm() {
  const [form] = Form.useForm();
  const params = useSearchParams();
  const router = useRouter();
  const reason = params.get("reason");
  const { dictionary } = useLang();
  const forgotPasswordDict = dictionary.forgot_password;

  const [state, formAction, isPending] = useActionState(
    (_prev: unknown, email: string) => forgotPasswordAction(email),
    {
      success: false,
      errorCode: "",
    },
  );

  const isErrEmailNotFound =
    !state.success && state.errorCode === ErrorCode.MSG47;
  const isReasonExpired = reason === "expired";

  const [lastDismissedKey, setLastDismissedKey] = useState<string | null>(null);

  let currentAlertTrigger: string | null = null;
  if (isErrEmailNotFound) {
    currentAlertTrigger = "MSG47";
  } else if (isReasonExpired) {
    currentAlertTrigger = "expired";
  }

  const showAlert =
    currentAlertTrigger !== null &&
    lastDismissedKey !== currentAlertTrigger &&
    !isPending;

  let alertTitle: string | null = null;
  if (isErrEmailNotFound) {
    alertTitle = forgotPasswordDict.error.email_not_found;
  } else if (isReasonExpired) {
    alertTitle = forgotPasswordDict.error.expired;
  }

  const onFinish = (values: { email: string }) => {
    setLastDismissedKey(null);
    startTransition(() => {
      formAction(values.email);
    });
  };

  useEffect(() => {
    if (state.success) {
      router.push("/auth/forgot-password/verify-email");
    }
  }, [router, state.success]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="w-[400px] flex flex-col gap-3"
      size="large"
      disabled={isPending}
    >
      {showAlert && (
        <Alert
          title={alertTitle}
          type="error"
          closable={{
            closeIcon: true,
            onClose: () => setLastDismissedKey(currentAlertTrigger),
          }}
        />
      )}
      <Form.Item
        label={forgotPasswordDict.email}
        name="email"
        rules={[
          {
            required: true,
            message: forgotPasswordDict.validation.email,
          },
          {
            type: "email",
            message: forgotPasswordDict.validation.valid_email,
          },
        ]}
      >
        <Input type="email" placeholder={forgotPasswordDict.email} />
      </Form.Item>
      <Form.Item>
        <Button
          loading={isPending}
          className="w-full h-9! shadow-none!"
          type="primary"
          htmlType="submit"
        >
          {forgotPasswordDict.send}
        </Button>
      </Form.Item>
    </Form>
  );
}
