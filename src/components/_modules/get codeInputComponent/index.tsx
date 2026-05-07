import React, { useState } from "react";
import Button from "../button";
import Copy from "@/public/icons/copy";
import { showSwal } from "@/helper/swal";

export default function GetCodeInputComponent({ url }: { url: string }) {
  const [copiedText, setCopiedText] = useState<string>("");

  const handleClick = () => {
    const inputField = document.getElementById(
      "inputField"
    ) as HTMLInputElement;
    if (inputField) {
      inputField.select();
      document.execCommand("copy");
      setCopiedText(inputField.value);
      showSwal(" با موفقیت کپی شد!    ", "success", "بستن");
    }
  };
  return (
    <div className="w-full flex items-center gap-x-1 md:gap-x-3">
      <input
        id="inputField"
        type="text"
        readOnly
        value={url}
        className="h-[32px] grow border border-secendry bg-transparent text-center text-xs text-secendry md:text-sm lg:h-[48px] lg:text-base"
      />
      <Button
        onClick={handleClick}
        className="flex-center h-[32px] w-fit gap-x-2 bg-secendry px-5 py-2 font-peyda-400 text-xs text-white lg:h-[48px] lg:py-3 lg:text-lg"
      >
        <span>کپی کردن</span>
        <Copy className="h-4 w-4 text-white lg:h-6 lg:w-6" />
      </Button>
    </div>
  );
}
