"use client";

import React from "react";
import Link from "next/link";
import Button from "@/components/_modules/button";

export default function HomeAds({ HomeAdsData }: any) {
  if (!HomeAdsData || HomeAdsData.length === 0) return null; 

  return (
    <section className="mx-auto my-5 w-[91.12%] lg:my-[60px] lg:w-[91.67%] 4xl:w-[85%]">
      <div className="hidden space-y-6 lg:block">
        <div className="grid grid-cols-2 gap-x-6">
          {HomeAdsData.slice(0, 2).map((ad: any, index: number) => (
            <div
              key={`top-ads-${index}`}
              className="backStyle flex h-[395px] flex-col justify-end gap-y-[18px] p-6"
              style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 23.5%, rgba(0, 0, 0, 0.78) 100%), url(${ad?.image_1 || ""})`,
              }}
            >
              <span className="block w-[215px] font-peyda-600 text-xl text-white xl:text-xl 2xl:text-2xl">
                {ad?.title_1}
              </span>
              <Button className="w-[215px] bg-white py-2 text-center font-peyda-400 text-sm text-blue-1050 lg:text-base xl:py-3 xl:text-lg">
                <Link href={`${ad?.slug || "#"}`}>{ad?.title_2}</Link>
              </Button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-x-6">
          {HomeAdsData.slice(2, 5).map((ad: any, index: number) => (
            <div
              key={`bottom-ads-${index}`}
              className="backStyle flex h-[274px] flex-col justify-end gap-y-[18px] p-6 2xl:h-[350px]"
              style={{
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 23.5%, rgba(0, 0, 0, 0.78) 100%), url(${ad?.image_1 || ""})`,
              }}
            >
              <span className="block w-[215px] font-peyda-600 text-xl text-white xl:text-xl 2xl:text-2xl">
                {ad?.title_1}
              </span>
              <Button className="w-[215px] bg-white py-2 text-center font-peyda-400 text-sm text-blue-1050 lg:text-base xl:py-3 xl:text-lg">
                <Link href={`${ad?.slug || "#"}`}>{ad?.title_2}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="block space-y-4 lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          {HomeAdsData.slice(0, 5).map((ad: any, index: number) => (
            <div
              key={`mobile-ads-${index}`}
              className={`${
                index === 0 || index === 4 ? "col-span-2" : ""
              }`}
            >
              <img
                className="!aspect-[1/0.5] object-cover"
                src={ad?.image_1 || ""}
                alt={ad?.title_1 || ""}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
