"use client";

import { useAuth } from "@/context/AuthContext";
import { loginAction, signupAction } from "@/app/actions/auth";
import { LoginRequest, LoginResponse, SignUpRequest } from "@/models/auth";
import { Locale } from "@/models/language";
import { ApiResponse } from "@/types/api";
import { Alert, Button, Card, Form, Input, Switch } from "antd";
import type { Rule } from "antd/es/form";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ErrorCode } from "@/constants/errorCodes";
import { useState } from "react";

interface AuthFormProps {
  lang: Locale["locale"];
  isSignUp: boolean;
}

const ErrorFormInitialState = {
  show: false,
  message: "",
};

export function AuthForm({ lang, isSignUp }: Readonly<AuthFormProps>) {
  const [form] = Form.useForm();
  const termaAndConditions = Form.useWatch("terms", form);
  const router = useRouter();
  const params = useParams<{ callbackUrl: string }>();
  const { setUser } = useAuth();

  const [showFromErrorAlert, setShowFromErrorAlert] = useState<{
    show: boolean;
    message: string;
  }>(ErrorFormInitialState);
  const [submitting, setSubmitting] = useState(false);

  // region submit methods
  const buildAuthData = (isSignUp: boolean) => {
    const values = form.getFieldsValue();
    return isSignUp
      ? {
          email: values.email,
          password: values.password,
          repeatPassword: values.repeatPassword,
          firstName: values.firstName,
          lastName: values.lastName,
        }
      : {
          email: values.email,
          password: values.password,
        };
  };

  const resolveRedirect = (callbackUrl: string | undefined, lang: string) => {
    const cb = callbackUrl?.trim();
    const isValid =
      cb && cb.startsWith("/") && !cb.toLowerCase().includes("auth");
    return isValid ? cb : `/${lang}/home`;
  };

  const handleError = (authResponse: ApiResponse) => {
    if (
      authResponse.errorCode === ErrorCode.MSG19 ||
      authResponse.errorCode === ErrorCode.MSG18
    ) {
      setShowFromErrorAlert({
        show: true,
        message: "Ingresó un usuario o contraseña incorrecta.",
      });
    } else {
      setShowFromErrorAlert({
        show: true,
        message:
          "Ha ocurrido un error, compruebe su conexión e inténtelo nuevamente.",
      });
    }
  };

  const onFinish = async () => {
    setSubmitting(true);

    const authData = buildAuthData(isSignUp);
    const authResponse = isSignUp
      ? ((await signupAction(authData as SignUpRequest)) as ApiResponse)
      : ((await loginAction(authData as LoginRequest)) as LoginResponse);

    if (authResponse.success && !authResponse.errorCode) {
      const aR = authResponse as LoginResponse;
      setUser({ userId: aR.data.id, email: aR.data.email });

      router.push(resolveRedirect(params.callbackUrl, lang));
    } else if (!isSignUp) {
      handleError(authResponse);
    }

    setSubmitting(false);
  };

  const signupRules: Rule[] = [
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

  return (
    <Card className="w-4xl rounded-2xl!">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        <Image
          className="w-full h-full object-cover hidden md:block rounded-2xl"
          src="/assets/promotion.webp"
          alt="Promoción"
          width={480}
          height={480}
        />
        <Form
          onFinish={onFinish}
          form={form}
          variant="outlined"
          layout="vertical"
          disabled={submitting}
        >
          {isSignUp ? (
            <p className="text-2xl font-semibold">Crea tu cuenta</p>
          ) : (
            <p className="text-2xl font-semibold">Inicia sesion</p>
          )}

          {!isSignUp && showFromErrorAlert.show && (
            <Alert
              title={showFromErrorAlert.message}
              type="error"
              className="my-5!"
              closable={{
                closeIcon: true,
                onClose: () => setShowFromErrorAlert(ErrorFormInitialState),
                "aria-label": "close",
              }}
            />
          )}

          {isSignUp && (
            <div className="flex items-center md:flex-row flex-col md:gap-5">
              <Form.Item
                name="firstName"
                label="Nombre/s"
                rules={[{ required: true }]}
                className="w-full"
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="lastName"
                label="Apellido/s"
                rules={[{ required: true }]}
                className="w-full"
              >
                <Input />
              </Form.Item>
            </div>
          )}
          <Form.Item
            name="email"
            label="Correo electronico"
            rules={[
              {
                required: true,
                message: "Por favor, ingresa tu correo electronico",
              },
              {
                type: "email",
                message: "Por favor, ingresa un correo electronico valido",
              },
            ]}
          >
            <Input />
          </Form.Item>
          {isSignUp && (
            <Form.Item
              name="repeatEmail"
              label="Repetir correo electronico"
              dependencies={["email"]}
              rules={[
                {
                  required: true,
                  message: "Por favor, ingresa tu correo electronico",
                },
                {
                  type: "email",
                  message: "Por favor, ingresa un correo electronico valido",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("email") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Los correos electrónicos no coinciden")
                    );
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
          )}
          <Form.Item
            name="password"
            label="Contraseña"
            rules={(
              [
                {
                  required: true,
                  message: "Por favor, ingresa tu contraseña",
                },
              ] as Rule[]
            ).concat(isSignUp ? signupRules : [])}
          >
            <Input.Password />
          </Form.Item>
          {isSignUp && (
            <>
              <Form.Item
                name="repeatPassword"
                label="Repetir Contraseña"
                dependencies={["password"]}
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
                        new Error("Las contraseñas no coinciden")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="terms"
                label={
                  <p>
                    Aceptar{" "}
                    <span>
                      <Link href="/terms-conditions">
                        Términos y condiciones
                      </Link>
                    </span>
                  </p>
                }
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Button
              disabled={isSignUp && !termaAndConditions}
              loading={submitting}
              className="w-full shadow-none!"
              type="primary"
              htmlType="submit"
            >
              {isSignUp ? "Crear cuenta" : "Acceder"}
            </Button>
          </Form.Item>
          {isSignUp ? (
            <p>
              ¿Ya tienes una cuenta?{" "}
              <Link href={`/${lang}/auth/login`}>Acceder</Link>
            </p>
          ) : (
            <p>
              ¿No tienes una cuenta?{" "}
              <Link href={`/${lang}/auth/signup`}>Registrarse</Link>
            </p>
          )}
        </Form>
      </div>
    </Card>
  );
}
