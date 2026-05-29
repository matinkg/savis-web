"use client";

import InstagramPosts from "@/components/_modules/instagram";
import PageBannerWithGradient from "@/components/_templates/banner/banner-gradient";
import BannerPagesSkeleton from "@/components/_templates/tailwind-css-skeleton/banner-pages";
import { settingKeysObject } from "@/configs/constants";
import { request } from "@/configs/HTTPService";
import { useFetchData } from "@/helper";
import React, { useEffect, useState } from "react";

export default function AboutUs() {
  const [data, setData] = useState<any>(null);

  useEffect(()=>{
    request("/api/v1/aboutus").then((res)=>{
      setData(res?.data);
    })
  }, [])

  return (
    <>
      {!data ? (
        <BannerPagesSkeleton />
      ) : (
        <PageBannerWithGradient
          imgUrl={data?.banner?.image_1 ?? ""}
          subTitle={data?.banner?.summary ?? ""}
          title={data?.banner?.title_2 ?? ""}
          isBlackText={false}
        />
      )}
      {/* banner  */}

      <section className="mx-auto mt-10 w-[91.12%] lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        <div className="mx-auto mb-10 flex flex-col items-center gap-[18px] lg:mb-[60px] lg:w-[760px] lg:gap-y-6">
          <h1 className="font-peyda-600 text-2xl lg:text-[38px]">
            {data?.post?.title_1}
          </h1>

          <p className="text-center font-peyda-400 lg:text-xl">
           {data?.post?.summary}
          </p>
        </div>

        <div className="my-10 grid grid-cols-2 gap-4 gap-x-2 lg:my-[60px] lg:grid-cols-4 lg:gap-6">
          {data?.category?.map((item: any) => (
            <>
              <div
                className="backStyle content group h-[240px] lg:h-[395px]"
                style={{
                  background: `
                  linear-gradient(180deg, rgba(0, 0, 0, 0) 28%, #000000 100%), url(${
                    item?.image_1 ? item?.image_1 : ""
                  })
`,
                }}
                key={item?.id}
              >
                <div className="content-overlay"></div>
                {/* <img
                  src={item?.img}
                  alt=" posts"
                  className="   h-full w-full content-image"
                /> */}

                <div className="transition-special absolute bottom-0 left-0 right-0 z-10 mx-auto flex flex-col items-center group-hover:hidden">
                  <div className="flex-center mb-4">
                    <img src="/images/aboutus/fi_10473841.svg" alt="" />
                  </div>
                  <p className="pb-6 font-peyda-600 text-sm text-white xl:text-lg 2xl:text-2xl">
                    {item?.title_1}
                  </p>
                </div>
                <div className="content-details fadeIn-bottom">
                  <div className="flex-center mb-4">
                    <img src="/images/aboutus/fi_10473841.svg" alt="" />
                  </div>
                  <p className="pb-6 font-peyda-600 text-sm text-white xl:text-lg 2xl:text-2xl">
                    {item?.title_1}
                  </p>
                  <h3 className="content-title font-peyda-400 text-xs text-white lg:text-sm">
                    {item?.summary}
                  </h3>
                </div>
              </div>
            </>
          ))}
        </div>

        <InstagramPosts className="hidden md:grid my-10 w-full lg:my-[60px]" />
      </section>
    </>
  );
}
