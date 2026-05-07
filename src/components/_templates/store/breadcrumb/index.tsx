"use client";
import SortIcon from "@/public/icons/sort";
import React from "react";
import Sort from "../sort";
import NumberOfShowsTemp from "../numberofshows";

export default function Breadcrumb({ route }: any) {
  return (
    <div className="flex items-center justify-between bg-gray-250 px-3 py-4 lg:p-[18px]">
      <div>{route}</div>
      <div className="flex items-center gap-x-10">
        <NumberOfShowsTemp />

        <div className="group relative flex items-center gap-x-2 cursor-pointer">
          <span className="hidden font-peyda-600 text-base text-blue-1050 lg:block">
            مرتب سازی بر اساس
          </span>

          <SortIcon className="h-6 w-6  text-blue-1050" />
          <Sort />
        </div>
      </div>
    </div>
  );
}
