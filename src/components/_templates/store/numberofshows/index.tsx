"use client";

import Button from "@/components/_modules/button";
import React from "react";
import usePageSizeOperation from "./hook/usePageSizeOperation";
const numberOfShowsArray = [9, 12, 18, 24];

export default function NumberOfShowsTemp() {
  const { handleFilterChange, pageSizeActive } = usePageSizeOperation();

  // -------------------------activeSize---------------------------
  const activeSize = pageSizeActive
    ? Number(pageSizeActive)
    : numberOfShowsArray[0];

  return (
    <div className="hidden items-center gap-x-3 lg:flex">
      <span className="font-peyda-600 text-base text-blue-1050">
        تعداد نمایش
      </span>

      <div className="flex-center gap-x-1.5">
        {numberOfShowsArray.map((item, index) => (
          <Button
            key={index}
            onClick={() => {
              handleFilterChange(item);
            }}
            className={`flex h-6 w-6 items-end justify-center px-1.5 font-peyda-600 ${
              item === activeSize
                ? "bg-primary text-white"
                : "bg-white text-blue-1050"
            } `}
          >
            <span className="text-sm">{item}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
