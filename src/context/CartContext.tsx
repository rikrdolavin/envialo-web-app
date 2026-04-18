"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { CartItem } from "@/models/cart";
import { useAuth } from "./AuthContext";
import {
  addToCartApi,
  clearCartApi,
  getCart,
  removeFromCartApi,
} from "@/lib/cart";
import { ProductVariant } from "@/models/products";

interface CartContextType {
  cart: CartItem[];
  loading: boolean;
  addToCart: (
    product: ProductVariant,
    quantity: number,
    onlyToContext?: boolean,
  ) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  cartCount: number;
  syncCart: () => Promise<void>;
  guestCartKey: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

//  region Cookies handlers
const setCookie = (name: string, value: string, days = 30) => {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
};

const getCookie = (name: string) => {
  if (typeof document === "undefined") return "";
  return document.cookie.split("; ").reduce((r, v) => {
    const parts = v.split("=");
    return parts[0] === name ? decodeURIComponent(parts[1]) : r;
  }, "");
};

const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export function CartProvider({ children }: Readonly<{ children: ReactNode }>) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [guestCartKey, setGuestCartKey] = useState<string | null>(() => {
    if (typeof document !== "undefined") {
      return getCookie("guestCartKey") || null;
    }
    return null;
  });

  const fetchApiCart = useCallback(async () => {
    try {
      const response = await getCart();
      if (response.success && response.data) {
        if (response.data.key?.includes("guest")) {
          const key = response.data.key.split(":")[1];
          setGuestCartKey(key);
          setCookie("guestCartKey", key);
        }

        const data = Array.isArray(response.data)
          ? response.data
          : (response.data.items ?? []);
        setCart(data);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart from API", error);
      setCart([]);
    }
  }, []);

  const syncCart = useCallback(async () => {
    setLoading(true);

    // If user is present, we clear the guest key (merge handled by backend)
    if (user) {
      removeCookie("guestCartKey");
      setGuestCartKey(null);
    }

    // Always fetch items from the server to populate the state
    await fetchApiCart();

    setLoading(false);
  }, [user, fetchApiCart]);

  useEffect(() => {
    const performSync = async () => {
      await syncCart();
    };
    performSync();
  }, [user, syncCart]);

  const addToCart = useCallback(
    async (
      product: ProductVariant,
      quantity: number,
      onlyToContext?: boolean,
    ) => {
      setCart((currentCart) => {
        const cartArray = Array.isArray(currentCart) ? currentCart : [];
        const existing = cartArray.find(
          (item) => item.productId === product.id,
        );

        if (existing) {
          return cartArray.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + quantity, product }
              : item,
          );
        } else {
          return [...cartArray, { productId: product.id, quantity, product }];
        }
      });

      // Call API for both guests and authenticated users
      // The library handles guest_id propagation via cookie automatically
      if (!onlyToContext) {
        await addToCartApi(product.id, quantity);
      }
    },
    [],
  );

  const removeFromCart = useCallback(async (productId: string) => {
    setCart((currentCart) => {
      const cartArray = Array.isArray(currentCart) ? currentCart : [];
      return cartArray.filter((item) => item.productId !== productId);
    });

    await removeFromCartApi(productId);
  }, []);

  const updateQuantity = useCallback(
    async (productId: string, quantity: number) => {
      setCart((currentCart) => {
        const cartArray = Array.isArray(currentCart) ? currentCart : [];
        return cartArray.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      });

      await addToCartApi(productId, quantity);
    },
    [],
  );

  const clearCart = useCallback(async () => {
    setCart([]);
    await clearCartApi();
  }, []);

  const cartCount = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  const contextValue = useMemo(
    () => ({
      cart: Array.isArray(cart) ? cart : [],
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      syncCart,
      guestCartKey,
    }),
    [
      cart,
      loading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount,
      syncCart,
      guestCartKey,
    ],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
