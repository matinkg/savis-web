"use client";

import Link from "next/link";
import ArrowLeft from "@/public/icons/arrowLeft";
import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Calender from "@/public/icons/calender";

export default function AutoPlaySwipr({ posts }: any) {
  const [activeIndex, setActiveIndex] = useState(0);
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLDivElement | null>(null);

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty(
        "--progress",
        String(1 - progress)
      );
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  const handleSlideChange = (swiper: any) => {
    setActiveIndex(swiper.realIndex);
  };

  const activePost = posts[activeIndex];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10">
      <div className="order-2 flex aspect-[1/0.7] h-full w-full flex-col bg-secendry px-4 py-5 text-white lg:order-1 lg:col-span-4 xl:px-6 xl:py-10">
        <div className="space-y-5">
          <h3 className="font-peyda-600 text-lg lg:text-2xl 2xl:text-3xl">
            {activePost?.title_1}
          </h3>
          <p
            className="font-peyda-400 text-xs leading-6 xl:text-base xl:!leading-8 2xl:text-lg"
            dangerouslySetInnerHTML={{ __html: activePost?.summary }}
          />
        </div>

        <div className="mt-auto flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Link
            href={`/blog/${activePost?.slug}`}
            className="flex items-center gap-x-2 font-peyda-400 text-sm lg:text-lg"
          >
            <span>ادامه مطلب</span>
            <ArrowLeft className="h-6 w-6" />
          </Link>

          <div className="flex items-center justify-center gap-x-3 bg-white/50 p-2 text-blue-1050 xl:p-3">
            <div className="flex items-start gap-x-2 text-xs lg:text-sm">
              <div>
                <Calender className="h-[18px] w-[18px]" />
              </div>
              <span className="font-peyda-500">
                {
                  new Date(activePost?.created_at ?? "")
                    ?.toLocaleString("fa-IR")
                    .split(",")[0]
                }
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="order-1 aspect-[1/0.7] relative lg:order-2 lg:col-span-6">
        <Swiper
          loop
          spaceBetween={10}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          onSlideChange={handleSlideChange}
          className="mySwiper"
        >
          {posts?.map((item: any) => (
            <SwiperSlide key={item?.id}>
              <div className="relative h-full w-full">
                <img
                  src={item?.image_1}
                  alt={item?.title_1}
                  className="h-full w-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}

          <div
            className="autoplay-progress absolute bottom-4 right-4"
            slot="container-end"
          >
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>

          <div className="swiper-button-prev !text-white"></div>
          <div className="swiper-button-next !text-white"></div>
        </Swiper>
      </div>
    </div>
  );
}
