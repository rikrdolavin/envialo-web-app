"use client";

import { useLang } from "@/context/LangContext";
import { Button, Modal } from "antd";
import { useState } from "react";

export default function CancelAccountModal() {
  const { dictionary } = useLang();
  const t = dictionary.profile.sections.security.cancel_account;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex">
      <Button type="primary" onClick={showModal} className="shadow-none rounded-3xl ms-auto" size="large">
        {t.request_cancelation}
      </Button>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}
