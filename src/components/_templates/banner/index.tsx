import React from "react";

type PageBannerType = {
  imgUrl: string;
  title: string;
  subTitle?: string;
  isBlackText: boolean;
};

export default function PageBanner({
  imgUrl,
  title,
  subTitle,
  isBlackText,
}: PageBannerType) {
  return (
    <div
      style={{
        backgroundImage: `url('${imgUrl}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "85vh",
      }}
      className=" mb-10 flex items-center lg:mb-[60px]"
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
