"use client";

import { useLang } from "@/context/LangContext";
import { getPasswordRules } from "@/lib/utils";
import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";

export default function CancelAccountModal() {
  const { dictionary } = useLang();
  const t = dictionary.profile.sections.security.cancel_account.modal;

  const [form] = useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        className="shadow-none rounded-3xl ms-auto"
        size="large"
      >
        {t.request}
      </Button>
      <Modal
        title={<p className="text-2xl font-bold text-center">{t.title}</p>}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        classNames={{
          body: "flex flex-col gap-5 text-base",
        }}
        footer={[
          <Button key="cancel" className="shadow-none" onClick={handleCancel}>
            {t.cancel}
          </Button>,
          <Button
            key="request"
            type="primary"
            className="bg-red-500 shadow-none"
            onClick={() => form.submit()}
          >
            {t.request}
          </Button>,
        ]}
      >
        <p className="text-center">{t.description}</p>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleOk}
          onFinishFailed={() => {}}
          size="large"
        >
          <Form.Item
            name="password"
            label={t.current_password}
            rules={getPasswordRules({ dictionary, type: "required-only" })}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
