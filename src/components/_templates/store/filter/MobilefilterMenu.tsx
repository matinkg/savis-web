"use client";

import React from "react";
import MultiRangeSlider from "../multiRangeSlider";
import Close from "@/public/icons/close";
import FilterIcon from "@/public/icons/filter";
import Button from "@/components/_modules/button";
import useFilterOperation from "./hook/useFilterOperation";
import { RotateCcw } from "lucide-react";

type MobilefilterMenuProps = {
  setShowFilterMenu: (value: boolean) => void;
  showFilterMenu: boolean;
};

export default function MobilefilterMenu({
  setShowFilterMenu,
  showFilterMenu,
}: MobilefilterMenuProps) {
  const {
    setMinPrice,
    setMaxPrice,
    setIsDiscounted,
    setIsAvailable,
    isAvailable,
    isDiscounted,
    handleFilterChange,
    resetFilters,
  } = useFilterOperation();

  return (
    <div
      onClick={() => setShowFilterMenu(false)}
      className={`fixed inset-0 z-30 transition-colors ${
        showFilterMenu ? "visible bg-black/50 backdrop-blur-sm" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed bottom-0 left-0 right-0 z-50 flex max-h-[90vh] flex-col overflow-hidden bg-gray-250 lg:hidden"
      >
        <div className="flex w-full items-center justify-between bg-secendry p-4 text-white">
          <div className="flex items-center gap-x-1.5">
            <FilterIcon className="h-5 w-5" />
            <span className="font-peyda-400 text-sm">فیلتر</span>
          </div>

          <Close
            className="h-6 w-6 cursor-pointer"
            onClick={() => setShowFilterMenu(false)}
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col gap-y-[18px] p-4">
            <span className="block font-peyda-600 text-sm text-blue-1050 xl:text-lg">
              فیلتر براساس قیمت
            </span>

            <div className="mx-auto" style={{ direction: "ltr" }}>
              <MultiRangeSlider
                min={0}
                max={218828000}
                onChange={({ min, max }) => {
                  setMinPrice(min);
                  setMaxPrice(max);
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-[18px] border-y border-solid border-y-[#1E1E1E33] p-4">
            <span className="block font-peyda-600 text-sm text-blue-1050 xl:text-lg">
              وضعیت موجودی
            </span>

            <div className="flex w-full items-center">
              <label className="containerCustom">
                <input
                  type="checkbox"
                  checked={isDiscounted}
                  onChange={(e) => setIsDiscounted(e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>

              <span className="block pr-6 font-peyda-400 text-sm lg:text-base">
                تخفیف دار
              </span>
            </div>

            <div className="flex w-full items-center">
              <label className="containerCustom">
                <input
                  type="checkbox"
                  checked={isAvailable}
                  onChange={(e) => setIsAvailable(e.target.checked)}
                />
                <span className="checkmark"></span>
              </label>

              <span className="block pr-6 font-peyda-400 text-sm lg:text-base">
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

        <div className="sticky bottom-0 flex items-center gap-x-3 border-t border-[#1E1E1E14] bg-gray-250 p-4">
          <Button
            onClick={resetFilters}
            className="flex h-11 w-11 group bg-secendry items-center justify-center text-white transition-all active:scale-95"
          >
            <RotateCcw className="h-5 w-5 group-hover:-rotate-180 transition-all duration-500" />
          </Button>

          <Button
            className="flex-1 bg-secendry py-3 font-peyda-500 text-sm text-white"
            onClick={() => {
              handleFilterChange();
              setShowFilterMenu(false);
            }}
          >
            اعمال فیلتر
          </Button>
        </div>
      </div>
    </div>
  );
}
