"use client";

import FrequentlyAskedQuestions from "@/components/_modules/frequentlyAskedQuestions";

import EmploymentForm from "@/components/_templates/careerOpportunities/form";
import React, { useEffect, useState } from "react";

import { JobApplicationsContent } from "@/configs/constants";
import PageBannerWithGradient from "@/components/_templates/banner/banner-gradient";
import BannerPagesSkeleton from "@/components/_templates/tailwind-css-skeleton/banner-pages";
import { request } from "@/configs/HTTPService";

export default function JobOpportunities() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    request("/api/v1/jobOpportunities")
      .then((res) => {
        setData(res?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* banner  */}

      {loading ? (
        <BannerPagesSkeleton />
      ) : (
        <PageBannerWithGradient
          imgUrl={data?.banner?.image_1 ?? ""}
          subTitle={data?.banner?.title_2 ?? ""}
          title={data?.banner?.title_1 ?? ""}
          isBlackText={false}
        />
      )}

      {/* banner  */}

      <section className="mx-auto mt-10 w-[91.12%] text-blue-1050 lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        <div className="mx-auto mb-10 flex flex-col items-center gap-[18px] lg:mb-[60px] lg:w-[760px] lg:gap-y-6">
          <h2 className="font-peyda-600 text-2xl lg:text-[38px]">
            {data?.about?.title_1}
          </h2>

          <p
            className="text-center font-peyda-400 text-sm lg:text-lg"
            dangerouslySetInnerHTML={{ __html: data?.about?.body }}
          />
        </div>

        {/* ---------------------------------------- */}
        <div className="my-10 flex flex-col items-center gap-y-6 lg:my-[30px] lg:gap-y-10">
          <span className="font-peyda-400 text-lg text-blue-1050 lg:text-2xl">
            مزایای همکاری با نیسا
          </span>
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
            {JobApplicationsContent?.Advantages?.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-y-2 bg-third py-3 text-neutral-1000 lg:px-4 lg:py-8"
              >
                <img
                  src={item?.img}
                  alt=""
                  className="h-6 w-6 lg:h-[50px] lg:w-[50px]"
                />
                <span className="text-center font-peyda-400 text-xs lg:text-lg">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="my-10 flex flex-col items-center gap-y-6 lg:my-[30px] lg:gap-y-10">
          <span className="font-peyda-400 text-lg text-blue-1050 lg:text-2xl">
            فرصت های شغلی
          </span>
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
            {data?.jobs?.map((item: any, index: number) => (
              <div
                style={{
                  background: `linear-gradient(5deg, rgba(0,0,0,0.6) 100%, rgba(0,0,0,0.6) 100%),url("${item?.image}")`,
                }}
                key={index}
                className="flex-center backStyle h-[128px] py-3 text-white lg:h-[260px] lg:px-4 lg:py-8"
              >
                <span className="text-center font-peyda-600 text-lg lg:text-[32px]">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
          {/* <Button className="flex-center w-fit gap-x-2 bg-secendry px-5 py-3 text-white">
            <span className="font-peyda-400 lg:text-lg">نمایش بیشتر</span>
            <Refresh className="h-6 w-6 text-white" />
          </Button> */}
        </div>
        {/* ---------------------------------------- */}

        <div className="mx-auto my-[60px] flex flex-col items-center gap-[18px] text-blue-1050 lg:mb-[60px] lg:mt-[120px] lg:w-[760px] lg:gap-y-6">
          <h2 className="font-peyda-600 text-2xl lg:text-[38px]">
            فرم استخدام در نیسا
          </h2>

          <p className="text-center font-peyda-400 text-sm lg:text-lg">
            در تمام طول هفته با اشتیاق پاسخگوی شما هستیم، لطفا برای ارتباط با ما
            از طریق راه‌های ارتباطی یا کامل کردن فرم زیر اقدام بفرمایید.
          </p>
        </div>

        <EmploymentForm jobs={data?.jobs} />

        <FrequentlyAskedQuestions />
      </section>
    </>
  );
}
