"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { usePathname } from "next/navigation";
import { SessionCookieData } from "@/types/session";

type User = {
  userId: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (data: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    async function loadUserFromSession() {
      try {
        const res = await fetch("/api/auth/session", {
          credentials: "include",
        });
        const sessionPayload: SessionCookieData = await res.json();

        if (sessionPayload?.email && sessionPayload?.userId) {
          setUser({
            userId: sessionPayload.userId,
            email: sessionPayload.email,
          });
        }
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUserFromSession();
  }, [pathname]);

  const authValue = useMemo(
    () => ({
      user,
      loading,
      setUser,
    }),
    [user, loading, setUser],
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
