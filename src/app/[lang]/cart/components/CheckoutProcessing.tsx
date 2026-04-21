"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { checkout } from "@/lib/cart";
import { OrderCreated } from "@/models/order";
import { ApiResponse } from "@/types/api";
import { Button, Divider, Modal, Spin, Tag } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutProcessing() {
  const { lang, dictionary } = useLang();
  const t = dictionary.cart;

  const { syncCart } = useCart();
  const [openModal, setOpenModal] = useState(false);
  const [orderLoading, setOrderLoading] = useState(true);
  const [successOrder, setSuccessOrder] = useState(true);
  const [orderInfo, setOrderInfo] = useState<OrderCreated>();
  const router = useRouter();
  const { user } = useAuth();

  const processOrder = async () => {
    const res: ApiResponse<OrderCreated> = await checkout();

    if (res.success) {
      setSuccessOrder(true);
      setOrderInfo(res.data as OrderCreated);
    } else {
      setSuccessOrder(false);
    }

    setOrderLoading(false);
  };

  return (
    <div>
      <Button
        className="rounded-full w-full py-6 bg-brinco hover:bg-brinco-dark text-white text-base"
        onClick={() => {
          if (user) {
            processOrder();
            setOpenModal(true);
          } else {
            router.push(`/${lang}/auth/login`);
          }
        }}
      >
        {user ? t.go_to_checkout : "Iniciar sesión"}
      </Button>
      <Modal
        centered
        title={orderLoading ? "Procesando orden" : ""}
        open={openModal}
        onCancel={() => setOpenModal(false)}
        closeIcon={false}
        footer={null}
        afterClose={() => {
          if (successOrder) {
            syncCart();
          }
        }}
      >
        {orderLoading ? (
          <div className="flex">
            <Spin className="my-10 mx-auto" />
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <p className="text-2xl font-semibold text-center">
              {successOrder
                ? "Se ha creado la orden de manera exitosa"
                : "Ha ocurrido un error al crear la orden"}
            </p>
            {successOrder && (
              <div className="flex flex-col text-lg">
                <p className="flex justify-between">
                  Orden en estado:{" "}
                  <Tag className="bg-yellow-200 text-gray-600 rounded-2xl text-base">
                    {orderInfo?.status}
                  </Tag>
                </p>
                <Divider />
                <p className="flex justify-between">
                  Importe total:{" "}
                  <strong>${orderInfo?.totalAmount.toFixed(2)}</strong>
                </p>
                <Divider />
              </div>
            )}
            <Button
              onClick={() => {
                setOpenModal(false);
              }}
              type="primary"
              className="mx-auto rounded-full shadow-none text-base"
            >
              Volver a la tienda
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
