import React, { useEffect, useState } from "react";
import SideBar from "../../sideBar";
import ArrowLeftlessLine from "@/public/icons/arrowLeftlessLine";
import { usePathname } from "next/navigation";

export default function MobileLayout({ children }: { children: any }) {
  const pathname = usePathname();

  const [toggle, setToggle] = useState({
    sidebar: true,
    children: pathname === "/user-panel" ? true : false,
  });

  useEffect(() => {
    setToggle({
      sidebar: pathname === "/user-panel" ? true : false,
      children: true,
    });
  }, [pathname]);
  return (
    <div className="mx-auto grid w-[91.12%] grid-cols-1 gap-10 lg:w-[91.67%] lg:grid-cols-10 lg:gap-6 4xl:w-[85%]">
      <div
        className={`${
          toggle.sidebar ? "flex flex-col gap-y-6 lg:col-span-2" : "hidden"
        }`}
      >
        <SideBar />
      </div>
      <div
        className={` ${
          toggle.children ? "flex flex-col lg:col-span-8 lg:px-6" : "hidden"
        }`}
      >
        {pathname === "/user-panel" ? (
          <></>
        ) : (
          <div
            className={`${toggle?.sidebar ? "hidden" : "block"} mb-6 flex items-center gap-x-1.5 text-blue-1050 cursor-pointer`}
            onClick={() =>
              setToggle({
                sidebar: true,
                children: true,
              })
            }
          >
            <ArrowLeftlessLine className="h-[18px] w-[18px]" />
            <span className="font-peyda-400"> بازگشت</span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
