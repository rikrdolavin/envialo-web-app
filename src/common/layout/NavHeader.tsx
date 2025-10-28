import { Header } from "antd/es/layout/layout";
import Image from "next/image";
import LanguageSwitcher from "../LanguageSwitcher";
import { Locale } from "@/models/language";
import { LoginOutlined, LogoutOutlined, UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps } from "antd";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

interface NavHeaderProps {
  lang: Locale["locale"];
}

export default function NavHeader({ lang }: Readonly<NavHeaderProps>) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();

  const getMenuItems = (): MenuProps["items"] => {
    if (loading) return [];
    
    if (user) {
      // Usuario autenticado
      return [
        {
          key: 'profile',
          icon: <UserOutlined />,
          label: (
            <Link href={`/${lang}/profile`}>
              Mi perfil
            </Link>
          ),
        },
        {
          type: 'divider',
        },
        {
          key: 'logout',
          icon: <LogoutOutlined />,
          label: 'Cerrar sesión',
          onClick: () => logout(),
        },
      ];
    } else {
      // Usuario no autenticado
      return [
        {
          key: 'login',
          icon: <LoginOutlined />,
          label: (
            <Link href={`/${lang}/auth/login?callbackUrl=${pathname}`}>
              Iniciar sesión
            </Link>
          ),
        },
        {
          key: 'signup',
          icon: <UserAddOutlined />,
          label: (
            <Link href={`/${lang}/auth/signup?callbackUrl=${pathname}`}>
              Crear cuenta
            </Link>
          ),
        },
      ];
    }
  };

  useEffect(() => {
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
      <div className="flex items-center justify-between w-full px-2 md:px-10">
        <Link href={`/${lang}/home`} className="cursor-pointer">
          <Image src="/assets/logo.png" alt="Logo" width={200} height={200} />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLang={lang} />
          <Dropdown menu={{ items: getMenuItems() }} trigger={["click"]}>
            <Avatar size="large" icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
