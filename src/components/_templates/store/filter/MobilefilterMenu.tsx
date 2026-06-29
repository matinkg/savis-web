"use client";

import React, { useEffect, useState } from "react";
import MultiRangeSlider from "../multiRangeSlider";
import Close from "@/public/icons/close";
import FilterIcon from "@/public/icons/filter";
import Button from "@/components/_modules/button";
import useFilterOperation from "./hook/useFilterOperation";
import { RotateCcw, ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type MobilefilterMenuProps = {
  categories: any;
  tags: any;
  setShowFilterMenu: (value: boolean) => void;
  showFilterMenu: boolean;
};

export default function MobilefilterMenu({
  categories,
  tags,
  setShowFilterMenu,
  showFilterMenu,
}: MobilefilterMenuProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get("tag_ids");
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const toggleCategory = (id: number) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    router.push(`${pathname}?${params.toString()}`);
  };
  const activeCategory = searchParams.get("category");
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [selectedTag, setSelectedTag] = useState(activeTag);
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

  useEffect(() => {
    if (showFilterMenu) {
      setSelectedCategory(activeCategory);
      setSelectedTag(activeTag);
    }
  }, [showFilterMenu, activeCategory, activeTag]);

  useEffect(() => {
    const activeParent = categories?.find((item: any) => {
      const itemCategory = getCategoryFromSlug(item.slug);

      const hasActiveChild = item.children.some((child: any) => {
        const childCategory = getCategoryFromSlug(child.slug);
        return childCategory === selectedCategory;
      });

      return itemCategory === selectedCategory || hasActiveChild;
    });

    if (activeParent) {
      setOpenCategory(activeParent.id);
    }
  }, [selectedCategory, categories]);

  const handleResetAll = () => {
    resetFilters();
    router.replace(pathname);
  };

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

          <div className="py-[18px] flex flex-col gap-y-[18px]">
            <span className="block font-peyda-600 text-sm xl:text-lg text-blue-1050">
              دسته بندی ها
            </span>

            {categories?.length > 0 ? (
              <div className="flex flex-col gap-y-2 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-secendry scrollbar-track-gray-250">
                {categories.map((item: any) => {
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
                        }`}
                      >
                        <div
                          onClick={() => {
                            const newParams = new URLSearchParams(
                              item.slug.split("?")[1],
                            );

                            const category = newParams.get("category");

                            if (category) updateQuery("category", category);
                          }}
                          className="flex-1 p-2 cursor-pointer"
                        >
                          {item.name}
                        </div>

                        {item.children.length > 0 && (
                          <button
                            type="button"
                            onClick={() => toggleCategory(item.id)}
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
                        className={`overflow-hidden transition-all duration-300 ${
                          shouldBeOpen
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {item.children.map((child: any) => {
                          const childCategory = getCategoryFromSlug(child.slug);
                          const isChildActive =
                            childCategory === activeCategory;

                          return (
                            <div
                              key={child.id}
                              onClick={() => router.push(child.slug)}
                              className={`p-2 ps-4 cursor-pointer ${
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
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-lg bg-white/50 py-6 text-center">
                <span className="font-peyda-400 text-sm text-gray-500">
                  دسته‌بندی‌ای یافت نشد
                </span>
              </div>
            )}
          </div>

          <div className="py-[18px] flex flex-col gap-y-[18px]">
            <span className="block font-peyda-600 text-sm xl:text-lg text-blue-1050">
              تگ ها
            </span>

            {tags?.length > 0 ? (
              <div className="flex flex-col gap-y-2 max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-secendry scrollbar-track-gray-250">
                {tags.map((item: any) => {
                  const isActive = activeTag === String(item.id);

                  return (
                    <div
                      key={item.id}
                      onClick={() => updateQuery("tag_ids", String(item.id))}
                      className={`p-2 cursor-pointer transition-all duration-300 ${
                        isActive
                          ? "bg-secendry text-white font-bold"
                          : "bg-white/50 text-blue-1050 hover:bg-secendry hover:text-white"
                      }`}
                    >
                      {item.name}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-center justify-center rounded-lg bg-white/50 py-6 text-center">
                <span className="font-peyda-400 text-sm text-gray-500">
                  تگی یافت نشد
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center gap-x-3 border-t border-[#1E1E1E14] bg-gray-250 p-4">
          <Button
            onClick={handleResetAll}
            className="flex h-11 w-11 group bg-secendry items-center justify-center text-white transition-all active:scale-95"
          >
            <RotateCcw className="h-5 w-5 group-hover:-rotate-180 transition-all duration-500" />
          </Button>

          <Button
            className="flex-1 bg-secendry py-3 font-peyda-500 text-sm text-white"
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());

              if (selectedCategory) {
                params.set("category", selectedCategory);
              } else {
                params.delete("category");
              }

              if (selectedTag) {
                params.set("tag_ids", selectedTag);
              } else {
                params.delete("tag_ids");
              }

              handleFilterChange();

              router.push(`${pathname}?${params.toString()}`);

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
