"use client";

import PageBanner from "@/components/_templates/banner";
import GiftCardTemp from "@/components/_templates/giftCard";
import BannerPagesSkeleton from "@/components/_templates/tailwind-css-skeleton/banner-pages";
import { request } from "@/configs/HTTPService";
import React, { useEffect, useState } from "react";

export default function GiftCard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    setLoading(true)
    request("/api/v1/gift-card").then((res) => {
      setData(res?.data)
      setLoading(false)
    });
  }, []);

  return (
    <>
      {/* banner  */}

      {loading ? (
        <BannerPagesSkeleton />
      ) : (
        <PageBanner
          imgUrl={data?.banner?.image_1 ?? ""}
          subTitle={data?.banner?.title_2 ?? ""}
          title={data?.banner?.title_1 ?? ""}
          isBlackText={false}
        />
      )}

      {/* banner  */}

      <section className="mx-auto mt-10 w-[91.12%] lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        <div className="mx-auto mb-10 flex flex-col items-center gap-[18px] lg:mb-[60px] lg:w-[760px] lg:gap-y-6">
          <h1 className="font-peyda-600 text-2xl lg:text-[38px]">
            {data?.post?.title_1 ?? ""}
          </h1>

          <p className="text-center font-peyda-400 lg:text-xl">
            {data?.post?.summary ?? ""}
          </p>
        </div>

        <GiftCardTemp data={data?.categories} loading={loading} />
      </section>
    </>
  );
}
