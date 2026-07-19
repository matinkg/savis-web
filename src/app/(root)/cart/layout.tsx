"use client";

import InstagramPosts from "@/components/_modules/instagram";
import Breadcrumb from "@/components/_templates/cart/breadcrumb";
import CartEmpty from "@/components/_templates/cart/cartEmpty";
import { useCart } from "@/libs/context/cart-shopping/CartContext";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state } = useCart();
  const pathname = usePathname();

  return (
    <>
      {/* banner  */}
      <h1 className="mt-48 font-peyda-900 text-center text-[44px] text-black lg:font-peyda-600 lg:text-[85px]">
        {pathname === "/cart/checkout" ? "تسویه حساب" : "سبد خرید"}
      </h1>
      {/* banner  */}

      <section className="mx-auto my-10 w-[91.12%] space-y-10 lg:mt-[60px] lg:w-[91.67%] lg:space-y-20 ">
        <>
          {state?.items?.length === 0 ? (
            <CartEmpty />
          ) : (
            <>
              <Breadcrumb />

              {children}
            </>
          )}
        </>
        <InstagramPosts className="hidden md:grid w-full" />
      </section>
    </>
  );
}
