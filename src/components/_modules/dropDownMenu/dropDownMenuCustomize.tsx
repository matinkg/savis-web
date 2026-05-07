"use client";

import React, { useState } from "react";
import Button from "../button";
import ArrowDown from "@/public/icons/arrowDown";
import { dropDownMenu } from "../../../../libs/interface/dropDownMenu";

export default function DropDownMenuCustomize({
  children,

  title,
  className,

  titleStyle,
}: dropDownMenu) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      {/* ---------------------- content----------------------- */}
      {showMenu && children}

      <Button
        onClick={() => setShowMenu(!showMenu)}
        className="flex-center w-full gap-x-1.5 bg-secendry py-2 font-peyda-400 text-xs text-white lg:text-sm"
      >
        <span>{title}</span>
        <ArrowDown className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />
      </Button>
    </>
  );
}
