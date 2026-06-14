"use client";

import React from "react";
import MultiRangeSlider from "../multiRangeSlider";
import Button from "@/components/_modules/button";
import useFilterOperation from "./hook/useFilterOperation";
import { RotateCcw } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter({ categories }: { categories: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const pathname = usePathname();
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

  const getCategoryFromSlug = (slug: string) => {
    const params = new URLSearchParams(slug.split("?")[1]);
    return params.get("category");
  };

  const handleResetAll = () => {
    resetFilters();
    router.replace(pathname);
  };

  return (
    <div className="bg-gray-250 px-3 2xl:px-5 flex flex-col">
      <div className="py-5 flex flex-col gap-y-14">
        <div className="flex items-center justify-between gap-x-2">
          <span className="block font-peyda-600 text-sm xl:text-lg text-blue-1050">
            فیلتر براساس قیمت
          </span>
        </div>

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
      </div>

      <div className="border-solid border-y border-y-[#1E1E1E33] py-5 flex flex-col gap-y-5">
        <span className="block font-peyda-600 text-sm xl:text-lg text-blue-1050">
          وضعیت موجودی
        </span>

        <div className="w-full flex items-center">
          <label className="containerCustom">
            <input
              type="checkbox"
              checked={isDiscounted}
              onChange={(e) => setIsDiscounted(e.target.checked)}
            />
            <span className="checkmark"></span>
          </label>

          <span className="text-sm lg:text-base font-peyda-400 block pr-6">
            تخفیف دار
          </span>
        </div>

        <div className="w-full flex items-center">
          <label className="containerCustom">
            <input
              type="checkbox"
              onChange={(e) => setIsAvailable(e.target.checked)}
              checked={isAvailable}
            />
            <span className="checkmark"></span>
          </label>

          <span className="text-sm lg:text-base font-peyda-400 block pr-6">
            موجود
          </span>
        </div>
      </div>

      <div className="py-[18px] flex flex-col gap-y-[18px]">
        <span className="block font-peyda-600 text-sm xl:text-lg text-blue-1050">
          دسته بندی ها
        </span>
        <div className="flex flex-col gap-y-2 h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-secendry scrollbar-track-gray-250">
          {categories?.map((item: any) => {
            const itemCategory = getCategoryFromSlug(item.slug);
            const isActive = itemCategory === activeCategory;

            return (
              <div
                key={item?.id}
                onClick={() => router.push(item.slug)}
                className={`cursor-pointer flex items-center justify-between text-base font-peyda-400 transition-all duration-300 ${isActive ? "bg-secendry text-white font-bold" : "bg-white/50 text-blue-1050 hover:text-white hover:bg-secendry"}`}
              >
                <div className="p-2 flex items-center gap-x-2">
                  <span>{item?.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="sticky bottom-0 flex items-center gap-x-1 border-t border-[#1E1E1E14] bg-gray-250 mb-2">
        <Button
          onClick={handleResetAll}
          className="flex h-8 w-8 group bg-secendry items-center justify-center text-white transition-all active:scale-95"
        >
          <RotateCcw className="h-4 w-4 group-hover:-rotate-180 transition-all duration-500" />
        </Button>

        <Button
          className="flex-1 bg-secendry py-1.5 font-peyda-500 text-sm text-white"
          onClick={() => {
            handleFilterChange();
          }}
        >
          اعمال فیلتر
        </Button>
      </div>
    </div>
  );
}
