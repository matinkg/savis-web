"use client";

import FilterIcon from "@/public/icons/filter";
import InstagramPosts from "@/components/_modules/instagram";
import Breadcrumb from "@/components/_templates/store/breadcrumb";
import CategorySwiper from "@/components/_templates/store/categorySwiper";
import Filter from "@/components/_templates/store/filter";
import MobilefilterMenu from "@/components/_templates/store/filter/MobilefilterMenu";
import ProductCard from "@/components/_templates/store/productCard";
import React, { useState } from "react";
import useOperation from "./hook/useOperation";
import PrimaryLoading from "@/components/_templates/loading/primaryLoading";
import Pagination from "@/components/_modules/pagination";

export default function Page() {
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const { data, loading, currentPage, handlePageChange } = useOperation();

  return (
    <>
      {loading ? (
        <PrimaryLoading />
      ) : (
        <>
          {/* banner  */}
          <div
            className=" backStyle mb-10 flex items-center lg:mb-[60px]"
            style={{
              // backgroundImage: categories?.banner?.image
              //   ? `url(' ${categories?.banner?.image}')`
              //   : `url('/images/store/collection.png')`,

              backgroundImage: `url('${data?.category?.banner || "/images/store/collection.png"}')`,
            }}
          >
            <div className="mx-auto flex w-[91.12%] flex-col gap-y-10 lg:w-[91.67%] 4xl:w-[85%]">
              <h1 className="font-peyda-900 text-[44px] text-blue-1050 lg:font-peyda-600 lg:text-[85px] 2xl:text-[128px]">
                {data?.category?.name}
              </h1>

              <CategorySwiper
                data={data?.categories?.length && data?.categories}
              />
            </div>
          </div>
          {/* banner  */}

          <section className="mx-auto w-[91.12%] lg:w-[91.67%] 4xl:w-[85%]">
            <Breadcrumb
              route={
                <span className="font-peyda-400 text-base text-blue-1050">
                  خانه/فروشگاه/
                  <span className="text-blue-1000">{data?.category?.name}</span>
                </span>
              }
            />

            <div className="mb-[60px] mt-10 flex lg:gap-x-6">
              <div className=" hidden lg:block">
                <Filter />
              </div>
              <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
                {data?.products?.data?.map((item: any) => (
                  <ProductCard key={item?.id} product={item} />
                ))}
              </div>
              {data?.products?.last_page > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={data?.products?.last_page}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          </section>

          <InstagramPosts className="mx-auto my-10 w-[91.12%] lg:my-[60px] lg:w-[91.67%] 4xl:w-[85%]" />

          {!showFilterMenu && (
            <div
              onClick={() => setShowFilterMenu(true)}
              className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-center bg-secendry p-4 text-white lg:hidden z-50"
            >
              <div className="flex items-center gap-x-1.5">
                <FilterIcon className="h-5 w-5" />
                <span className="font-peyda-400 text-sm">فیلتر</span>
              </div>
            </div>
          )}

          {showFilterMenu && (
            <MobilefilterMenu
              showFilterMenu={showFilterMenu}
              setShowFilterMenu={setShowFilterMenu}
            />
          )}
        </>
      )}
    </>
  );
}
