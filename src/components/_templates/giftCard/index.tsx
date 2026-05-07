"use client";

import React from "react";
import useOperation from "./hook/useOperation";
import GiftCardModules from "@/components/_modules/giftCardModules";
import PrimaryLoading from "../loading/primaryLoading";

export default function GiftCardTemp({data, loading}: any) {
  return (
    <>
      {loading ? (
        <PrimaryLoading />
      ) : (
        <>
          {data?.map((item: any, index: any) => (
            <>
              <div
                key={index}
                className="my-[60px] flex flex-col gap-y-4 lg:gap-y-6"
              >
                <h2 className="text-center font-peyda-600 text-lg text-blue-1050 md:text-2xl lg:text-[32px]">
                  {item?.name}
                </h2>
                {item?.gift_cards?.map((card: any) => (
                  <GiftCardModules key={card?.id} {...card} />
                ))}
              </div>
            </>
          ))}
        </>
      )}
    </>
  );
}
