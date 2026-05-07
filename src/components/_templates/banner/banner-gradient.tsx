import React from "react";

type PageBannerType = {
  imgUrl: string;
  title: string;
  subTitle?: string;
  isBlackText: boolean;
};

export default function PageBannerWithGradient({
  imgUrl,
  title,
  subTitle,
  isBlackText,
}: PageBannerType) {
  return (
    <div
      style={{
        background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, #000000 100%),url('${imgUrl}')`,
      }}
      className="banner_size mb-10 flex items-center lg:mb-[60px]"
    >
      <div className="mx-auto flex w-[91.12%] flex-col lg:w-[91.67%] 4xl:w-[85%]">
        <h1
          className={`font-peyda-900 text-[44px] ${isBlackText ? "text-neutral-1000" : "text-white"} lg:font-peyda-600 lg:text-[85px]`}
        >
          {title}
        </h1>

        {subTitle && (
          <span className="font-peyda-400 text-lg text-white lg:text-xl">
            {subTitle}
          </span>
        )}
      </div>
    </div>
  );
}
