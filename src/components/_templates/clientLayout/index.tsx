"use client";

import Footer from "@/components/_layout/footer";
import Header from "@/components/_layout/header";
import { usePathname } from "next/navigation";
import useOperation from "./hook/useOperation";
import PrimaryLoading from "../loading/primaryLoading";
import { GoldPriceProvider } from "@/libs/context/gold-price";
import { AppDataProvider } from "@/libs/context/app-data";
import { CartProvider } from "@/libs/context/cart-shopping/CartContext";

const routes = [
  "/auth/admin/signin",
  "/auth/signin",
  "/auth/signup",
  "/admin-panel",
  '/influencer',
  '/influencer/login'
];

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { categoriesDataLevelOne, loading } = useOperation();
  // -------------------------------------------------

  const pathname = usePathname();

  // بررسی اینکه آیا pathname با یکی از مسیرهای موجود در routes شروع می‌شود
  const shouldHideLayout = routes.some((route) => pathname.startsWith(route));

  return (
    <>
      {loading ? (
        <>
          <PrimaryLoading />
        </>
      ) : (
        <>
          <GoldPriceProvider>
            <CartProvider>
              <AppDataProvider>
                {!shouldHideLayout && (
                  <Header noFixed={false} data={categoriesDataLevelOne} />
                )}
                {children}
                {!shouldHideLayout && <Footer />}
              </AppDataProvider>
            </CartProvider>
          </GoldPriceProvider>
        </>
      )}
    </>
  );
}
