"use client";

import DropDownMenu from "@/components/_modules/dropDownMenu";
import AgencyRequestForm from "@/components/_templates/agencyRequest";
import PageBannerWithGradient from "@/components/_templates/banner/banner-gradient";
import BannerPagesSkeleton from "@/components/_templates/tailwind-css-skeleton/banner-pages";
import { settingKeysObject } from "@/configs/constants";
import { useFetchData } from "@/helper";
import React from "react";

export default function AgencyRequest() {
  const { data: settingData, loading: settingLoading } = useFetchData<any>(
    "/api/v1/agencyRequest"
  );
  return (
    <>
      {/* banner  */}

      {settingLoading ? (
        <BannerPagesSkeleton />
      ) : (
        <PageBannerWithGradient
          imgUrl={settingData?.banner?.image_1 ?? ""}
          subTitle={settingData?.banner?.title_2 ?? ""}
          title={settingData?.banner?.title_1 ?? ""}
          isBlackText={false}
        />
      )}
      {/* banner  */}

      <section className="mx-auto mt-10 w-[91.12%] text-blue-1050 lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        <div className="mx-auto mb-10 flex flex-col items-center gap-[18px] lg:mb-[60px] lg:w-[760px] lg:gap-y-6">
          <h2 className="font-peyda-600 text-2xl lg:text-[38px]">
            اعطای نمایندگی
          </h2>

          <p className="text-center font-peyda-400 text-sm lg:text-lg">
            اعطای نمایندگی طلا فروشی خورده فروشی، فرصتی استثنایی برای افراد و
            کسب‌وکارها که علاقه‌مند به ورود به عرصه بازار طلا و جواهرات دارند.
            این نمایندگی به شما امکان می‌دهد تا به عنوان یک همکار رسمی، محصولات
            باکیفیت و متنوع طلا فروشی خورده فروشی را به مشتریان خود ارائه کنید و
            از سودآوری و موفقیت در این عرصه بهره‌مند شوید. با پشتیبانی و
            آموزش‌های لازم از سوی طلا فروشی، می‌توانید به یک نماینده موفق و
            معتبر تبدیل شوید و مشتریان خود را بهترین خدمات و محصولات را ارائه
            دهید.
          </p>
        </div>

        {/* ---------------------------------------- */}
        <div className="my-10 flex flex-col items-center gap-y-6 lg:my-[30px] lg:gap-y-10">
          <span className="font-peyda-400 text-lg text-blue-1050 lg:text-2xl">
            شرایط اعطایی نمایندگی به شرح زیر می باشد
          </span>
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
            {settingData?.terms?.posts?.map((item: any, index: any) => (
              <div
                key={index}
                className="flex-center bg-third py-3 text-neutral-1000 lg:px-4 lg:py-8"
              >
                <span className="text-center font-peyda-400 text-xs lg:text-lg">
                  {item.summary}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------------------------------------- */}

        <div className="mx-auto my-[60px] flex flex-col items-center gap-[18px] text-blue-1050 lg:mb-[60px] lg:mt-[120px] lg:w-[760px] lg:gap-y-6">
          <h2 className="font-peyda-600 text-2xl lg:text-[38px]">
            فرم اعطای نمایندگی{" "}
          </h2>

          <p className="text-center font-peyda-400 text-sm lg:text-lg">
            در تمام طول هفته با اشتیاق پاسخگوی شما هستیم، لطفا برای ارتباط با ما
            از طریق راه‌های ارتباطی یا کامل کردن فرم زیر اقدام بفرمایید.
          </p>
        </div>

        <AgencyRequestForm />

        <div className="my-[60px] flex flex-col items-center gap-y-6 lg:mb-[60px] lg:mt-[120px]">
          <span className="block font-peyda-600 text-2xl lg:text-[32px]">
            سوالات متداول
          </span>

          <div className="my-10 w-full space-y-5 lg:my-[60px]">
            {settingData?.faq?.map((item: any) => <DropDownMenu
              type="down"
              titleStyle="text-sm lg:text-lg"
              title={item.title_1}
              key={"ITEM_FAQ_AGENCY_ID" + item?.id}
              className="w-full bg-gray-250 p-2 py-3 font-peyda-600 text-sm text-blue-1050 lg:p-3 lg:py-[18px] lg:text-base"
            >
              <span className="font-peyda-400 text-xs lg:text-base">
                {item.summary}
              </span>
            </DropDownMenu>)}
          </div>
        </div>
      </section>
    </>
  );
}
