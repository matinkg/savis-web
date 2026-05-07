import React from "react";

type BannerType = {
  backgroundImageUrl: string;
  title: string;
  subTitle: string;
};
const Banner = ({ backgroundImageUrl, title, subTitle }: BannerType) => {
  const bannerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
  };

  return (
    <div
      className="BlogDetails_banner_ads_mobile lg:BlogDetails_banner_ads_desk mb-10 flex items-center lg:mb-[60px]"
      style={bannerStyle}
    >
      <div className="mx-auto w-[91.12%] lg:w-[91.67%] 4xl:w-[85%]">
        <h1 className="font-peyda-900 text-2xl text-white lg:font-peyda-600 lg:text-[58px]">
          {title}
        </h1>

        <span className="mt-3 block font-peyda-600 text-lg text-white lg:text-xl">
          {subTitle}
        </span>
      </div>
    </div>
  );
};

export default Banner;
