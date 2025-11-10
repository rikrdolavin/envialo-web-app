"use client";

import { useAuth } from "@/context/AuthContext";
import { LoginRequest, LoginResponse, SignUpRequest } from "@/models/auth";
import { Locale } from "@/models/language";
import { InternalApiResponse } from "@/types/api";
import { Button, Card, Form, Input, Switch } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

interface SignUpFormProps {
  lang: Locale["locale"];
  isSignUp: boolean;
}

export function AuthForm({ lang, isSignUp }: Readonly<SignUpFormProps>) {
  const [form] = Form.useForm();
  const termaAndConditions = Form.useWatch("terms", form);
  const router = useRouter();
  const params = useParams<{ callbackUrl: string }>();
  const { setUser } = useAuth();

  const onFinish = async () => {
    const values = form.getFieldsValue();

    let authData: LoginRequest | SignUpRequest;
    if (isSignUp) {
      authData = {
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
      };
    } else {
      authData = {
        email: values.email,
        password: values.password,
      };
    }

    const url = isSignUp ? "/api/auth/signup" : "/api/auth/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    const authResponse: InternalApiResponse = await response.json();
    if (authResponse.success) {
      const userData: LoginResponse = authResponse.data as LoginResponse;
      setUser({ userId: userData.userId });
      if (params.callbackUrl) {
        router.push(params.callbackUrl);
      } else {
        router.push(`/${lang}/home`);
      }
    }
  };

  return (
    <Card className="w-4xl">
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
        >
          {isSignUp ? (
            <p className="text-2xl font-semibold">Crea tu cuenta</p>
          ) : (
            <p className="text-2xl font-semibold">Inicia sesion</p>
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
                      new Error("Los correos electrónicos no coinciden"),
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
            rules={[
              {
                required: true,
                message: "Por favor, ingresa tu contraseña",
              },
            ]}
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
                        new Error("Las contraseñas no coinciden"),
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
                      <Link href="#">Términos y condiciones</Link>
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
              loading={false}
              className="w-full"
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
