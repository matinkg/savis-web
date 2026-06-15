import Button from "@/components/_modules/button";
import ArrowLeft from "@/public/icons/arrowLeft";
import Link from "next/link";
import React from "react";

export default function CustomerClub({ customerClubHomeData }: any) {
  return (
    <section className="mx-auto my-10 w-[91.12%] lg:my-[60px] lg:w-[91.67%] 4xl:w-[85%]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="order-last flex flex-col justify-center bg-gray-230 lg:order-1 lg:pl-6 lg:pr-[60px] 2xl:pl-12">
          <div className="mx-auto w-[91.12%] py-6 lg:w-full">
            <span className="block font-peyda-800 text-lg text-secendry sm:text-xl md:text-3xl lg:text-[32px] lg:leading-10 2xl:text-[48px] 2xl:leading-[60px]">
              {customerClubHomeData?.["title_2"] ?? ""}
            </span>

            <p className="pb-10 pt-[18px] font-peyda-400 text-xs text-blue-1050 md:text-base lg:text-lg">
              {customerClubHomeData?.["summary"] ?? ""}
            </p>

            <Button className="flex w-fit items-center gap-x-1 bg-secendry p-2 font-peyda-400 text-sm text-white lg:px-[18px] lg:py-3 lg:text-lg">
              <Link href={customerClubHomeData?.["slug"] ?? ""}>
                <span>{customerClubHomeData?.["title_3"] ?? ""}</span>
              </Link>
              <ArrowLeft href="#" className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
            </Button>
          </div>
        </div>
        <div className="l order-1 lg:order-last">
          <img
            className="w-full object-cover"
            src={customerClubHomeData?.["image_1"] ?? ""}
            alt={customerClubHomeData?.["title_2"] ?? ""}
          />
        </div>
      </div>
    </section>
  );
}
