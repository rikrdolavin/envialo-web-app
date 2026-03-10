"use client";

import { useLang } from "@/context/LangContext";
import { PersonalInformation } from "@/models/profile";
import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";

interface PersonalInfoFormProps {
  currentInfo?: PersonalInformation;
}

export default function PersonalInfoForm({
  currentInfo,
}: Readonly<PersonalInfoFormProps>) {
  const { dictionary } = useLang();
  const t = dictionary.profile?.sections.profile.edit_form;
  const [form] = useForm();
  const [displayForm, setDisplayForm] = useState(false);

  const cancelEdition = () => {
    form.resetFields();
    setDisplayForm(false);
  };

  const onFinish = () => {};

  if (displayForm) {
    return (
      <Form
        form={form}
        onFinish={onFinish}
        size="large"
        layout="vertical"
        labelCol={{ className: "pb-0" }}
      >
        <div className="flex md:flex-row flex-col gap-5">
          <Form.Item label={t.name} className="flex-1">
            <Input variant="filled" />
          </Form.Item>
          <Form.Item label={t.lastName} className="flex-1">
            <Input variant="filled" />
          </Form.Item>
        </div>
        <div className="flex md:flex-row flex-col gap-5">
          <Form.Item label={t.phone} className="flex-1">
            <Input variant="filled" />
          </Form.Item>
          <Form.Item label={t.email} className="flex-1">
            <Input variant="filled" />
          </Form.Item>
        </div>
        <div className="flex justify-end gap-5">
          <Button className="rounded-2xl shadow-none" onClick={cancelEdition}>
            {t.cancel}
          </Button>
          <Button className="rounded-2xl shadow-none" type="primary">
            {t.save}
          </Button>
        </div>
      </Form>
    );
  }

  return (
    <Card
      classNames={{
        body: "flex flex-col gap-5 text-lg shadow-xl",
      }}
    >
      <div className="flex md:flex-row flex-col gap-5 md:gap-0">
        <div className="flex-1">
          <p className="text-brinco">{t.name}</p>
          <p className="font-semibold">CCC</p>
        </div>
        <div className="flex-1">
          <div className="text-brinco flex justify-between items-center">
            <p>{t.lastName}</p>
            <Button
              icon={<EditOutlined />}
              type="text"
              shape="circle"
              size="large"
              onClick={() => setDisplayForm((prev) => !prev)}
            />
          </div>
          <p className="font-semibold">CCC</p>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-5 md:gap-0">
        <div className="flex-1">
          <p className="text-brinco">{t.phone}</p>
          <p className="font-semibold">+5352516735</p>
        </div>
        <div className="flex-1">
          <p className="text-brinco">{t.email}</p>
          <p className="font-semibold">mail@gmail.com</p>
        </div>
      </div>
    </Card>
  );
}
