import DropDownMenuCustomize from "@/components/_modules/dropDownMenu/dropDownMenuCustomize";
import GetCodeInputComponent from "@/components/_modules/get codeInputComponent";
import React from "react";
import GetCodeForm from "./getCodeForm";

type GiftCardProps = {
  img: string;
  name: string;
  code: string;
};

export default function GiftCardComponents({ img, name, code }: GiftCardProps) {
  return (
    <div className="w-full h-[43vh] py-4 px-2 xl:px-4 flex flex-col items-center overflow-y-auto scrollbar-none">
      <img
        src={img}
        alt=""
        className="object-cover aspect-[1/0.55] 2xl:aspect-[1/0.45]"
      />

      <div className="w-full  flex flex-col gap-y-[18px]">
        <span className="block font-peyda-600 text-blue-1050 text-lg md:text-xl text-center">
          {name}
        </span>

        {/* ---------------------- content----------------------- */}

        <DropDownMenuCustomize title=" جزئیات بیشتر">
          <div className="flex flex-col items-center">
            <GetCodeInputComponent url={code} />
            <GetCodeForm />
          </div>
        </DropDownMenuCustomize>
      </div>
    </div>
  );
}
