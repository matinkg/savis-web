"use client";
import React from "react";
import { privacy, privacyContent } from "@/static_data/privacyPolicy";
import { getPrivacyPolicyOptions } from "@/lib/hooks/services/privacy-policy/index.query";
import { useQuery } from "@tanstack/react-query";

export default function PrivacyPolicyContent() {
  const { data } = useQuery(getPrivacyPolicyOptions());
  const privacyData = data?.data?.sections;

  return (
    <section className="mx-auto mt-10 w-[91.12%] lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
      <div className="mx-auto grid w-full grid-cols-2 gap-4 lg:w-[73.63%] lg:grid-cols-4 lg:gap-6">
        {privacyData?.map((item: any, index: number) => {
          const localItem = privacy.find(
            (p) => p.title.trim() === item?.title?.trim(),
          );

          return (
            <div
              key={item?.id}
              className={`flex flex-col items-center gap-y-6 pb-6 border-b border-solid ${index === 0 ? "border-b-primary  text-primary" : "border-b-blue-1050  text-blue-1050"}`}
            >
              {localItem?.img && (
                <div
                  className="w-[50px] h-[50px]"
                  dangerouslySetInnerHTML={{ __html: localItem.img }}
                />
              )}

              <span className="font-peyda-600 text-sm xl:text-lg 2xl:text-2xl text-center">
                {item?.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mb-[80px] mt-[60px] space-y-4 lg:mb-[120px] lg:mt-[80px] lg:space-y-6">
        {privacyData?.map((item: any, index: number) => (
          <div key={index} className="space-y-4 lg:space-y-6">
            <h2 className="font-peyda-600 text-lg text-blue-1050 lg:text-[32px]">
              {item?.title}
            </h2>
            <p
              dangerouslySetInnerHTML={{ __html: item?.content }}
              className="text-right font-peyda-600 text-xs !leading-7 text-blue-1050 lg:text-sm"
            ></p>
          </div>
        ))}
      </div>
    </section>
  );
}
