"use client";
import React, { useEffect, useState } from "react";
import MultiRangeSlider from "../multiRangeSlider";
import Close from "@/public/icons/close";
import FilterIcon from "@/public/icons/filter";

type MobilefilterMenu = {
  setShowFilterMenu: any;
  showFilterMenu: any;
};

export default function MobilefilterMenu({
  setShowFilterMenu,
  showFilterMenu,
}: MobilefilterMenu) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <>
      <div
        onClick={() => setShowFilterMenu(false)}
        className={`flex-center fixed inset-0 z-30 transition-colors ${
          showFilterMenu ? "visible bg-black/50 backdrop-blur-sm" : "invisible"
        } `}
      >
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-gray-250 lg:hidden">
          <div className="flex w-full items-center justify-between bg-secendry p-4 text-white">
            <div className="flex items-center gap-x-1.5">
              <FilterIcon className="h-5 w-5" />
              <span className="font-peyda-400 text-sm">فیلتر</span>
            </div>
            <Close
              className="h-6 w-6"
              onClick={() => setShowFilterMenu(false)}
            />
          </div>
          <div className="flex flex-col gap-y-[18px] p-4">
            <span className="block font-peyda-600 text-sm text-blue-1050 xl:text-lg">
              فیلتر براساس قیمت
            </span>

            {/* range */}

            <div className="mx-auto" style={{ direction: "ltr" }}>
              <MultiRangeSlider
                min={0}
                max={218828000}
                onChange={({ min, max }) => <></>}
              />
            </div>

            {/* range */}
          </div>
          <div className="flex flex-col gap-y-[18px] border-y border-solid border-y-[#1E1E1E33] p-4">
            <span className="block font-peyda-600 text-sm text-blue-1050 xl:text-lg">
              وضعیت موجودی
            </span>

            <div className="flex w-full items-center">
              <label className="containerCustom">
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <span className="block pr-6 font-peyda-400 text-sm lg:text-base">
                {" "}
                تخفیف دار
              </span>
            </div>

            <div className="flex w-full items-center">
              <label className="containerCustom">
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
              <span className="block pr-6 font-peyda-400 text-sm lg:text-base">
                {" "}
                موجود
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-y-[18px] p-4">
            <span className="block font-peyda-600 text-sm text-blue-1050 xl:text-lg">
              کالکشن ها
            </span>

            <div className="flex items-center justify-between bg-white/50 font-peyda-400 text-base text-blue-1050">
              <div className="p-2">
                <span>جواهرات</span>
              </div>
              <div className="border-r border-solid border-r-blue-1050 px-4 py-2">
                2
              </div>
            </div>
            <div className="flex items-center justify-between bg-white/50 font-peyda-400 text-base text-blue-1050">
              <div className="p-2">
                <span>نیسا</span>
              </div>
              <div className="border-r border-solid border-r-blue-1050 px-4 py-2">
                2
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
