import React from "react";
import ProductCardSkeleton from "../../productCard";

export default function HomeGiftsSkeleton() {
  return (
    <section
      role="status"
      className="animate-pulse mx-auto mb-[60px] w-[91.12%] lg:w-[91.67%] 4xl:w-[85%]"
    >
      <div className="w-full  flex justify-between items-start mb-8 mt-10 lg:my-[60px] border-b border-b-[#C8CECF] pb-5">
        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-200 w-40 "></div>

        <div className="flex-center gap-x-5 lg:gap-x-10">
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-200 w-20 "></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-200 w-20 "></div>
          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-200 w-20 "></div>
        </div>

        <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-200 w-40 "></div>
      </div>

      {/* content */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 2xl:gap-6">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </section>
  );
}
