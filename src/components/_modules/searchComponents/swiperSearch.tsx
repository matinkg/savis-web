import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArrowLeftlessLine from "@/public/icons/arrowLeftlessLine";
import Link from "next/link";

type SwiperSearchProps = {
  children: ReactNode;
  data: any;
  onItemClick: (term: string) => void;
};

export default function SwiperSearch({
  children,
  data,
  onItemClick,
}: SwiperSearchProps) {
  return (
    <>
      <div className="flex flex-col">
        <>{children}</>

        <div className="flex items-center">
          <button className="swiper-button-next_search flex-center h-8 w-8 bg-white text-slate-1000 lg:bg-secendry lg:text-white">
            <ArrowLeftlessLine className="h-[18px] w-[18px]" />
          </button>

          <Swiper
            slidesPerView={9}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 8,
              },
              786: {
                slidesPerView: 3,
                spaceBetween: 8,
              },

              1024: {
                slidesPerView: 4,
                spaceBetween: 8,
              },

              1440: {
                slidesPerView: 6,
                spaceBetween: 8,
              },
              1800: {
                slidesPerView: 9,
                spaceBetween: 8,
              },
            }}
            spaceBetween={8}
            loop={true}
            rewind={true}
            navigation={{
              nextEl: ".swiper-button-next_search",
              prevEl: ".swiper-button-prev_search",
            }}
            modules={[Navigation]}
            className="my-6"
          >
            {data?.map((item: any, index: any) => (
              <SwiperSlide key={index}>
                  <button
                    onClick={() => onItemClick(item.name)}
                    className="flex-center h-8 w-full cursor-pointer gap-x-1.5 border border-solid border-white lg:border-black px-3 rounded-md"
                  >
                    <span className="font-peyda-400 text-xs text-white lg:text-sm lg:text-black">
                      {item?.name}
                    </span>
                    <ArrowLeftlessLine className="h-[18px] w-[18px] rotate-180 text-white lg:text-slate-1000" />
                  </button>
              
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev_search flex-center h-8 w-8 bg-white text-slate-1000 lg:bg-secendry lg:text-white">
            <ArrowLeftlessLine className="h-[18px] w-[18px] rotate-180" />
          </button>
        </div>
      </div>
    </>
  );
}
