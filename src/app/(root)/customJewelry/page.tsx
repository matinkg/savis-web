"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";

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
  // const home_BannerData =
  //   settingData?.filter(
  //     (item: any) => item.key === settingKeysObject?.banner_pages_customJewelry
  //   ) || [];
  return (
    <>
      {/* banner  */}

      {/* {settingLoading ? (
        <BannerPagesSkeleton />
      ) : (
        // <PageBannerWithGradient
        //   imgUrl={home_BannerData[0]?.value?.image ?? ""}
        //   subTitle={home_BannerData[0]?.value?.sub_title ?? ""}
        //   title={home_BannerData[0]?.value?.title ?? ""}
        //   isBlackText={false}
        // />
      )} */}
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
          </div>
          <div>
            <img
              src="/images/customJewelry/1-2.png"
              alt=""
              className="aspect-[1/0.5]"
            />
          </div>
        </div>
        <div className="my-10 grid grid-cols-1 gap-6 lg:my-[60px] lg:grid-cols-2">
          <div>
            <img
              src="/images/customJewelry/1-3.png"
              alt=""
              className="aspect-[1/0.5]"
            />
          </div>
          <div className="flex flex-col justify-center gap-y-6">
            <span className="font-peyda-600 text-[32px] text-blue-1050">
              انتخاب بهترین متریال برای طرح شما
            </span>
            <p className="font-peyda-400 text-lg text-blue-1050">
              طلا و جواهر سازان نیسا، با توجه به طرح شما بهترین متریال را که
              برای ساخت محصول لازم است را به شما ارائه میدهند، از سنگ های قیمتی
              گرفته تا سنگ های سنتتیک برای معقول به صرفه بودن به شما ارائه می
              شود.
            </p>
          </div>
        </div>
        <div className="my-10 grid grid-cols-1 gap-6 lg:my-[60px] lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-y-6">
            <span className="font-peyda-600 text-[32px] text-blue-1050">
              سفارش شما آماده‌ست
            </span>
            <p className="font-peyda-400 text-lg text-blue-1050">
              پس از طی کردن مراحل بالا سفارش شما در طول سه روز کاری آماده و برای
              شما ارسال می شود.
            </p>
          </div>
          <div>
            <img
              src="/images/customJewelry/1-4.png"
              alt=""
              className="aspect-[1/0.5]"
            />
          </div>
        </div>

        {/* --------------------------------------- */}

        <div className="my-10 grid grid-cols-2 gap-6 lg:my-[60px] lg:grid-cols-4 2xl:gap-x-10">
          {customJewelryOrder.map((item) => (
            <div
              key={item?.id}
              className="flex flex-col items-center justify-center gap-y-4 bg-third py-4 text-neutral-1000 lg:gap-y-6 lg:py-10"
            >
              <img
                src={item?.img}
                alt=""
                className="h-[60px] w-[60px] lg:h-[120px] lg:w-[120px]"
              />
              <div className="flex flex-col items-center space-y-3 px-4 lg:px-6">
                <span className="block text-center font-peyda-600 text-base lg:text-2xl">
                  {item?.title}
                </span>
                <p className="text-center font-peyda-400 text-xs text-slate-1000/50 lg:text-base">
                  {item?.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* --------------------------------------- */}

        <div className="mx-auto mb-10 flex flex-col items-center gap-[18px] lg:mb-[60px] lg:w-[760px] lg:gap-y-6">
          <h1 className="font-peyda-600 text-2xl lg:text-[32px]">ثبت سفارش</h1>

          <p className="text-center font-peyda-400 text-sm lg:text-lg">
            شما میتوانید از طریق لینک زیر با راهنمایی همکاران ما و تایید طرح
            دلخواهتان ، سفارشتان را ثبت کنید
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
            گالری محصولات سفارشی
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
            {customizedProductsGallery?.map((item, index) => (
              <SwiperSlide key={index}>
                <Link href={item?.link}>
                  <img
                    src={item?.img}
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
