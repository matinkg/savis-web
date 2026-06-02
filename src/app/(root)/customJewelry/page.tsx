"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import BannerPagesSkeleton from "@/components/_templates/tailwind-css-skeleton/banner-pages";
import PageBannerWithGradient from "@/components/_templates/banner/banner-gradient";
import { useFetch } from "@/configs/HTTPService";

const customJewelryOrder = [
  {
    id: "@#$1",
    title: `قابلیت سفارش با نقره یا طلا`,
    desc: `تلاش کردیم گالری‌های نیسا سرشار از آرامش و حس خوب برای شما باشند.`,
    img: `/images/customJewelry/1.png`,
  },
  {
    id: "@#$2",
    title: `قابلیت تعیین سایز و ابعاد`,
    desc: `تلاش کردیم گالری‌های نیسا سرشار از آرامش و حس خوب برای شما باشند.`,
    img: `/images/customJewelry/2.png`,
  },
  {
    id: "@#$3",
    title: `قابلیت سفارش ترکیبی`,
    desc: `تلاش کردیم گالری‌های نیسا سرشار از آرامش و حس خوب برای شما باشند.`,
    img: `/images/customJewelry/3.png`,
  },
  {
    id: "@#$4",
    title: `قابلیت سفارش طراحی نام`,
    desc: `تلاش کردیم گالری‌های نیسا سرشار از آرامش و حس خوب برای شما باشند.`,
    img: `/images/customJewelry/4.png`,
  },
];

const customizedProductsGallery = [
  {
    img: "/images/customJewelry/1-5.png",
    link: "",
  },
  {
    img: "/images/customJewelry/1-6.png",
    link: "",
  },
  {
    img: "/images/customJewelry/1-7.png",
    link: "",
  },
  {
    img: "/images/customJewelry/1-8.png",
    link: "",
  },
  {
    img: "/images/customJewelry/1-10.png",
    link: "",
  },
  {
    img: "/images/customJewelry/1-9.png",
    link: "",
  },
];

export default function CustomJewelry() {
  const { data: settingData, isLoading: settingLoading } = useFetch<any>(
    "/api/v1/custom-jewelry",
  );
  const banner = settingData?.banner.image_1;

  return (
    <>
      {/* banner  */}

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
      {/* banner  */}

      <section className="mx-auto !mt-40 w-[91.12%] lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        <div className="mx-auto mb-10 flex flex-col items-center gap-[18px] lg:mb-[60px] lg:w-[760px] lg:gap-y-6">
          <h1 className="font-peyda-600 text-2xl lg:text-[38px]">
            طراحی سفارشی
          </h1>

          <p className="text-center font-peyda-400 lg:text-xl">
            نیسا، به عنوان نخبه در طراحی منحصر به فرد، با ترکیب خلاقیت و هنر،
            هویت‌هایی استثنایی را ایجاد می‌کند.این گالری با دقت به جزئیات،
            هماهنگی با ارزش‌ها و نیازهای مشتریان، آثاری استثنایی و جذاب را به
            وجود می‌آورد. افتخار دارد که در جهان هنر و طراحی، نام خود را به
            عنوان نمادی از خلاقیت بی‌محدود و الهام‌بخش برجسته نماید .طراحان ما
            با تلفیق خلاقیت، نوآوری و توجه به جزئیات متفاوت ترین و محبوب ترین
            طرح ها را برای شما در نظر میگیرند از جمله تحلیل دقیق سفارش شما تا
            ارائه راهکارهای بصری منحصر به فرد، در هر مرحله از فرآیند می باشد
            نیسا، به عنوان نخبه در طراحی منحصر به فرد، با ترکیب خلاقیت و هنر،
            هویت‌هایی استثنایی را ایجاد می‌کند.این گالری با دقت به جزئیات،
            هماهنگی با ارزش‌ها و نیازهای مشتریان، آثاری استثنایی و جذاب را به
            وجود می‌آورد. افتخار دارد که در جهان هنر و طراحی، نام خود را به
            عنوان نمادی از خلاقیت بی‌محدود و الهام‌بخش برجسته نماید .
          </p>
        </div>

        <div className="my-10 grid grid-cols-1 gap-6 lg:my-[60px] lg:grid-cols-2">
          <div>
            <img
              src="/images/customJewelry/1-1.png"
              alt=""
              className="aspect-[1/0.5]"
            />
          </div>
          <div className="flex flex-col justify-center gap-y-6">
            <span className="font-peyda-600 text-[32px] text-blue-1050">
              طرح مورد نظرتان را به ما ارائه می دهید
            </span>
            <p className="font-peyda-400 text-lg text-blue-1050">
              تصور کلی طرح مد نظرتان را به دیزاینر های ما ارائه می کنید، ایده
              پردازان و طراحان خلاق ما برای تولید بهتر محصول جذاب و زیبا، ایده
              شما را اجرا کرده و به شما ارائه می دهند.
            </p>
          </div>
        </div>
        <div className="my-10 grid grid-cols-1 gap-6 lg:my-[60px] lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-y-6">
            <span className="font-peyda-600 text-[32px] text-blue-1050">
              انتخاب بهترین نسخه طرح شما
            </span>
            <p className="font-peyda-400 text-lg text-blue-1050">
              دیزاینر ها و ایده پردازان نیسا،برای هر چه زیباتر کردن محصول شما،
              طرح شما را با ایده های خود با توجه به منبعی که از آن الهام گرفتند
              تلفیق کرده و با در نظر گرفتن نکات فنی جواهرسازی ، بر روی نرم
              افزارهای تخصصی طراحی جواهرات پیاده سازی کرده و چند طرح به شما
              ارائه می کنند.شما طرح خود را انتخاب می کنید، تمامی اصلاحات مد
              نظرتان را با دیزاینرهای ما انجام می دهید.
            </p>
          )
        )}
      </section>
    </>
  );
}
