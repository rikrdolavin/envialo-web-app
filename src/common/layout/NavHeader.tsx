import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import { Locale } from "@/models/language";
import {
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Dropdown, MenuProps, Tooltip } from "antd";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import WrapperContainer from "./WrapperContainer";
import { useLang } from "@/context/LangContext";
import { TbShoppingBag } from "react-icons/tb";
import { useCart } from "@/context/CartContext";

interface NavHeaderProps {
  lang: Locale["locale"];
}

export default function NavHeader({ lang }: Readonly<NavHeaderProps>) {
  const pathname = usePathname();
  const { user, loading, setUser } = useAuth();
  const { dictionary } = useLang();
  const { cartCount } = useCart();
  const t = dictionary.navbar;

  const getMenuItems = (): MenuProps["items"] => {
    if (loading) return [];

    if (user) {
      // Usuario autenticado
      return [
        {
          key: "profile",
          icon: <UserOutlined />,
          label: (
            <Link href={`/${lang}/profile`}>{t.profile_menu.profile}</Link>
          ),
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: t.profile_menu.logout,
          onClick: () => {
            try {
              setUser(null);
              fetch("/api/auth/logout", { credentials: "include" });
              return;
            } catch (error) {
              console.error(error);
            }
          },
        },
      ];
    } else {
      // Usuario no autenticado
      return [
        {
          key: "login",
          icon: <LoginOutlined />,
          label: (
            <Link href={`/${lang}/auth/login?callbackUrl=${pathname}`}>
              {t.profile_menu.login}
            </Link>
          ),
        },
        {
          key: "signup",
          icon: <UserAddOutlined />,
          label: (
            <Link href={`/${lang}/auth/signup`}>
              {t.profile_menu.create_account}
            </Link>
          ),
        },
      ];
    }
  };

  useEffect(() => {
    const cart = globalThis.sessionStorage.getItem("cart");
    if (cart) {
      if (typeof JSON.parse(cart) !== "object") {
        globalThis.sessionStorage.setItem("cart", JSON.stringify([]));
      }
    } else {
      globalThis.sessionStorage.setItem("cart", JSON.stringify([]));
    }

    const handleScroll = () => {
      const header = document.getElementById("main-header");
      if (!header) return;

      if (window.scrollY > 1) {
        header.classList.add("shadow-sm");
      } else {
        header.classList.remove("shadow-sm");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Header
      id="main-header"
      className="transition-shadow"
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "white",
        padding: "0",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <WrapperContainer className="flex items-center justify-between w-full px-2 md:px-10 mx-auto">
        <Link href={`/${lang}/home`} className="cursor-pointer">
          <Image src="/assets/logo.png" alt="Logo" width={200} height={200} />
        </Link>
        <div className="flex items-center gap-4">
          <Tooltip
            title={t.items.shopping_cart}
            placement="bottom"
            classNames={{ container: "bg-gray-950/20" }}
          >
            <Badge
              count={cartCount}
              size="small"
            >
              <Link
                href={`/${lang}/cart`}
                className="text-brinco cursor-pointer"
              >
                <TbShoppingBag size={24} className="hover:text-brinco/80 " />
              </Link>
            </Badge>
          </Tooltip>
          <LanguageSwitcher currentLang={lang} />
          <Dropdown
            menu={{ items: getMenuItems() }}
            trigger={["click"]}
            placement="bottomRight"
          >
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </WrapperContainer>
    </Header>
  );
}
