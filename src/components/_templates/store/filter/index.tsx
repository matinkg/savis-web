"use client";
import React from "react";
import MultiRangeSlider from "../multiRangeSlider";
import Button from "@/components/_modules/button";
import useFilterOperation from "./hook/useFilterOperation";

export default function Filter() {
  const {
    setMinPrice,
    setMaxPrice,
    setIsDiscounted,
    setIsAvailable,
    isAvailable,
    isDiscounted,
    handleFilterChange,
  } = useFilterOperation();

  return (
    <div className=" bg-gray-250 px-3 2xl:px-5 flex flex-col ">
      <div className=" py-5 flex flex-col gap-y-14">
        <div className="flex items-center justify-between">
          <span className="block font-peyda-600 text-sm xl:text-lg text-blue-1050">
            فیلتر براساس قیمت
          </span>
          <Button
            className="font-peyda-600 text-sm text-white bg-primary  border border-primary px-2 py-1"
            onClick={handleFilterChange}
          >
            اعمال فیلتر
          </Button>
        </div>

        {/* range */}
        <div style={{ direction: "ltr" }}>
          <MultiRangeSlider
            min={0}
            max={218828000}

            onChange={({ min, max }) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
          />
        </div>
        {/* range */}
      </div>

      <div className="border-solid border-y border-y-[#1E1E1E33] py-5 flex flex-col gap-y-5">
        <span className="block font-peyda-600 text-sm xl:text-lg text-blue-1050">
          وضعیت موجودی
        </span>

        <div className="w-full flex items-center">
          <label className="containerCustom ">
            <input
              type="checkbox"
              checked={isDiscounted}
              onChange={(e) => setIsDiscounted(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>
          <span className="text-sm lg:text-base font-peyda-400 block pr-6">
            {" "}
            تخفیف دار
          </span>
        </div>

        <div className="w-full flex items-center">
          <label className="containerCustom ">
            <input
              type="checkbox"
              onChange={(e) => setIsAvailable(e.target.checked)}
              checked={isAvailable}
            />
            <span className="checkmark"></span>
          </label>
          <span className="text-sm lg:text-base font-peyda-400 block pr-6">
            {" "}
            موجود
          </span>
        </div>
      </div>
      <div className="py-[18px] flex flex-col gap-y-[18px]">
        <span className="block font-peyda-600 text-sm xl:text-lg text-blue-1050">
          کالکشن ها
        </span>

        <div className="bg-white/50 flex items-center justify-between text-blue-1050 font-peyda-400 text-base">
          <div className=" p-2 ">
            <span>جواهرات</span>
          </div>
          <div className="border-solid border-r border-r-blue-1050 py-2 px-4">
            2
          </div>
        </div>
        <div className="bg-white/50 flex items-center justify-between text-blue-1050 font-peyda-400 text-base">
          <div className=" p-2 ">
            <span>ساویس</span>
          </div>
          <div className="border-solid border-r border-r-blue-1050 py-2 px-4">
            2
          </div>
        </div>
      </div>
    </div>
  );
}
