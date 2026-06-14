"use client";

import Button from "@/components/_modules/button";
import ArrowLeft from "@/public/icons/arrowLeft";
import Link from "next/link";
import React, { useEffect, useState } from "react";
var _ = require("lodash");
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import ProductCard from "@/components/_modules/productCard";
export default function HomeGifts({ gifts }: any) {
  const [active, setActive] = useState(gifts?.children[0]?.id);
  const [products, setProducts] = useState(gifts?.children[0]?.products);

  useEffect(() => {
    const prods = gifts?.children.find((g: any) => g.id === active);
    setProducts(prods?.products);
  }, [active]);

  return (
    <section className="relative mx-auto my-10 w-[91.12%] lg:my-[60px] lg:w-[91.67%] 4xl:w-[85%]">
      <div className="hidden w-full lg:block">
        <div className="grid w-full grid-cols-12 border-b border-solid border-b-[#C8CECF] child:pb-5">
          <div className="flex items-end col-span-2">
            <span className="font-peyda-800 text-2xl text-blue-1050 2xl:text-3xl">
              هدایا
            </span>
          </div>
          <div className="flex items-end justify-center gap-10 2xl:gap-x-28 col-span-7">
            {gifts?.children &&
              gifts?.children.map((item: any, index: any) => (
                <span
                  key={index + "AS"}
                  onClick={() => {
                    setActive(item?.id);
                  }}
                  className={`shrink-0 cursor-pointer font-peyda-500 text-xl 2xl:text-2xl ${
                    item?.id === active
                      ? "activeTab text-primary"
                      : "text-blue-1050"
                  }`}
                >
                  {item.name}
                </span>
              ))}
          </div>
          <div className="flex items-center justify-end gap-x-6 col-span-3">
            <Link href={gifts?.slug ?? "#"} className="bg-white p-2">
              <Button className="flex items-center gap-x-1 font-peyda-400 text-sm text-blue-1050 lg:px-2 lg:text-xl 2xl:text-lg">
                <span>نمایش همه</span>
                <ArrowLeft
                  className="h-4 w-4 lg:h-6 lg:w-6"
                />
              </Button>
            </Link>

            <div>
              <button className="swiper-button-next_gift">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.9101 20.67C8.7201 20.67 8.5301 20.6 8.3801 20.45C8.0901 20.16 8.0901 19.68 8.3801 19.39L14.9001 12.87C15.3801 12.39 15.3801 11.61 14.9001 11.13L8.3801 4.61C8.0901 4.32 8.0901 3.84 8.3801 3.55C8.6701 3.26 9.1501 3.26 9.4401 3.55L15.9601 10.07C16.4701 10.58 16.7601 11.27 16.7601 12C16.7601 12.73 16.4801 13.42 15.9601 13.93L9.4401 20.45C9.2901 20.59 9.1001 20.67 8.9101 20.67Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button className="swiper-button-prev_gift">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.9998 20.67C14.8098 20.67 14.6198 20.6 14.4698 20.45L7.94979 13.93C6.88979 12.87 6.88979 11.13 7.94979 10.07L14.4698 3.55C14.7598 3.26 15.2398 3.26 15.5298 3.55C15.8198 3.84 15.8198 4.32 15.5298 4.61L9.00979 11.13C8.52979 11.61 8.52979 12.39 9.00979 12.87L15.5298 19.39C15.8198 19.68 15.8198 20.16 15.5298 20.45C15.3798 20.59 15.1898 20.67 14.9998 20.67Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* content */}

        <Swiper
          slidesPerView={4}
          loop={true}
          rewind={true}
          navigation={{
            nextEl: ".swiper-button-next_gift",
            prevEl: ".swiper-button-prev_gift",
          }}
          modules={[Navigation]}
          className="mt-10 "
        >
          {products?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <ProductCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="block lg:hidden">
        <div className="flex w-full flex-col items-center gap-y-6 border-b border-solid border-b-[#C8CECF] child:pb-2">
          <div>
            <span className="font-peyda-800 text-2xl text-blue-1050 2xl:text-3xl">
              هدایا
            </span>
          </div>
          <div className="flex items-center justify-center gap-x-10">
            {products &&
              products.map((item: any, index: any) => (
                <span
                  key={index + "LK"}
                  onClick={() => {
                    setActive(item?.id);
                  }}
                  className={`cursor-pointer font-peyda-500 text-xl ${
                    item?.id === active
                      ? "activeTab text-primary"
                      : "text-blue-1050"
                  }`}
                >
                  {item.categoryName}
                </span>
              ))}
          </div>
        </div>

        {/* content */}

        <Swiper
          slidesPerView={1}
          loop={true}
          rewind={true}
          navigation={{
            nextEl: ".swiper-button-next_giftMobile",
            prevEl: ".swiper-button-prev_giftMobile",
          }}
          modules={[Navigation]}
          className="mt-10"
        >
          {Array.from({ length: Math.ceil(products?.length / 4) })?.map(
            (item, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-2 gap-4">
                  {products
                    ?.slice(index * 4, (index + 1) * 4)
                    .map((item: any, i: number) => (
                      <ProductCard key={i} product={item} />
                    ))}
                </div>
              </SwiperSlide>
            ),
          )}
        </Swiper>

        <div className="flex-center mt-6 gap-x-3">
          <button className="swiper-button-next_giftMobile">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.9101 20.67C8.7201 20.67 8.5301 20.6 8.3801 20.45C8.0901 20.16 8.0901 19.68 8.3801 19.39L14.9001 12.87C15.3801 12.39 15.3801 11.61 14.9001 11.13L8.3801 4.61C8.0901 4.32 8.0901 3.84 8.3801 3.55C8.6701 3.26 9.1501 3.26 9.4401 3.55L15.9601 10.07C16.4701 10.58 16.7601 11.27 16.7601 12C16.7601 12.73 16.4801 13.42 15.9601 13.93L9.4401 20.45C9.2901 20.59 9.1001 20.67 8.9101 20.67Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <Link href={gifts?.slug ?? "#"} className="bg-white p-2">
            <Button className="flex items-center gap-x-1 font-peyda-400 text-sm text-blue-1050 lg:px-4 lg:py-3 lg:text-lg">
              <span>نمایش همه</span>
              <ArrowLeft
                className="h-4 w-4 lg:h-6 lg:w-6"
              />
            </Button>
          </Link>
          <button className="swiper-button-prev_giftMobile">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.9998 20.67C14.8098 20.67 14.6198 20.6 14.4698 20.45L7.94979 13.93C6.88979 12.87 6.88979 11.13 7.94979 10.07L14.4698 3.55C14.7598 3.26 15.2398 3.26 15.5298 3.55C15.8198 3.84 15.8198 4.32 15.5298 4.61L9.00979 11.13C8.52979 11.61 8.52979 12.39 9.00979 12.87L15.5298 19.39C15.8198 19.68 15.8198 20.16 15.5298 20.45C15.3798 20.59 15.1898 20.67 14.9998 20.67Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
