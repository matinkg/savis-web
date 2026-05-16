"use client";

import PageBanner from "@/components/_templates/banner";
import BannerPagesSkeleton from "@/components/_templates/tailwind-css-skeleton/banner-pages";
import { request } from "@/configs/HTTPService";
import React, { useEffect, useState } from "react";

export default function PrivacyPolicy() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    request("/api/v1/privacy-policy")
      .then((res) => {
        setData(res?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <BannerPagesSkeleton />
      ) : (
        <PageBanner
          imgUrl={data?.banner?.image_1 ?? ""}
          title={data?.banner?.title_1 ?? data?.title ?? ""}
          isBlackText={false}
        />
      )}

      <section className="mx-auto mt-10 w-[91.12%] lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        {data?.content?.body ? (
          <div
            dangerouslySetInnerHTML={{ __html: data.content.body }}
            className="mb-[80px] text-editor text-right lg:mb-[120px]"
          />
        ) : (
          !isLoading && (
            <p className="mb-[80px] text-center font-peyda-400 text-sm text-blue-1050 lg:mb-[120px]">
              محتوایی یافت نشد.
            </p>
          )
        )}
      </section>
    </>
  );
}
