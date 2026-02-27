"use client";

import { changePasswordAction } from "@/app/actions/auth";
import FeedbackPage from "@/common/FeedbackPage";
import { useLang } from "@/context/LangContext";
import { ChangePasswordRequest } from "@/models/auth";
import { ApiResponse } from "@/types/api";
import { Button, Form, Input } from "antd";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function NewPasswordForm() {
  const params = useSearchParams();
  const token = params.get("token");
  const { dictionary } = useLang();
  const newPasswordDict = dictionary.forgot_password.new_password;
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
        message: newPasswordDict.success_message,
      });
    }

    if (response.success === false) {
      if (response.errorCode === "MSG25") {
        setShowFeedback({
          feedbackType: "error",
          show: true,
          message: newPasswordDict.invalid_code,
        });
      }
    }

    setLoading(false);
  };

  const passwordRules = [
    {
      required: true,
      message: newPasswordDict.password_validation0,
    },
    {
      min: 8,
      message: newPasswordDict.password_validation1,
    },
    {
      pattern: /(?=.*[A-Z])/,
      message: newPasswordDict.password_validation2,
    },
    {
      pattern: /(?=.*\d)/,
      message: newPasswordDict.password_validation3,
    },
    {
      pattern: /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      message: newPasswordDict.password_validation4,
    },
  ];

  const redirectOnAction = useMemo(() => {
    return showFeedback.feedbackType === "success"
      ? {
          url: "/auth/login",
          text: newPasswordDict.redirect_options.login,
        }
      : {
          url: "/auth/forgot-password",
          text: newPasswordDict.redirect_options.go_back,
        };
  }, [showFeedback, newPasswordDict]);

  useEffect(() => {
    if (!token) {
      const validateToken = () => {
        setShowFeedback({
          feedbackType: "error",
          show: true,
          message: newPasswordDict.invalid_token,
        });
      };
      validateToken();
    }
  }, [token, newPasswordDict]);

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
          <h1 className="text-2xl font-bold">{newPasswordDict.title}</h1>
          <Form.Item
            name="password"
            label={newPasswordDict.password}
            rules={passwordRules}
          >
            <Input.Password placeholder={newPasswordDict.password} />
          </Form.Item>
          <Form.Item
            name="repeatPassword"
            label={newPasswordDict.confirm_password}
            rules={[
              {
                required: true,
                message: newPasswordDict.validation.password_validation0,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(newPasswordDict.errors.password_not_matching),
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder={newPasswordDict.confirm_password} />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loading}
              className="w-full! mt-4"
              type="primary"
              htmlType="submit"
            >
              {newPasswordDict.change_password}
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
}
