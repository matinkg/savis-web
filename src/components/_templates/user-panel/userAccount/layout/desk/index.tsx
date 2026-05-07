import React from "react";
import SideBar from "../../sideBar";

export default function DeskLayout({ children }: { children: any }) {
  return (
    <div className="w-[91.12%] lg:w-[91.67%] 4xl:w-[85%] mx-auto grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-6">
      <div className="lg:col-span-2 flex flex-col gap-y-6">
        <SideBar />
      </div>
      <div className="lg:col-span-8 flex flex-col lg:px-6 ">{children}</div>
    </div>
  );
}
