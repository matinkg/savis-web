import Close from "@/public/icons/close";
import SearchIcon from "@/public/icons/Search";
import Logo from "@/components/_modules/logo";
import SearchInput from "@/components/_modules/search";
import SocialMedia from "@/components/_modules/socialMedia";
import {
  ExtraSubMenuItem,
  navMenuProps,
  SubMenuState,
} from "../../../../libs/interface/navMenu";

import Link from "next/link";
import React, { useState } from "react";
import { headerMenu } from "@/static_data/header";
import { navMenu } from "@/static_data/header/nav";

export default function NavMenu({
  showNavMenu,
  setShowNavMenu,
  data,
}: navMenuProps) {
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
          children: []
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

  console.log(showExtraSubMenu)

  return (
    <>
      <div
        className={`fixed bg-[#D0E6ED4D] backdrop-blur-md ${
          showNavMenu ? "right-0" : "-right-64"
        } top-0 !z-50 flex min-h-screen w-64 flex-col overflow-auto px-4 transition-all`}
      >
        <div className="flex items-center py-6">
          <div className="flex-none">
            <Close
              onClick={() => setShowNavMenu(false)}
              className="h-6 w-6 text-white"
            />
          </div>
          <div className="flex-center grow">
            <Logo type="secondary" className="h-[47px] w-[104] text-white" />
          </div>
        </div>

        <SearchInput
          className="h-10 w-full border border-solid border-[#DDE4E6B2] bg-transparent font-peyda-400 text-xs text-white lg:mb-10"
          placeholder="جتسجو"
          inputStyle={{
            color: "#fff",
            height: "40px",
            backgroundColor: "#EFF5F633",
          }}
        >
          <SearchIcon className="absolute left-2 top-[10px] h-[18px] w-[18px]" />
        </SearchInput>

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
                      href={item?.href || "#"}
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
                              children: []
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
                  <div
                    key={index}
                    onClick={() =>{
                      setExtraShowSubMenu({
                        subCategoryName: String(item?.title || ""),
                        data: item?.children,
                      })}
                    }
                    className="flex items-center justify-between py-3"
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
                  onClick={() => {
                    setShowSubMenu({ status: true, data: item })
                    console.log(item)
                  }}
                  className="flex items-center justify-between border-b border-solid border-b-white py-3"
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
              ))}
            </div>

            <div className="flex flex-col gap-y-6">
              {navMenu.map((item, index) => (
                <Link
                  key={index + "@#"}
                  href={item?.link}
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
        className="fixed inset-0 !z-10 h-screen w-full bg-black/70 backdrop-blur-lg transition-all"
      ></div>
    </>
  );
}
