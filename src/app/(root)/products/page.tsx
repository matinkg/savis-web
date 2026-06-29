"use client";

import FilterIcon from "@/public/icons/filter";
import InstagramPosts from "@/components/_modules/instagram";
import Breadcrumb from "@/components/_templates/store/breadcrumb";
import CategorySwiper from "@/components/_templates/store/categorySwiper";
import Filter from "@/components/_templates/store/filter";
import MobilefilterMenu from "@/components/_templates/store/filter/MobilefilterMenu";
import ProductCard from "@/components/_templates/store/productCard";
import React, { useEffect, useRef, useState } from "react";
// import useOperation from "./hook/useOperation";
import PrimaryLoading from "@/components/_templates/loading/primaryLoading";
// import Pagination from "@/components/_modules/pagination";
import useInfiniteProducts from "./hook/useInfinitProducts";
import Spinner from "@/components/_modules/loading/spinner";

export default function Page() {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  // const { data, loading, currentPage, handlePageChange } = useOperation();
  const {
    pageData,
    products,
    loading: infiniteLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteProducts();

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      {infiniteLoading ? (
        <PrimaryLoading />
      ) : (
        <>
          {/* banner  */}
          <div
            className=" backStyle mb-10 mt-20 md:mt-14 flex items-center lg:mb-[60px] h-[300px] md:h-[550px] 2xl:h-[650px] 3xl:h-[950px]"
            style={{
              // backgroundImage: categories?.banner?.image
              //   ? `url(' ${categories?.banner?.image}')`
              //   : `url('/images/store/collection.png')`,

              backgroundImage: `url('${pageData?.category?.banner || "/images/store/collection.png"}')`,
            }}
          >
            <div className="mx-auto flex w-[91.12%] flex-col gap-y-10 lg:w-[91.67%] 4xl:w-[85%]">
              <h1 className="font-peyda-900 text-[44px] text-blue-1050 lg:font-peyda-600 lg:text-[85px] 2xl:text-[128px] mt-16 md:mt-0">
                {pageData?.category?.name}
              </h1>

              <CategorySwiper
                data={pageData?.categories?.length && pageData?.categories}
              />
            </div>
          </div>
          {/* banner  */}

          <section className="mx-auto w-[91.12%] lg:w-[91.67%] 4xl:w-[85%]">
            <Breadcrumb
              route={
                <span className="font-peyda-400 text-base text-blue-1050">
                  خانه/فروشگاه/
                  <span className="text-secendry">
                    {pageData?.category?.name}
                  </span>
                </span>
              }
            />

            <div className="mb-[60px] mt-10 flex flex-row-reverse lg:gap-x-6">
              <div className="hidden lg:block sticky top-40 self-start">
                <Filter
                  categories={pageData?.categories_list}
                  tags={pageData?.tags}
                />
              </div>
              <div className="flex flex-col gap-5 w-full">
                {products?.length > 0 ? (
                  <>
                    <div className="mx-auto grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-x-3 sm:gap-x-6 gap-y-8 w-full">
                      {products.map((item: any) => (
                        <ProductCard key={item.id} product={item} />
                      ))}
                    </div>

                    {/* {data?.products?.last_page > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={data.products.last_page}
                        onPageChange={handlePageChange}
                      />
                    )} */}
                    <div ref={loadMoreRef} className="h-10 w-full" />
                    {isFetchingNextPage && (
                      <div className="flex flex-col items-center gap-y-2 py-6">
                        <Spinner
                          type="source"
                          className="w-8 h-8 text-secendry"
                        />

                        <span className="font-peyda-400 text-slate-500">
                          در حال بارگذاری محصولات...
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center h-full">
                    <h2 className="font-peyda-600 text-3xl text-blue-1050">
                      محصولی یافت نشد
                    </h2>

                    <p className="mt-2 text-gray-500">
                      در حال حاضر محصولی در این دسته‌بندی وجود ندارد.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>

          <InstagramPosts className="hidden md:grid mx-auto my-10 w-[91.12%] lg:my-[60px] lg:w-[91.67%] 4xl:w-[85%]" />

          {!showFilterMenu && (
            <div
              onClick={() => setShowFilterMenu(true)}
              className="fixed bottom-0 left-0 right-0 flex w-full items-center justify-center bg-secendry p-4 text-white lg:hidden z-30"
            >
              <div className="flex items-center gap-x-1.5">
                <FilterIcon className="h-5 w-5" />
                <span className="font-peyda-400 text-sm">فیلتر</span>
              </div>
            </div>
          )}

          {showFilterMenu && (
            <MobilefilterMenu
              categories={pageData?.categories_list}
              tags={pageData?.tags}
              showFilterMenu={showFilterMenu}
              setShowFilterMenu={setShowFilterMenu}
            />
          )}
        </>
      )}
    </>
  );
}
