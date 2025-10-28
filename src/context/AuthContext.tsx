"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { verifySession } from "@/lib/session";

type User = {
  userId: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  setUser: (data: any) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    async function loadUserFromSession() {
      try {
        const session = document.cookie
          .split("; ")
          .find((row) => row.startsWith("session="))
          ?.split("=")[1];

        if (session) {
          const payload = await verifySession(session);
          if (payload) {
            setUser({
              userId: payload.userId as string,
              email: payload.email as string,
            });
          }
        }
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUserFromSession();
  }, [pathname]);

  const logout = async () => {
    // Eliminar cookies
    document.cookie =
      "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie =
      "access_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    // Limpiar el estado
    setUser(null);

    // Redirigir a la página de inicio
    location.href = "/" + pathname.split("/")[1] + "/home";
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
