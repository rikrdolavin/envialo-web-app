"use client";

import { forgotPasswordAction } from "@/app/actions/auth";
import { Alert, Button, Form, Input } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPasswordForm() {
  const [form] = Form.useForm();
  const params = useSearchParams();
  const reason = params.get("reason");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string }) => {
    setLoading(true);
    const res = await forgotPasswordAction(values.email);
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
          title="Código inválido o expirado, por favor solicite un nuevo código."
          type="error"
          closable={{
            closeIcon: true,
            onClose: () => setShowAlert(false),
          }}
        />
      )}
      <Form.Item
        label="Correo electrónico"
        name="email"
        rules={[
          {
            required: true,
            message: "Por favor, ingresa tu correo electrónico",
          },
          {
            type: "email",
            message: "Por favor, ingresa un correo electrónico válido",
          },
        ]}
      >
        <Input type="email" placeholder="Correo electrónico" />
      </Form.Item>
      <Form.Item>
        <Button
          loading={loading}
          className="w-full h-9! shadow-none!"
          type="primary"
          htmlType="submit"
        >
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
}
