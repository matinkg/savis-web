"use client";

import DropDownMenuCustomize from "@/components/_modules/dropDownMenu/dropDownMenuCustomize";
import InstagramPosts from "@/components/_modules/instagram";
import React from "react";
import Location from "@/public/icons/location";
import WorkTimeComponents from "@/components/_templates/branch/workTime";
import Phone from "@/public/icons/phone";
import Clock from "@/public/icons/clock";
import Mobile from "@/public/icons/mobile";
import { useFetchData } from "@/helper";
import { settingKeysObject } from "@/configs/constants";
import PageBannerWithGradient from "@/components/_templates/banner/banner-gradient";
import BannerPagesSkeleton from "@/components/_templates/tailwind-css-skeleton/banner-pages";

export default function Branches() {
  const { data: settingData, loading: settingLoading } = useFetchData<any>(
    "/api/v1/sitesetting"
  );
  const { data, loading: branchesLOading } =
    useFetchData<any>("/api/v1/branches");

  const home_BannerData = data?.banner || [];

  console.log(home_BannerData, data?.banner);

  return (
    <>
      {/* banner  */}

      {settingLoading ? (
        <BannerPagesSkeleton />
      ) : (
        <PageBannerWithGradient
          imgUrl={home_BannerData?.image_1 ?? ""}
          subTitle={home_BannerData?.title_2 ?? ""}
          title={home_BannerData?.title_1 ?? ""}
          isBlackText={false}
        />
      )}
      {/* banner  */}

      <section className="mx-auto mt-10 w-[91.12%] lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        <h1 className="text-center font-peyda-600 text-2xl text-blue-1050 lg:text-[32px]">
          شعب ساویس
        </h1>
        <div className="mb-[80px] mt-[60px] lg:mb-[120px] lg:mt-[80px]">
          <div className="hidden w-full space-y-6 lg:block">
            {data?.branches?.map((item: any, index: number) => (
              <div
                key={index}
                className="grid w-full grid-cols-4 gap-6 bg-gray-250 p-4 lg:p-6"
              >
                <div>
                  <div className="flex-center h-full w-full">
                    <iframe
                      className="h-full w-full"
                      src={`https://maps.google.com/maps?q=${item?.lat},${item?.long}&z=15&output=embed`}
                      style={{ border: "0" }}
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>

                <div className="col-span-2">
                  <span className="block text-center font-peyda-600 text-2xl text-blue-1050">
                    {item?.name}
                  </span>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center gap-y-2 bg-white p-6 font-peyda-400 text-lg text-blue-1050">
                      <Phone className="h-6 w-6" />
                      <span className="block text-center">
                        {item?.mobile_number}
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-y-2 bg-white p-6 font-peyda-400">
                      <Location className="h-6 w-6" />
                      <span
                        className="block text-center"
                        dangerouslySetInnerHTML={{ __html: item?.address }}
                      ></span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-y-2 bg-white p-6 font-peyda-400">
                      <Clock className="h-6 w-6" />
                      {/* <WorkTimeComponents work_time={item?.work_time} /> */}
                      {item?.work_time}
                    </div>
                    <div className="flex flex-col items-center justify-center gap-y-2 bg-white p-6 font-peyda-400">
                      <Mobile className="h-6 w-6" />
                      <span className="block text-center">
                        {item?.phone_number}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <img
                    src={item?.image ? item?.image : ""}
                    alt=""
                    className="h-full w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* in mobile mode  */}

          <div className="block lg:hidden">
            {data?.branches?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex w-full flex-col items-center px-4 py-6"
              >
                <img
                  src={item?.image ? item?.image : ""}
                  alt=""
                  className="aspect-[1/0.7]"
                />

                <div className="flex w-full flex-col gap-y-[18px] pt-6">
                  <span className="block text-center font-peyda-600 text-lg text-blue-1050 md:text-xl">
                    {item?.name}
                  </span>

                  {/* ---------------------- content----------------------- */}

                  <DropDownMenuCustomize title="نمایش اطلاعات">
                    <div className="space-y-6">
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="flex flex-col items-center justify-center gap-y-2 bg-white p-6 font-peyda-400 text-xs text-blue-1050 md:text-sm">
                          <Phone className="h-[18px] w-[18px] md:h-6 md:w-6" />
                          <span className="block text-center">
                            {item?.phone_number}
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-y-2 bg-white p-6 font-peyda-400 text-xs md:text-sm">
                          <Location className="h-[18px] w-[18px] md:h-6 md:w-6" />
                          <span
                            className="block text-center"
                            dangerouslySetInnerHTML={{ __html: item?.address }}
                          ></span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-y-2 bg-white p-6 font-peyda-400 text-xs md:text-sm">
                          <Clock className="h-[18px] w-[18px] md:h-6 md:w-6" />
                          {/* <WorkTimeComponents work_time={item?.work_time} /> */}
                          {item?.work_time}
                        </div>
                        <div className="flex flex-col items-center justify-center gap-y-2 bg-white p-6 font-peyda-400 text-xs md:text-sm">
                          <Mobile className="h-[18px] w-[18px] md:h-6 md:w-6" />
                          <span className="block text-center">
                            {item?.mobile_number}
                          </span>
                        </div>
                      </div>
                      <div className="flex-center h-full w-full">
                        <iframe
                          className="h-full w-full"
                          src={item?.map_url ? item?.map_url : ""}
                          style={{ border: "0" }}
                          loading="lazy"
                        ></iframe>
                      </div>
                    </div>
                  </DropDownMenuCustomize>
                </div>
              </div>
            ))}
          </div>
        </div>
        <InstagramPosts className="my-10 w-full lg:my-[60px]" />
      </section>
    </>
  );
}
