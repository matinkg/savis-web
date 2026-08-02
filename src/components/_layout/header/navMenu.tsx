import Close from "@/public/icons/close";
import nisaLightLogoImg from "@/lib/assets/images/nisa-light-logo.webp";
import SocialMedia from "@/components/_modules/socialMedia";
import {
  ExtraSubMenuItem,
  navMenuProps,
  SubMenuState,
} from "../../../../libs/interface/navMenu";

import Link from "next/link";
import React, { useState } from "react";
import { navMenu } from "@/static_data/header/nav";
import Image from "next/image";
import MobileSearch from "@/components/_modules/searchComponents/mobile-search";

export default function NavMenu({
  showNavMenu,
  setShowNavMenu,
  data,
}: navMenuProps) {
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

  const [showSubMenu, setShowSubMenu] = useState<SubMenuState>({
    status: false,
    data: {
      id: "",
      title: "",
      href: "",
      children: [
        {
          title: "",
          href: "",
          children: [],
        },
      ],
    },
  });

  const [showExtraSubMenu, setExtraShowSubMenu] = useState<{
    subCategoryName: string;
    data: ExtraSubMenuItem[];
  }>({
    subCategoryName: "",
    data: [],
  });

  return (
    <>
      <div
        className={`fixed bg-[#D0E6ED4D] backdrop-blur-md ${
          showNavMenu ? "right-0" : "-right-64"
        } top-0 !z-50 flex w-64 flex-col overflow-y-scroll h-screen px-4 transition-all duration-500`}
      >
        <div className="flex items-center py-6">
          <div className="flex-none">
            <Close
              onClick={() => setShowNavMenu(false)}
              className="h-6 w-6 text-white cursor-pointer"
            />
          </div>
          <div className="flex-center grow">
            <Image
              className="w-[70px]"
              src={nisaLightLogoImg}
              alt="nisa-light-logo"
            />
          </div>
        </div>
        {/* 
        <SearchInput
          className="h-10 w-full mb-3 border border-solid border-[#DDE4E6B2] bg-transparent font-peyda-400 text-xs text-white lg:mb-10"
          placeholder="جتسجو"
          inputStyle={{
            color: "#fff",
            height: "40px",
            backgroundColor: "#EFF5F633",
          }}
        >
          <SearchIcon className="absolute left-2 top-[10px] h-[18px] w-[18px]" />
        </SearchInput> */}

        <MobileSearch onResultClick={() => setShowNavMenu(false)} />

        {/* <SearchComponents inMobile={true} /> */}

        {showSubMenu.status ? (
          <>
            {showExtraSubMenu.data?.length > 0 ? (
              <div className="mb-6">
                <div className="mb-6 flex items-center border-b border-solid border-b-white pb-3">
                  <div
                    onClick={() =>
                      setExtraShowSubMenu({ subCategoryName: "", data: [] })
                    }
                    className="rotate-180"
                  >
                    <svg
                      className="h-[18px] w-[18px] text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.9998 20.67C14.8098 20.67 14.6198 20.6 14.4698 20.45L7.94979 13.93C6.88979 12.87 6.88979 11.13 7.94979 10.07L14.4698 3.55C14.7598 3.26 15.2398 3.26 15.5298 3.55C15.8198 3.84 15.8198 4.32 15.5298 4.61L9.00979 11.13C8.52979 11.61 8.52979 12.39 9.00979 12.87L15.5298 19.39C15.8198 19.68 15.8198 20.16 15.5298 20.45C15.3798 20.59 15.1898 20.67 14.9998 20.67Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h1 className="grow text-center font-peyda-400 text-lg text-white">
                    {showExtraSubMenu.subCategoryName}
                  </h1>
                </div>
                {showExtraSubMenu?.data?.map((item, index) => (
                  <div key={index} className="flex-center py-3">
                    <Link
                      href={resolveHref(item?.href)}
                      onClick={() => setShowNavMenu(false)}
                      className="font-peyda-400 text-lg text-white"
                    >
                      {item?.title}
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-6">
                <div className="mb-6 flex items-center border-b border-solid border-b-white pb-3">
                  <div
                    onClick={() =>
                      setShowSubMenu({
                        status: false,
                        data: {
                          id: "",
                          title: "",
                          href: "",
                          children: [
                            {
                              title: "",
                              href: "",
                              children: [],
                            },
                          ],
                        },
                      })
                    }
                    className="rotate-180"
                  >
                    <svg
                      className="h-[18px] w-[18px] text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14.9998 20.67C14.8098 20.67 14.6198 20.6 14.4698 20.45L7.94979 13.93C6.88979 12.87 6.88979 11.13 7.94979 10.07L14.4698 3.55C14.7598 3.26 15.2398 3.26 15.5298 3.55C15.8198 3.84 15.8198 4.32 15.5298 4.61L9.00979 11.13C8.52979 11.61 8.52979 12.39 9.00979 12.87L15.5298 19.39C15.8198 19.68 15.8198 20.16 15.5298 20.45C15.3798 20.59 15.1898 20.67 14.9998 20.67Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h1 className="grow text-center font-peyda-400 text-lg text-white">
                    {showSubMenu?.data?.title}
                  </h1>
                </div>
                {showSubMenu?.data?.children?.map((item, index) => (
                  <div key={index} className="py-3">
                    {item?.children?.length > 0 ? (
                      <div
                        onClick={() => {
                          setExtraShowSubMenu({
                            subCategoryName: String(item?.title || ""),
                            data: item?.children,
                          });
                        }}
                        className="flex items-center justify-between"
                      >
                        <span className="font-peyda-400 text-lg text-white">
                          {item?.title}
                        </span>
                        <div>
                          <svg
                            className="h-[18px] w-[18px] text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M14.9998 20.67C14.8098 20.67 14.6198 20.6 14.4698 20.45L7.94979 13.93C6.88979 12.87 6.88979 11.13 7.94979 10.07L14.4698 3.55C14.7598 3.26 15.2398 3.26 15.5298 3.55C15.8198 3.84 15.8198 4.32 15.5298 4.61L9.00979 11.13C8.52979 11.61 8.52979 12.39 9.00979 12.87L15.5298 19.39C15.8198 19.68 15.8198 20.16 15.5298 20.45C15.3798 20.59 15.1898 20.67 14.9998 20.67Z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={resolveHref(item?.href)}
                        onClick={() => setShowNavMenu(false)}
                        className="font-peyda-400 text-lg text-white"
                      >
                        {item?.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="mb-6">
              {data?.map((item: any, index: any) => (
                <div
                  key={index}
                  className="border-b border-solid border-b-white py-3"
                >
                  {item?.children?.length > 0 ? (
                    <div
                      onClick={() => {
                        setShowSubMenu({ status: true, data: item });
                        setExtraShowSubMenu({ subCategoryName: "", data: [] });
                      }}
                      className="flex items-center justify-between"
                    >
                      <span className="font-peyda-400 text-lg text-white">
                        {item?.title}
                      </span>
                      <div>
                        <svg
                          className="h-[18px] w-[18px] text-white"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M14.9998 20.67C14.8098 20.67 14.6198 20.6 14.4698 20.45L7.94979 13.93C6.88979 12.87 6.88979 11.13 7.94979 10.07L14.4698 3.55C14.7598 3.26 15.2398 3.26 15.5298 3.55C15.8198 3.84 15.8198 4.32 15.5298 4.61L9.00979 11.13C8.52979 11.61 8.52979 12.39 9.00979 12.87L15.5298 19.39C15.8198 19.68 15.8198 20.16 15.5298 20.45C15.3798 20.59 15.1898 20.67 14.9998 20.67Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={resolveHref(item?.href)}
                      onClick={() => setShowNavMenu(false)}
                      className="font-peyda-400 text-lg text-white"
                    >
                      {item?.title}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-y-6 mb-10">
              {navMenu.map((item, index) => (
                <Link
                  key={index + "@#"}
                  href={item?.link}
                  onClick={() => setShowNavMenu(false)}
                  className="font-peyda-400 text-lg text-white"
                >
                  {item?.name}
                </Link>
              ))}
            </div>
          </>
        )}

        <div className="mt-auto pb-10">
          <SocialMedia className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* <!-- overlay --> */}
      <div
        onClick={() => setShowNavMenu(false)}
        className={`${showNavMenu ? "opacity-100" : "opacity-0 pointer-events-none"} fixed inset-0 !z-40 h-screen w-full bg-black/70 backdrop-blur-lg transition-all`}
      ></div>
    </>
  );
}
