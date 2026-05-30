"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation";

export default function CategorySwiper({ data }: any) {
  const [showCategory, setShowCategory] = useState();
  const router = useRouter(); // دسترسی به router

  const [active, setActive] = useState();
  const handleCategoryClick = (category: string) => {
    router.push(category);
  };

  if (!data?.length) return;
  return (
    <>
      <div className="hidden lg:flex items-center w-[750px] xl:w-[900px]">
        <Swiper
          slidesPerView={6}
          breakpoints={{
            1024: {
              slidesPerView: 4,
              spaceBetween: 8,
            },
            1440: {
              slidesPerView: 6,
              spaceBetween: 8,
            },
          }}
          navigation={{
            nextEl: ".swiper-button-next_store",
            prevEl: ".swiper-button-prev_store",
          }}
          modules={[Navigation]}
        >
          {data?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <div
                onClick={() => handleCategoryClick(item.slug)} 
                className=" bg-gray-250 text-blue-1050 py-2 px-2 2xl:px-3 flex-center cursor-pointer transition-all duration-300 hover:bg-secendry  hover:text-white"
              >
                <span className="font-peyda-600 text-sm ">{item?.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex-center gap-x-4">
          <button className="swiper-button-next_store">
            <svg
              className="w-6 h-6"
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
          <button className="swiper-button-prev_store">
            <svg
              className="w-6 h-6"
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
    </>
  );
}
