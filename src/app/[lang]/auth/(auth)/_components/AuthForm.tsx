"use client";

import { useAuth } from "@/context/AuthContext";
import { loginAction, signupAction } from "@/app/actions/auth";
import { LoginRequest, LoginResponse, SignUpRequest } from "@/models/auth";
import { ApiResponse } from "@/types/api";
import { Alert, Button, Form, Input, Switch } from "antd";
import type { Rule } from "antd/es/form";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ErrorCode } from "@/constants/errorCodes";
import { useState } from "react";
import { useLang } from "@/context/LangContext";

interface AuthFormProps {
  isSignUp: boolean;
}

const ErrorFormInitialState = {
  show: false,
  message: "",
};

export function AuthForm({ isSignUp }: Readonly<AuthFormProps>) {
  const [form] = Form.useForm();
  const termaAndConditions = Form.useWatch("terms", form);
  const router = useRouter();
  const params = useParams<{ callbackUrl: string }>();
  const { setUser } = useAuth();
  const { lang, dictionary } = useLang();

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
    let message = dictionary.auth_form.errors.connection_error;

    if (isSignUp && authResponse.errorCode === ErrorCode.MSG24) {
      message = dictionary.auth_form.errors.existing_email;
    } else if (
      !isSignUp &&
      (authResponse.errorCode === ErrorCode.MSG18 ||
        authResponse.errorCode === ErrorCode.MSG19)
    ) {
      message = dictionary.auth_form.errors.invalid_credentials;
    }

    setShowFromErrorAlert({ show: true, message });
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
    } else {
      handleError(authResponse);
    }

    setSubmitting(false);
  };

  const signupRules: Rule[] = [
    {
      min: 8,
      message: dictionary.auth_form.validation.password_validation1,
    },
    {
      pattern: /(?=.*[A-Z])/,
      message: dictionary.auth_form.validation.password_validation2,
    },
    {
      pattern: /(?=.*\d)/,
      message: dictionary.auth_form.validation.password_validation3,
    },
    {
      pattern: /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      message: dictionary.auth_form.validation.password_validation4,
    },
  ];

  return (
    <Form
      onFinish={onFinish}
      form={form}
      variant="outlined"
      layout="vertical"
      disabled={submitting}
    >
      {isSignUp ? (
        <p className="text-2xl font-semibold">
          {dictionary.auth_form.signup_title}
        </p>
      ) : (
        <p className="text-2xl font-semibold">
          {dictionary.auth_form.login_title}
        </p>
      )}

      {showFromErrorAlert.show && (
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
            label={dictionary.auth_form.first_name}
            rules={[
              {
                required: true,
                message: dictionary.auth_form.validation.first_name,
              },
            ]}
            className="w-full"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={dictionary.auth_form.last_name}
            rules={[
              {
                required: true,
                message: dictionary.auth_form.validation.last_name,
              },
            ]}
            className="w-full"
          >
            <Input />
          </Form.Item>
        </div>
      )}
      <Form.Item
        name="email"
        label={dictionary.auth_form.email}
        rules={[
          {
            required: true,
            message: dictionary.auth_form.validation.email,
          },
          {
            type: "email",
            message: dictionary.auth_form.validation.valid_email,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label={dictionary.auth_form.password}
        rules={(
          [
            {
              required: true,
              message: dictionary.auth_form.validation.password_required,
            },
          ] as Rule[]
        ).concat(isSignUp ? signupRules : [])}
      >
        <Input.Password />
      </Form.Item>
      {!isSignUp && (
        <Form.Item>
          <Link href={`/${lang}/auth/forgot-password`}>
            {dictionary.auth_form.forgot_password}
          </Link>
        </Form.Item>
      )}

      {isSignUp && (
        <>
          <Form.Item
            name="repeatPassword"
            label={dictionary.auth_form.repeat_password}
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: dictionary.auth_form.validation.repeat_password,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(dictionary.auth_form.errors.passwords_dont_match),
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
                {dictionary.auth_form.accept}{" "}
                <span>
                  <Link href="/terms-conditions">
                    {dictionary.auth_form.terms}
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
          {isSignUp
            ? dictionary.auth_form.signup_button
            : dictionary.auth_form.login_button}
        </Button>
      </Form.Item>
      {isSignUp ? (
        <p>
          {dictionary.auth_form.already_have_account}{" "}
          <Link href={`/${lang}/auth/login`}>
            {dictionary.auth_form.login_button}
          </Link>
        </p>
      ) : (
        <p>
          {dictionary.auth_form.signup}{" "}
          <Link href={`/${lang}/auth/signup`}>
            {dictionary.auth_form.signup_button}
          </Link>
        </p>
      )}
    </Form>
  );
}
