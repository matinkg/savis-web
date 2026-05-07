"use client";
import React, { useState } from "react";
import ArrowDown from "@/public/icons/arrowDown";
import { dropDownMenu } from "../../../../libs/interface/dropDownMenu";

export default function DropDownMenu({
  title,
  className,

  titleStyle,
  type,
  children,
}: dropDownMenu) {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div
      onClick={() => setShowMenu(!showMenu)}
      className={`${className} cursor-pointer`}
    >
      <div
        className={`flex w-full items-center justify-between ${
          showMenu && "pb-5"
        }`}
      >
        <span className={`font-peyda-500 ${titleStyle} `}>{title}</span>

        <div className="cursor-pointer">
          {type === "down" ? (
            <ArrowDown className={`h-6 w-6 ${showMenu && "rotate-180"}`} />
          ) : (
            <ArrowDown
              className={`h-[18px] w-[18px] ${showMenu && "rotate-180"}`}
            />
          )}
        </div>
      </div>

      {showMenu ? <>{children}</> : ""}
    </div>
  );
}
