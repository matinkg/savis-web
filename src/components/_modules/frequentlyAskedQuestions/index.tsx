import React from "react";
import DropDownMenu from "../dropDownMenu";

export default function FrequentlyAskedQuestions({ faq }: any) {
  return (
    <div className="flex flex-col items-center gap-y-6 my-[60px] lg:mb-[60px]  lg:mt-[120px]">
      <span className="block font-peyda-600 text-2xl lg:text-[32px]">
        سوالات متداول
      </span>

      <div className="w-full space-y-5 my-10 lg:my-[60px]">
        {faq?.map((item: any) => (
          <DropDownMenu
            type="down"
            key={item?.id}
            titleStyle="text-sm lg:text-lg"
            title={item?.title_1}
            className="w-full bg-gray-250 font-peyda-600 text-sm lg:text-base  text-blue-1050 p-2 py-3  lg:p-3 lg:py-[18px]  "
          >
            <span className="font-peyda-400  text-xs lg:text-base">
              {item?.summary}
            </span>
          </DropDownMenu>
        ))}
      </div>
    </div>
  );
}
