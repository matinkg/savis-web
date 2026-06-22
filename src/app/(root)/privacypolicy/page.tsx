import { privacy, privacyContent } from "@/static_data/privacyPolicy";
import React from "react";

export default function PrivacyPolicy() {
  return (
    <>
      {/* banner  */}
      <div className="privacy_banner_mobile lg:privacy_banner_desk mb-10 flex items-center lg:mb-[60px]">
        <div className="mx-auto flex w-[86%] flex-col lg:w-[91.67%]">
          <h1 className="font-peyda-900 text-[44px] text-white md:text-[55px] lg:font-peyda-600 lg:text-[85px]">
            سیاست حفظ حریم شخصی
          </h1>
        </div>
      </div>
      {/* banner  */}

      <section className="mx-auto mt-10 w-[91.12%] lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        <div className="mx-auto grid w-full grid-cols-2 gap-4 lg:w-[73.63%] lg:grid-cols-4 lg:gap-6">
          {privacy.map((item, index) => (
            <div
              key={item?.id}
              className={`flex flex-col items-center gap-y-6 pb-6 border-b border-solid ${index === 0 ? "border-b-primary  text-primary" : "border-b-blue-1050  text-blue-1050"}`}
            >
              <div dangerouslySetInnerHTML={{ __html: item?.img }} />
              <span className="font-peyda-600 text-sm xl:text-lg 2xl:text-2xl">
                {item?.title}
              </span>
            </div>
          ))}
        </div>

        {/* content */}
        <div className="mb-[80px] mt-[60px] space-y-4 lg:mb-[120px] lg:mt-[80px] lg:space-y-6">
          {privacyContent.map((item, index) => (
            <div key={index} className="space-y-4 lg:space-y-6">
              <h2 className="font-peyda-600 text-lg text-blue-1050 lg:text-[32px]">
                {item?.title}
              </h2>
              <p
                dangerouslySetInnerHTML={{ __html: item?.desc }}
                className="text-right font-peyda-600 text-xs !leading-7 text-blue-1050 lg:text-sm"
              ></p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
