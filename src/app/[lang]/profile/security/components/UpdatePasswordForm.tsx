"use client";

import { useLang } from "@/context/LangContext";
import { UpdatePasswordRequest } from "@/models/profile";
import { Alert, Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { updatePasswordAction } from "../actions";
import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { getPasswordRules } from "@/lib/utils";
import { AlertProps } from "antd/lib/alert";
import { ErrorCode } from "@/constants/errorCodes";
import {
  CheckCircleOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";

interface AlertError {
  show: boolean;
  message: string;
  type: AlertProps["type"];
}

const alertErrorInitialState: AlertError = {
  show: false,
  message: "",
  type: "error",
};

export default function UpdatePasswordForm() {
  const { dictionary } = useLang();
  const t = dictionary.profile.sections.security.form;
  const [form] = useForm();
  const [state, dispatchAction, isPending] = useActionState(
    updatePasswordAction,
    { success: false, message: "", errorCode: null },
  );
  const [alertError, setAlertError] = useState<AlertError>(
    alertErrorInitialState,
  );

  const onFinish = (values: UpdatePasswordRequest) => {
    startTransition(() => dispatchAction(values));
  };

  const formRef = useRef(form);
  useEffect(() => {
    if (!state.success && state.errorCode !== null) {
      let message = "No hemos podido realizar esta accion";
      if (state.errorCode === ErrorCode.MSG21) {
        message = "La contraseña actual es incorrecta";
      }
      startTransition(() => {
        setAlertError({ show: true, message: message, type: "error" });
      });
    }

    if (state.success) {
      startTransition(() => {
        setAlertError({
          show: true,
          message: "Se ha actualizado la contraseña satisfactoriamente",
          type: "success",
        });
        formRef.current.resetFields();
        setTimeout(() => {
          setAlertError({ show: false, message: "", type: "success" });
        }, 5000);
      });
    }
  }, [state]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="vertical"
      size="large"
      labelCol={{ className: "pb-0" }}
      disabled={isPending}
    >
      {alertError.show && (
        <Alert
          title={alertError.message}
          type={alertError.type}
          className="my-5 text-base"
          showIcon
          icon={
            alertError.type === "error" ? (
              <ExclamationCircleFilled className="text-red-500" />
            ) : (
              <CheckCircleOutlined className="text-brinco" />
            )
          }
          closable={{
            closeIcon: true,
            onClose: () => setAlertError(alertErrorInitialState),
            "aria-label": "close",
          }}
        />
      )}

      <Form.Item
        name="oldPassword"
        label={t.current_password}
        className="w-full"
        rules={getPasswordRules({ dictionary, includeRequired: true })}
      >
        <Input.Password
          variant="filled"
          size="large"
          className="outline outline-brinco"
        />
      </Form.Item>
      <div className="flex md:gap-5 flex-col md:flex-row">
        <Form.Item
          name="newPassword"
          label={t.new_password}
          className="flex-1"
          rules={getPasswordRules({
            dictionary,
            includeRequired: true,
            type: "new",
          })}
        >
          <Input.Password
            variant="filled"
            size="large"
            className="outline outline-brinco"
          />
        </Form.Item>
        <Form.Item
          name="repeatNewPassword"
          label={t.repeat_password}
          className="flex-1"
          rules={getPasswordRules({
            dictionary,
            type: "confirm",
            matchFieldName: "newPassword",
          })}
        >
          <Input.Password
            variant="filled"
            size="large"
            className="outline outline-brinco"
          />
        </Form.Item>
      </div>
      <Form.Item className="ms-auto w-min">
        <Button
          type="primary"
          htmlType="submit"
          className="shadow-none rounded-3xl"
          loading={isPending}
        >
          {t.save}
        </Button>
      </Form.Item>
    </Form>
  );
}
