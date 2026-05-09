import React from "react";

import Link from "next/link";
import { useGoldPrice } from "@/libs/context/gold-price";
import useOperation from "@/components/_templates/clientLayout/hook/useOperation";

const navMenu = [
  {
    name: "وبلاگ",
    link: "/blog",
  },
  {
    name: "درباره ما",
    link: "/aboutus",
  },
  {
    name: "تماس با ما",
    link: "/contactus",
  },
  {
    name: "گیفت کارت",
    link: "/giftCard",
  },
];

export default function Nav() {
  const { goldData, goldError, isLoading } = useGoldPrice();
  const { siteSetting } = useOperation();
  const resolveHref = (href?: string) => {
    const value = String(href || "").trim();
    if (!value) return "#";
    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("tel:") ||
      value.startsWith("mailto:")
    ) {
      return value;
    }
    if (value.startsWith("//")) return value.slice(1);
    return value.startsWith("/") ? value : `/${value}`;
  };
  // =============================================================================
  return (
    <>
      <nav className=" hidden lg:block bg-secendry text-white">
        <div className="w-[91.67%] mx-auto flex items-center justify-between  py-[14px]">
          <div className="font-peyda-400 text-sm xl:text-lg flex gap-x-6">
            {navMenu.map((item, index) => (
              <Link key={index} href={item.link}>
                {item.name}
              </Link>
            ))}
          </div>
          <div>
            <a
              href={resolveHref(siteSetting?.top_text_link)}
              className="font-peyda-600 text-lg xl:text-xl"
            >
              {siteSetting?.top_text}
            </a>
          </div>
          <div>
            <div className="flex items-center gap-x-2 ">
              <span className="font-peyda-400 text-lg xl:text-lg">
                قیمت روز طلا :
              </span>
              {isLoading ? (
                <div className="dots"></div>
              ) : (
                <span className="font-peyda-600">
                  {Number(goldData ?? 0).toLocaleString("fa-ir")}
                  تومان
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* // in mobile : */}

      <nav className="flex lg:hidden bg-secendry text-white w-full flex-col items-center py-2">
        <div>
          <a
            href={resolveHref(siteSetting?.top_text_link)}
            className="font-peyda-600 text-xs md:text-base"
          >
            {siteSetting?.top_text}
          </a>
        </div>
        <div className="w-full h-[1px] bg-white/20 my-2"></div>
        <div>
          <div className="flex items-center gap-x-2  ">
            <span className="font-peyda-600 text-xs md:text-base">
              قیمت روز طلا :
            </span>
            {isLoading ? (
              <div className="dots"></div>
            ) : (
              <span className="font-peyda-600">
                {Number(goldData ?? 0).toLocaleString("fa-ir")}
                تومان
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
