import React from "react";
import Link from "next/link";
import Button from "@/components/_modules/button/index";
import ArrowLeft from "@/public/icons/arrowLeft";

export default function Banner({ HomeBannerData }: any) {
  return (
    <>
      <section
        className="flex flex-col justify-center backStyle mt-24 md:mt-14 lg:mb-[60px] h-[360px] md:h-[550px] lg:h-[750px] 3xl:h-[950px]"
        style={{
          width: "100%",
          background: ` linear-gradient(
        270deg,
        rgba(255, 255, 255, 0.66) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      url("${HomeBannerData?.["image_1"]}")`,
        }}
      >
        <div className="mx-auto w-[91.12%] lg:w-[91.67%] 4xl:w-[85%] mt-10 md:mt-0">
          <div className="w-full md:w-[450px] lg:w-[542px] 2xl:w-[700px]">
            <p className="block font-peyda-900 text-[44px] text-blue-1050 md:text-[80px] xl:text-[95px] xl:leading-[120px] 2xl:text-[130px] 2xl:leading-[160px]">
              {HomeBannerData?.["title_1"]}
            </p>
            <p className="pb-8 pt-6 font-peyda-600 text-xs text-blue-1050 md:text-sm xl:text-base 2xl:text-xl">
              {HomeBannerData?.["summary"]}
            </p>

            <div className="flex items-center gap-x-4">
              <Button className="flex items-center gap-x-1 bg-white p-2 font-peyda-400 text-sm text-blue-1050 lg:px-4 lg:py-2 xl:text-base">
                <Link href={`${HomeBannerData?.["slug"]}`}>
                  <span> {HomeBannerData?.["title_2"]}</span>
                </Link>
                <ArrowLeft className="h-4 w-4 lg:h-6 lg:w-6" />
              </Button>
              <Button className="bg-white p-2 font-peyda-400 text-sm text-blue-1050 lg:px-8 lg:py-2 xl:text-base">
                <Link href={HomeBannerData?.["slug_2"] || "#"}>
                  {HomeBannerData?.["title_3"]}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
