import React from "react";

export default function OffersProductsSkeleton() {
  return (
    <div className="mt-44 mb-32 mx-auto w-[91.12%] lg:w-[91.67%] 4xl:w-[85%] pb-5 lg:pb-[80px]">
      <div className="mb-10 flex justify-center">
        <div className="h-10 w-64 animate-pulse rounded-md bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 2xl:gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="w-full min-w-0 p-2 sm:p-3 md:p-4 lg:p-[14px]">
      <div className="flex h-full flex-col gap-y-3">
        <div className="relative aspect-[4/5] w-full animate-pulse overflow-hidden bg-gray-200" />

        <div className="flex justify-center">
          <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="flex justify-center">
          <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200" />
        </div>

        <div className="hidden gap-x-3 lg:flex">
          <div className="h-12 flex-1 animate-pulse rounded bg-gray-200" />
          <div className="h-12 w-12 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
