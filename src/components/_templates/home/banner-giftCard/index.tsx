import Button from "@/components/_modules/button";
import ArrowLeft from "@/public/icons/arrowLeft";
import Link from "next/link";
import React from "react";

export default function GiftCardBanner({ giftCardBannerData }: any) {
  return (
    <section
      className="gift-banner_mobile lg:gift-banner mx-auto my-10 flex w-[91.12%] flex-col justify-center lg:my-[60px] lg:w-[91.67%] 4xl:w-[85%]"
      style={{
        background:
          `linear-gradient(90deg, rgba(0, 0, 0, 0) 53.73%, rgba(0, 0, 0, 0.48) 100%), url(${giftCardBannerData?.["image_1"] ?? ""})`,
      }}
    >
      <div className="px-4 lg:px-10">
        <span className="block font-peyda-800 text-[32px] text-white lg:text-[42px]">
          {giftCardBannerData?.["title_2"] ?? ""}
        </span>
        <p className="pb-[18px] pt-2 font-peyda-500 text-base text-white lg:pb-6 lg:pt-[18px] lg:text-xl">
          {giftCardBannerData?.["summary"] ?? ""}
        </p>

        <Button className="flex items-center gap-x-1 bg-white p-2 font-peyda-400 text-sm text-blue-1050 lg:px-[18px] lg:py-3 lg:text-lg">
          <Link href={giftCardBannerData?.["slug"] ?? ""}>
            <span>{giftCardBannerData?.["title_3"] ?? ""}</span>
          </Link>
          <ArrowLeft className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
        </Button>
      </div>
    </section>
  );
}
