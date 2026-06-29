"use client";

import React, { useEffect, useState } from "react";
import MultiRangeSlider from "../multiRangeSlider";
import Button from "@/components/_modules/button";
import useFilterOperation from "./hook/useFilterOperation";
import { ChevronDown, RotateCcw } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter({
  categories,
  tags,
}: {
  categories: any;
  tags: any;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const activeTag = searchParams.get("tag_ids");
  const pathname = usePathname();
  const [openCategory, setOpenCategory] = useState<number | null>(null);
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

  const toggleCategory = (id: number) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    const activeParent = categories?.find((item: any) => {
      const itemCategory = getCategoryFromSlug(item.slug);

      const hasActiveChild = item.children.some((child: any) => {
        const childCategory = getCategoryFromSlug(child.slug);
        return childCategory === activeCategory;
      });

      return itemCategory === activeCategory || hasActiveChild;
    });

    if (activeParent) {
      setOpenCategory(activeParent.id);
    }
  }, [activeCategory, categories]);

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

        <div
          className={`flex flex-col gap-y-2 ${
            categories?.length > 0
              ? "h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-secendry scrollbar-track-gray-250"
              : ""
          }`}
        >
          {categories?.length > 0 ? (
            categories.map((item: any) => {
              const itemCategory = getCategoryFromSlug(item.slug);

              const hasActiveChild = item.children.some((child: any) => {
                const childCategory = getCategoryFromSlug(child.slug);
                return childCategory === activeCategory;
              });

              const isParentActive =
                itemCategory === activeCategory || hasActiveChild;

              const shouldBeOpen = openCategory === item.id;

              return (
                <div key={item.id} className="flex flex-col">
                  <div
                    className={`flex items-center justify-between ${
                      isParentActive || shouldBeOpen
                        ? "bg-secendry text-white font-bold"
                        : "bg-white/50 text-blue-1050"
                    } hover:text-white hover:bg-secendry transition-all duration-300`}
                  >
                    <div
                      onClick={() => {
                        const newParams = new URLSearchParams(
                          item.slug.split("?")[1],
                        );

                        const category = newParams.get("category");

                        if (category) updateQuery("category", category);
                      }}
                      className="flex-1 p-2 flex items-center gap-x-2 cursor-pointer"
                    >
                      <span>{item.name}</span>
                    </div>

                    {item.children.length > 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCategory(item.id);
                        }}
                        className="p-2"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform duration-300 ${
                            shouldBeOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 mt-1 ${
                      shouldBeOpen
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.children.map((child: any) => {
                      const childCategory = getCategoryFromSlug(child.slug);
                      const isChildActive = childCategory === activeCategory;

                      return (
                        <div
                          key={child.id}
                          onClick={() => router.push(child.slug)}
                          className={`p-1.5 ps-3 cursor-pointer transition-all duration-300 my-0.5 ${
                            isChildActive
                              ? "bg-white/50 text-secendry"
                              : "hover:bg-white/50"
                          }`}
                        >
                          {child.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center rounded-md bg-white/50 py-6">
              <span className="font-peyda-400 text-sm text-slate-500">
                دسته‌بندی‌ای یافت نشد
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="py-[18px] flex flex-col gap-y-[18px]">
        <span className="block font-peyda-600 text-sm xl:text-lg text-blue-1050">
          تگ ها
        </span>

        <div
          className={`flex flex-col gap-y-2 ${
            tags?.length > 0
              ? "h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-secendry scrollbar-track-gray-250"
              : "pb-4"
          }`}
        >
          {tags?.length > 0 ? (
            tags.map((item: any) => {
              const isActive = activeTag === String(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    updateQuery("tag_ids", String(item.id));
                  }}
                  className={`p-2 cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-secendry text-white font-bold"
                      : "bg-white/50 text-blue-1050 hover:bg-secendry hover:text-white"
                  }`}
                >
                  {item.name}
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center rounded-md bg-white/50 py-6">
              <span className="font-peyda-400 text-sm text-slate-500">
                تگی یافت نشد
              </span>
            </div>
          )}
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
