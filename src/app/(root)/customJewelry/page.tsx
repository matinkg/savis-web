"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import BannerPagesSkeleton from "@/components/_templates/tailwind-css-skeleton/banner-pages";
import PageBannerWithGradient from "@/components/_templates/banner/banner-gradient";
import { useFetch } from "@/configs/HTTPService";

export default function CustomJewelry() {
  const { data: settingData, isLoading: settingLoading } = useFetch<any>(
    "/api/v1/custom-jewelry",
  );
  const banner = settingData?.banner?.image_1;
  const gallery = settingData?.gallery;
  const steps = settingData?.steps;
  const features = settingData?.features;

  return (
    <>
      {settingLoading ? (
        <BannerPagesSkeleton />
      ) : (
        <PageBannerWithGradient
          imgUrl={banner ?? ""}
          subTitle={banner?.sub_title ?? ""}
          title={settingData?.title ?? ""}
          isBlackText={false}
        />
      )}

      <section className="mx-auto !mt-40 w-[91.12%] lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        <div className="mx-auto mb-10 flex flex-col items-center gap-[18px] lg:mb-[60px] lg:w-[760px] lg:gap-y-6">
          <h1 className="font-peyda-600 text-2xl lg:text-[38px]">
            {settingData?.intro?.title_1}
          </h1>

          <p className="text-center font-peyda-400 lg:text-xl">
            {settingData?.intro?.summary}
          </p>
        </div>

        <div>
          {steps?.map((item: any, index: number) => (
            <div
              key={index}
              className="my-10 grid grid-cols-1 gap-6 lg:my-[60px] lg:grid-cols-2"
            >
              <div className={index % 2 !== 0 ? "lg:order-2" : ""}>
                <img src={item?.image_1} alt="" className="aspect-[1/0.5]" />
              </div>

              <div
                className={`flex flex-col justify-center gap-y-6 ${
                  index % 2 !== 0 ? "lg:order-1" : ""
                }`}
              >
                <span className="font-peyda-600 text-[32px] text-blue-1050">
                  {item?.title_1}
                </span>

                <p className="font-peyda-400 text-lg text-blue-1050">
                  {item?.summary}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --------------------------------------- */}

        <div className="my-10 grid grid-cols-2 gap-6 lg:my-[60px] lg:grid-cols-4 2xl:gap-x-10">
          {features?.map((item: any) => (
            <div
              key={item?.id}
              className="flex flex-col items-center justify-center gap-y-4 bg-third py-4 text-neutral-1000 lg:gap-y-6 lg:py-10"
            >
              <img
                src={item?.image_1}
                alt=""
                className="h-[60px] w-[60px] lg:h-[120px] lg:w-[120px]"
              />
              <div className="flex flex-col items-center space-y-3 px-4 lg:px-6">
                <span className="block text-center font-peyda-600 text-base lg:text-2xl">
                  {item?.title_1}
                </span>
                <p className="text-center font-peyda-400 text-xs text-slate-1000/50 lg:text-base">
                  {item?.summary}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* --------------------------------------- */}

        <div className="mx-auto mb-10 flex flex-col items-center gap-[18px] lg:mb-[60px] lg:w-[760px] lg:gap-y-6">
          <h1 className="font-peyda-600 text-2xl lg:text-[32px]">
            {settingData?.order?.title_1}
          </h1>

          <p className="text-center font-peyda-400 text-sm lg:text-lg">
            {settingData?.order?.summary}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 lg:mt-10 lg:gap-[120px]">
            <div className="flex flex-col items-center text-[#4ED05F] lg:gap-y-6">
              <a href="" className="">
                <img
                  src="/images/customJewelry/whatsapp.png"
                  alt=""
                  className="h-[80px] w-[80px] object-contain lg:h-[80px] lg:w-[100px]"
                />
              </a>
              <span className="font-peyda-600 text-lg lg:text-xl">
                پیشتیبانی واتساپ
              </span>
              <a
                href=""
                className="font-peyda-600 text-sm lg:text-lg"
                style={{ direction: "ltr" }}
              >
                09005550492
              </a>
            </div>
            <div className="flex flex-col items-center text-[#6EBAE0] lg:gap-y-6">
              <a href="" className="">
                <img
                  src="/images/customJewelry/send-2.png"
                  alt=""
                  className="h-[80px] w-[80px] object-contain lg:h-[80px] lg:w-[100px]"
                />
              </a>
              <span className="font-peyda-600 text-lg lg:text-xl">
                پیشتیبانی تلگرام
              </span>
              <a href="" className="font-peyda-600 text-sm lg:text-lg">
                @nissa.support
              </a>
              <a
                href=""
                className="font-peyda-600 text-sm lg:text-lg"
                style={{ direction: "ltr" }}
              >
                09005550492
              </a>
            </div>
          </div>
        </div>
        {/* --------------------------------------- */}

        <div className="my-10 lg:my-[60px]">
          <span className="block font-peyda-600 text-2xl text-blue-1050 lg:text-[32px]">
            {settingData?.gallery_title}
          </span>

          <Swiper
            slidesPerView={4}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              425: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            loop={true}
            rewind={true}
            navigation={false}
            modules={[Navigation]}
            className="mt-6"
          >
            {gallery?.map((item: any, index: number) => (
              <SwiperSlide key={index}>
                <Link href={"/"}>
                  <img
                    src={item?.image_1}
                    alt="customizedProductsGallery"
                    className="aspect-square"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
