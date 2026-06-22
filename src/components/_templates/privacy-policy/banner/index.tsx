"use client";
import { getPrivacyPolicyOptions } from "@/lib/hooks/services/privacy-policy/index.query";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function PrivacyPolicyBanner() {
  const { data } = useQuery(getPrivacyPolicyOptions());

  return (
    <div className="privacy_banner_mobile lg:privacy_banner_desk relative mb-10 flex items-center lg:mb-[60px] overflow-hidden">
      {data?.data?.banner?.image_1 && (
        <img
          src={data.data.banner.image_1}
          alt="banner"
          className="absolute inset-0 h-full w-full object-cover object-left"
        />
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 50%, #000000 100%)",
        }}
      />
      <div className="relative z-10 mx-auto flex w-[86%] flex-col lg:w-[91.67%]">
        <h1
          dangerouslySetInnerHTML={{
            __html: data?.data?.banner?.body || "",
          }}
          className="font-peyda-900 text-[44px] text-white md:text-[55px] lg:font-peyda-600 lg:text-[85px]"
        />
      </div>
    </div>
  );
}
