"use client";

import {
  UserOutlined,
  HeartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  SafetyOutlined,
  WalletOutlined,
  HistoryOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { ConfigProvider, Menu } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";

type MenuItem = Required<MenuProps>["items"][number];

const ProfileMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { dictionary, lang } = useLang();

  const t = dictionary?.profile?.sidebar || {};

  const items: MenuItem[] = [
    {
      key: "profile",
      label: t.profile || "Perfil",
      icon: <UserOutlined className="text-xl ms-1 me-2" />,
    },
    {
      key: "favorites",
      label: t.favorites || "Favoritos",
      icon: <HeartOutlined className="text-xl ms-1 me-2" />,
    },
    {
      key: "orders",
      label: t.orders || "Ordenes",
      icon: <ShoppingOutlined className="text-xl ms-1 me-2" />,
    },
    {
      key: "recipients",
      label: t.my_recipients || "Mis destinatarios",
      icon: <TeamOutlined className="text-xl ms-1 me-2" />,
    },
    {
      key: "security",
      label: t.security || "Seguridad",
      icon: <SafetyOutlined className="text-xl ms-1 me-2" />,
    },
    {
      key: "wallet",
      label: t.my_wallet || "Mi billetera",
      icon: <WalletOutlined className="text-xl ms-1 me-2" />,
    },
    {
      key: "credit-history",
      label: t.credit_history || "Historial de crédito",
      icon: <HistoryOutlined className="text-xl ms-1 me-2" />,
    },
    {
      key: "logout",
      label: t.logout || "Cerrar sesión",
      icon: <LogoutOutlined className="text-xl ms-1 me-2" />,
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      return;
    }

    const path =
      e.key === "profile" ? `/${lang}/profile` : `/${lang}/profile/${e.key}`;
    router.push(path);
  };

  // Determine selected key based on pathname
  const segments = pathname.split("/");
  const lastSegment = segments.at(-1);
  const selectedKey = items.some((item) => item?.key === lastSegment)
    ? lastSegment
    : "profile";

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemSelectedBg: "#1F8255",
            itemSelectedColor: "white",
          },
        },
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[selectedKey as string]}
        items={items}
        classNames={{ item: "rounded-3xl py-1 h-auto" }}
        className="border-0 text-lg"
      />
    </ConfigProvider>
  );
};

export default ProfileMenu;
