"use client";

import Button from "@/components/_modules/button";
// import Refresh from "@/public/icons/refresh";

import React from "react";
import EmploymentForm from "@/components/_templates/careerOpportunities/form";
import FrequentlyAskedQuestions from "@/components/_modules/frequentlyAskedQuestions";
import Refresh from "@/public/icons/refresh";

const Advantages = [
  {
    title: `پاداش بر اساس عملکرد`,
    img: "/images/job/1-min.png",
  },
  {
    title: `امکان دورکاری`,
    img: "/images/job/2-min.png",
  },
  {
    title: `پاداش ارجاع همکار`,
    img: "/images/job/3-min.png",
  },
  {
    title: `خرید با شرایط همکار`,
    img: "/images/job/4-min.png",
  },
  {
    title: `زمان کاری منعطف`,
    img: "/images/job/5-min.png",
  },
  {
    title: `بیمه تکمیلی`,
    img: "/images/job/6-min.png",
  },
  {
    title: `امنیت شغلی`,
    img: "/images/job/7-min.png",
  },
  {
    title: `برنامه های آموزشی`,
    img: "/images/job/8-min.png",
  },
];
const jobs = [
  {
    title: `طراح جواهر`,
    img: "/images/job/jewelry designer-min.png",
  },
  {
    title: `طراح جواهر`,
    img: "/images/job/jewelry designer-min.png",
  },
  {
    title: `طراح جواهر`,
    img: "/images/job/jewelry designer-min.png",
  },
  {
    title: `طراح جواهر`,
    img: "/images/job/jewelry designer-min.png",
  },
  {
    title: `طراح جواهر`,
    img: "/images/job/jewelry designer-min.png",
  },
  {
    title: `طراح جواهر`,
    img: "/images/job/jewelry designer-min.png",
  },
  {
    title: `طراح جواهر`,
    img: "/images/job/jewelry designer-min.png",
  },
  {
    title: `طراح جواهر`,
    img: "/images/job/jewelry designer-min.png",
  },
];

export default function CareerOpportunities() {
  return (
    <>
      {/* banner  */}
      <div className="career_banner_mobile lg:career_banner_desk mb-10 flex items-center lg:mb-[60px]">
        <div className="mx-auto flex w-[91.12%] flex-col items-center lg:w-[91.67%] 4xl:w-[85%]">
          <h1 className="text-center font-peyda-900 text-[44px] text-white lg:font-peyda-600 lg:text-[85px]">
            فرصت های شغلی
          </h1>

          <span className="text-center font-peyda-400 text-lg text-white lg:text-2xl">
            تو هم جزئی از خانواده ساویس شو و کنار ما خانواده ساویس رو بزرگ تر کن
          </span>
        </div>
      </div>
      {/* banner  */}

      <section className="mx-auto mt-10 w-[91.12%] text-blue-1050 lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        <div className="mx-auto mb-10 flex flex-col items-center gap-[18px] lg:mb-[60px] lg:w-[760px] lg:gap-y-6">
          <h2 className="font-peyda-600 text-2xl lg:text-[38px]">
            درباره فرصت های شغلی ساویس
          </h2>

          <p className="text-center font-peyda-400 text-sm lg:text-lg">
            فرصت های شغلی در طلا فروشی خورده فروشی، به افراد علاقه‌مند به عرصه
            جواهرات و طلا فراهم می‌آورد تا در یک محیط پویا و پرارزش فعالیت کنند.
            این فرصت‌ها شامل انواع شغل‌های از فروشندگان و مشاوران فروش گرفته تا
            مدیران فروش و بازاریابان می‌شود. با پشتیبانی و آموزش‌های لازم از سوی
            طلا فروشی، فرصت های شغلی در این حوزه، به افراد امکان می‌دهد تا به
            عنوان یک عضو ارزشمند و موثر در این صنعت، شغلی پربازده و موفقیت آمیز
            داشته باشند. همچنین، این فرصت‌ها به افراد امکان می‌دهد تا با زندگی
            حرفه‌ای در یک صنعت پویا و دائمی، به رشد شخصی و حرفه‌ای خود بپردازند.
          </p>
        </div>

        {/* ---------------------------------------- */}
        <div className="my-10 flex flex-col items-center gap-y-6 lg:my-[30px] lg:gap-y-10">
          <span className="font-peyda-400 text-lg text-blue-1050 lg:text-2xl">
            مزایای همکاری با ساویس
          </span>
          <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
            {Advantages?.map((item, index) => (
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
            {jobs?.map((item, index) => (
              <div
                style={{
                  background: `linear-gradient(5deg, rgba(0,0,0,0.6) 100%, rgba(0,0,0,0.6) 100%),url("${item?.img}")`,
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
          <Button className="flex-center w-fit gap-x-2 bg-secendry px-5 py-3 text-white">
            <span className="font-peyda-400 lg:text-lg">نمایش بیشتر</span>
            <Refresh className="h-6 w-6 text-white" />
          </Button>
        </div>
        {/* ---------------------------------------- */}

        <div className="mx-auto my-[60px] flex flex-col items-center gap-[18px] text-blue-1050 lg:mb-[60px] lg:mt-[120px] lg:w-[760px] lg:gap-y-6">
          <h2 className="font-peyda-600 text-2xl lg:text-[38px]">
            فرم استخدام در ساویس
          </h2>

          <p className="text-center font-peyda-400 text-sm lg:text-lg">
            در تمام طول هفته با اشتیاق پاسخگوی شما هستیم، لطفا برای ارتباط با ما
            از طریق راه‌های ارتباطی یا کامل کردن فرم زیر اقدام بفرمایید.
          </p>
        </div>

        <EmploymentForm jobs={[]} />

        <FrequentlyAskedQuestions />
      </section>
    </>
  );
}
