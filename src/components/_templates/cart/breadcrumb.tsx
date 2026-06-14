"use client";
import { useDataContext } from "@/libs/context/app-data";
import Line from "@/public/icons/line";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Breadcrumb() {
  const pathName = usePathname();
  const { userInfo } = useDataContext();

  const isLoggedIn = !!userInfo?.id;

  return (
    <div className="mx-auto flex w-full items-center justify-center gap-x-3 bg-gray-250 px-3 py-4 lg:w-[70%] lg:py-6 xl:w-[44.5%]">
      <Link
        href={isLoggedIn ? `/cart` : `/auth/signin`}
        className={`flex items-center gap-x-3 ${pathName === "/cart" ? "text-primary" : "text-slate-1000/50"} `}
      >
        <span className="font-peyda-600 text-sm xl:text-lg 2xl:text-2xl">
          سبد خرید
        </span>
        <Line className="h-4 w-5 md:w-10 lg:w-[77px]" />
      </Link>
      <Link
        href={isLoggedIn ? `/cart/checkout` : `/auth/signin`}
        className={`flex items-center gap-x-3 ${pathName === "/cart/checkout" ? "text-primary" : "text-slate-1000/50"} `}
      >
        <span className="font-peyda-600 text-sm xl:text-lg 2xl:text-2xl">
          تسویه حساب
        </span>
        <Line className="h-4 w-5 md:w-10 lg:w-[77px]" />
      </Link>
      <Link
        href={isLoggedIn ? `/cart/orderCompletion` : `/auth/signin`}
        className={`flex items-center gap-x-3 ${pathName === "/cart/orderCompletion" ? "text-primary" : "text-slate-1000/50"} `}
      >
        <span className="font-peyda-600 text-sm xl:text-lg 2xl:text-2xl">
          تکمیل سفارش
        </span>
      </Link>
    </div>
  );
}
