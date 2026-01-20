"use client";

import { changePasswordAction } from "@/app/actions/auth";
import FeedbackPage from "@/common/FeedbackPage";
import { ChangePasswordRequest } from "@/models/auth";
import { ApiResponse } from "@/types/api";
import { Button, Form, Input } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function NewPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [showFeedback, setShowFeedback] = useState({
    feedbackType: "success",
    show: false,
    message: "",
  });

  const onFinish = async (values: {
    password: string;
    repeatPassword: string;
  }) => {
    setLoading(true);
    const toSend: ChangePasswordRequest = {
      token: token!,
      newPassword: values.password,
      repeatNewPassword: values.repeatPassword,
    };

    const response = (await changePasswordAction(toSend)) as ApiResponse;

    if (response.success === true) {
      setShowFeedback({
        feedbackType: "success",
        show: true,
        message: "Contraseña cambiada exitosamente.",
      });
    }

    if (response.success === false) {
      if (response.errorCode === "MSG25") {
        setShowFeedback({
          feedbackType: "error",
          show: true,
          message:
            "Código inválido o expirado, por favor solicite un nuevo código.",
        });
      }
    }

    setLoading(false);
  };

  const passwordRules = [
    {
      required: true,
      message: "Por favor, ingresa tu contraseña",
    },
    {
      min: 8,
      message: "Debe tener al menos 8 caracteres.",
    },
    {
      pattern: /(?=.*[A-Z])/,
      message: "Debe contener al menos una letra mayúscula.",
    },
    {
      pattern: /(?=.*\d)/,
      message: "Debe contener al menos un número.",
    },
    {
      pattern: /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      message: "Debe contener al menos un carácter especial.",
    },
  ];

  const redirectOnAction = useMemo(() => {
    return showFeedback.feedbackType === "success"
      ? {
          url: "/auth/login",
          text: "Iniciar Sesión",
        }
      : {
          url: "/auth/forgot-password",
          text: "Volver",
        };
  }, [showFeedback]);

  useEffect(() => {
    if (!token) {
      const validateToken = () => {
        setShowFeedback({
          feedbackType: "error",
          show: true,
          message: "Token inválido o expirado, por favor intenta de nuevo.",
        });
      };
      validateToken();
    }
  }, [token]);

  return (
    <>
      {showFeedback.show && (
        <FeedbackPage
          title={showFeedback.feedbackType === "success" ? "Éxito!" : "Error!"}
          description={showFeedback.message}
          success={showFeedback.feedbackType === "success"}
          redirectButton={redirectOnAction}
        />
      )}

      {showFeedback.show === false && (
        <Form
          form={form}
          onFinish={onFinish}
          size="large"
          className="w-[400px]"
          layout="vertical"
          disabled={loading}
        >
          <h1 className="text-2xl font-bold">Definir nueva contraseña</h1>
          <Form.Item name="password" label="Contraseña" rules={passwordRules}>
            <Input.Password placeholder="Contraseña" />
          </Form.Item>
          <Form.Item
            name="repeatPassword"
            label="Confirmar contraseña"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa tu contraseña",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Las contraseñas no coinciden"),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirmar contraseña" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              className="w-full! mt-4"
              type="primary"
              htmlType="submit"
            >
              Cambiar contraseña
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
