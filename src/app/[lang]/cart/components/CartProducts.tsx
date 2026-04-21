import { Button, Card, Divider } from "antd";
import { BsTrash3Fill } from "react-icons/bs";
import CartItem from "./CartItem";
import LinkButton from "@/common/LinkButton";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LangContext";
import { useEffect, useMemo } from "react";
import CheckoutProcessing from "./CheckoutProcessing";

export default function CartProducts() {
  const { lang, dictionary } = useLang();
  const { cart, clearCart, addToCart, cartCount } = useCart();
  const t = dictionary.cart;

  const { subtotal, discount } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        const product = item.product;
        if (!product) return acc;

        const currentPrice = product.priceUnit ?? product.price ?? 0;
        const originalPrice =
          product.previousPrice && product.previousPrice > currentPrice
            ? product.previousPrice
            : currentPrice;

        acc.subtotal += originalPrice * item.quantity;
        acc.discount += (originalPrice - currentPrice) * item.quantity;
        return acc;
      },
      { subtotal: 0, discount: 0 },
    );
  }, [cart]);

  const total = subtotal - discount;

  const handleClearCart = async () => {
    await clearCart();
  };

  useEffect(() => {
    const missingIds = cart
      .filter((item) => !item.product)
      .map((item) => item.productId);

    if (missingIds.length === 0) return;

    const fetchDetails = async () => {
      await Promise.all(
        missingIds.map(async (id) => {
          try {
            const res = await fetch(`/api/product/${id}`);
            const data = await res.json();
            if (data.success && data.data) {
              await addToCart(data.data, 0, true);
            }
          } catch (e) {
            console.error(`Error fetching product ${id}:`, e);
          }
        }),
      );
    };

    fetchDetails();
  }, [cart, addToCart]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <p className="text-base">
          {t.total_products} ({cartCount})
        </p>
        <Button
          type="primary"
          className="shadow-none bg-brinco hover:bg-brinco-dark"
          icon={<BsTrash3Fill />}
          onClick={handleClearCart}
        >
          {t.clear_cart}
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 mt-10">
        <div className="flex flex-col gap-5 text-base lg:w-5/7">
          <div className="grid-cols-5 hidden lg:grid text-lg ms-5">
            <p className="col-span-2">Productos</p>
            <p className="text-end">Precio Unitario</p>
            <p className="text-center">Cantidad</p>
            <p className="text-end pe-5">Subtotal</p>
          </div>
          {cart.map((el) => (
            <CartItem cartItem={el} key={el.productId} />
          ))}
        </div>
        <Card className="flex-1 shadow-lg rounded-2xl text-base h-fit lg:sticky lg:top-24">
          <strong className="text-2xl">{t.order_summary}</strong>
          <Divider className="my-5" />
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <p>{t.amount_products}</p>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between">
              <p>{t.discount_saved}</p>
              <strong>${discount.toFixed(2)}</strong>
            </div>
          </div>
          <Divider className="my-5" />
          <div className="flex justify-between text-xl">
            <p>{t.total_cost}</p>
            <strong className="text-brinco">${total.toFixed(2)}</strong>
          </div>

          <div className="flex flex-col gap-3 mt-10">
            <LinkButton
              text={t.back_to_store}
              url={`/${lang}/catalog`}
              className="rounded-full w-full py-3 bg-brinco/70! hover:bg-brinco/50!"
            />
            <CheckoutProcessing />
          </div>
        </Card>
      </div>
    </div>
  );
}
