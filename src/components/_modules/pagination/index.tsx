"use client";
import React from "react";
import Button from "../button";
import ArrowLeft from "@/public/icons/arrowLeft";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="my-20 grid grid-cols-3">
      <div className="flex items-center justify-start">
        <Button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`flex items-center gap-x-1 border border-solid border-secendry bg-transparent p-2 font-peyda-400 text-sm ${
            currentPage === totalPages
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-secendry hover:bg-secendry hover:text-white"
          } lg:px-[18px] lg:py-3 lg:text-lg`}
        >
          <span>بعدی</span>
          <ArrowLeft className="h-[18px] w-[18px] rotate-180 lg:h-6 lg:w-6" />
        </Button>
      </div>

      <div
        className="flex items-center justify-center gap-x-2"
        style={{ direction: "ltr" }}
      >
        {pages.map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex-center h-[36px] w-[36px] gap-x-1 border border-solid px-3 font-peyda-400 text-sm ${
              page === currentPage
                ? "bg-secendry text-white border-secendry"
                : "bg-transparent text-secendry border-secendry hover:bg-secendry hover:text-white"
            } lg:h-[46px] lg:w-[46px] lg:px-[18px] lg:text-lg`}
          >
            {page}
          </Button>
        ))}
      </div>

      <div className="flex items-center justify-end">
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`flex items-center gap-x-1 border border-solid border-secendry bg-transparent p-2 font-peyda-400 text-sm ${
            currentPage === 1
              ? "text-gray-400 border-gray-300 cursor-not-allowed"
              : "text-secendry hover:bg-secendry hover:text-white"
          } lg:px-[18px] lg:py-3 lg:text-lg`}
        >
          <ArrowLeft className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
          <span>قبلی</span>
        </Button>
      </div>
    </div>
  );
}
