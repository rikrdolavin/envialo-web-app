"use client";

import { forgotPasswordAction } from "@/app/actions/auth";
import { useLang } from "@/context/LangContext";
import { Alert, Button, Form, Input } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPasswordForm() {
  const [form] = Form.useForm();
  const params = useSearchParams();
  const reason = params.get("reason");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dictionary } = useLang();
  const forgotPasswordDict = dictionary.forgot_password;

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    const res = await forgotPasswordAction(values.email);

    // todo: implementar alerta para msg47 - email not found
    setLoading(false);

    if (res.success === false) {
      return;
    }
  };

  useEffect(() => {
    const alert = () => {
      if (reason === "expired") {
        setShowAlert(true);
      }
    };
    alert();
  }, [reason]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      className="w-[400px] flex flex-col gap-3"
      size="large"
      disabled={loading}
    >
      {showAlert && (
        <Alert
          title={forgotPasswordDict.error.invalid_code}
          type="error"
          closable={{
            closeIcon: true,
            onClose: () => setShowAlert(false),
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
          loading={loading}
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
