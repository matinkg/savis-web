"use client";

import Button from "@/components/_modules/button";
import ArrowLeft from "@/public/icons/arrowLeft";
import VerticalCard from "@/components/_modules/verticalCard";
import HorizontalCard from "@/components/_modules/horizontalCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import AutoPlaySwipr from "@/components/_modules/autoplaySwiper";
import AutoPlaySwipr from "@/components/_modules/autoplaySwiper";
import Calender from "@/public/icons/calender";

import ImageIcon from "@/public/icons/image";
import { useFetchData } from "@/helper";
import PageBanner from "@/components/_templates/banner";
import PrimaryLoading from "@/components/_templates/loading/primaryLoading";

export default function Blog() {
  const { data, loading } = useFetchData<any>("/api/v1/blog");

  const home_BannerData = data?.banenr || [];
  const firstCat = data?.firstCat || [];
  const secondCat = data?.secondCat || [];
  const specialPost = data?.specialPost || null;
  const posts = data?.posts || [];

  return (
    <>
      {loading ? (
        <PrimaryLoading />
      ) : (
        <>
          <PageBanner
            imgUrl={home_BannerData?.image_1 ?? ""}
            title={home_BannerData?.title_2 ?? ""}
            subTitle={home_BannerData?.title_3 ?? ""}
            isBlackText={true}
          />

          <section className="mx-auto mt-10 w-[91.12%] lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
            <div className="mb-10 w-full lg:mb-[60px]">
              <h2 className="mb-10 text-center font-peyda-600 text-2xl text-blue-1050 lg:text-start lg:text-[32px]">
                {firstCat?.namne_2}
              </h2>
              <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-10">
                {firstCat?.posts && (
                  <div className="relative lg:col-span-6">
                    {firstCat?.posts[0]?.image_1 ? (
                      <img
                        src={firstCat?.posts[0]?.image_1}
                        alt=""
                        className="aspect-[1/0.7] object-cover h-[422px] w-full lg:h-full"
                      />
                    ) : (
                      <ImageIcon className="w-64 h-64 text-primary" />
                    )}

                    <div className="w-full absolute bottom-0 space-y-[18px] bg-[#1E1E1E80] p-4 text-white backdrop-blur-2xl lg:p-6">
                      <div className="flex w-full justify-between">
                        <h3 className="font-peyda-600 text-lg leading-8 tracking-wide lg:text-2xl">
                          {firstCat?.posts[0]?.title_1}
                        </h3>

                        <div className="hidden items-center justify-between gap-x-3 bg-white/50 p-3 text-blue-1050 lg:flex">
                          <div className="flex items-start gap-x-2">
                            <Calender className="h-[18px] w-[18px]" />

                            <span className="font-peyda-500">
                              {
                                new Date(firstCat?.posts[0]?.created_at ?? "")
                                  ?.toLocaleString("fa-IR")
                                  .split(",")[0]
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: firstCat?.posts[0]?.summary,
                        }}
                        className="line-clamp-5 font-peyda-400 text-xs tracking-wide lg:line-clamp-none lg:text-base"
                      ></p>

                      <Link
                        href={`/blog/${firstCat?.posts[0]?.slug}`}
                        className="hidden items-center gap-x-2 font-peyda-400 lg:flex lg:text-lg"
                      >
                        <span>ادامه مطلب</span>

                        <ArrowLeft className="h-6 w-6" />
                      </Link>

                      <div className="flex items-center justify-center gap-x-3 bg-white/50 p-3 text-blue-1050 lg:hidden">
                        <div className="flex items-start gap-x-2 text-xs lg:text-sm">
                          <Calender className="h-[18px] w-[18px]" />

                          <span className="font-peyda-500">
                            {
                              new Date(firstCat?.posts[0]?.created_at ?? "")
                                ?.toLocaleString("fa-IR")
                                .split(",")[0]
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col gap-y-6 lg:col-span-4">
                  {firstCat?.posts
                    ?.slice(1, 4)
                    .map((item: any) => (
                      <HorizontalCard item={item} key={item?.id} />
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-10 w-full lg:mt-[60px]">
              <h2 className="mb-10 text-center font-peyda-600 text-2xl text-blue-1050 lg:text-start lg:text-[32px]">
                {secondCat?.name_2}
              </h2>

              {secondCat?.posts && <AutoPlaySwipr posts={secondCat?.posts} />}
            </div>

            <div
              style={{
                background: `linear-gradient(-90deg, #000000 0%, rgba(0, 0, 0, 0) 51.5%),
    url('${specialPost?.image_1 ?? ""}') `,
                backgroundPosition: "left",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="w-full h-[392px] mt-[60px] flex flex-col justify-center px-4 lg:px-[60px]"
            >
              <div className="flex flex-col justify-center gap-y-4 lg:w-[511px]">
                <h2 className="font-peyda-800 text-[32px] text-white lg:font-peyda-600 lg:text-[58px]">
                  {specialPost?.title_1 ?? ""}
                </h2>
                <p className="font-peyda-500 text-sm text-white lg:text-lg">
                  {specialPost?.summary ?? ""}
                </p>

                <Button className="w-fit bg-white px-3 py-2 text-blue-1050 lg:px-4 lg:py-3">
                  <Link
                    href={"/blog/" + specialPost?.slug}
                    className="flex items-center gap-x-2 font-peyda-400 text-sm lg:text-lg"
                  >
                    <span>خواندن مطلب</span>

                    <ArrowLeft className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="mt-10 pb-16 lg:mt-[60px]">
              <Swiper
                loop
                rewind
                slidesPerView={4}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                    // spaceBetween: 50,
                  },
                  425: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                  1440: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                  },
                }}
              >
                {posts?.map((item: any) => (
                  <SwiperSlide key={item?.id}>
                    <VerticalCard item={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </section>
        </>
      )}
    </>
  );
}
