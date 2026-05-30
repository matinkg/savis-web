"use client";
import FrequentlyAskedQuestions from "@/components/_modules/frequentlyAskedQuestions";
import InstagramPosts from "@/components/_modules/instagram";
import PageBannerWithGradient from "@/components/_templates/banner/banner-gradient";
import ContactusForm from "@/components/_templates/contactus";
import BannerPagesSkeleton from "@/components/_templates/tailwind-css-skeleton/banner-pages";
import { useFetch } from "@/configs/HTTPService";

import React from "react";

export default function Contactus() {
  const { data: settingData, isLoading: settingLoading } =
    useFetch<any>("/api/v1/contact-us");

  return (
    <>
      {/* banner  */}
      {settingLoading ? (
        <BannerPagesSkeleton />
      ) : (
        <PageBannerWithGradient
          imgUrl={settingData?.banenr?.image_1 ?? ""}
          subTitle={settingData?.banenr?.summary ?? ""}
          title={settingData?.banenr?.title_1 ?? ""}
          isBlackText={false}
        />
      )}
      {/* banner  */}

      <section className="mx-auto mt-6 w-[91.12%] lg:mt-[32px] lg:w-[91.67%] 4xl:w-[85%]">
        <div className="mx-auto mb-8 flex flex-col items-center gap-[12px] lg:mb-[40px] lg:w-[90%] lg:gap-y-4">
          <h1 className="font-peyda-600 text-2xl lg:text-[32px]">
            فرم تماس با ما
          </h1>

          <p className="text-center font-peyda-400 lg:text-lg">
            در تمام طول هفته با اشتیاق پاسخگوی شما هستیم، لطفا برای ارتباط با ما
            از طریق راه‌های ارتباطی یا کامل کردن فرم زیر اقدام بفرمایید.
          </p>
        </div>

        <ContactusForm />

        <FrequentlyAskedQuestions faq={settingData?.faq} />

        <InstagramPosts className="hidden md:grid my-8 w-full lg:my-[40px]" />
      </section>
    </>
  );
}
