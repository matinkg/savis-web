import Link from "next/link";
import React from "react";
import ArrowLeft from "@/public/icons/arrowLeft";

import Calender from "@/public/icons/calender";
import ImageIcon from "@/public/icons/image";

export default function VerticalCard({ item }: { item: any }) {
  const time = new Date(item?.created_at)?.toLocaleString("fa-IR").split(",");

  return (
    <Link href={`/blog/${item?.slug}`} className="">
      <div>
        {item?.image_1 ? (
          <img
            src={item?.image_1}
            alt=""
            className="w-full h-[374px] object-cover"
          />
        ) : (
          <ImageIcon className="w-64 h-64 text-primary mx-auto" />
        )}
      </div>

      <div className="flex flex-col bg-gray-250 p-3  xl:p-4 2xl:p-6 min-h-[268px]">
        <h3 className="font-peyda-600 text-lg lg:text-2xl text-start">
          {item?.title_1}
        </h3>

        <p
          dangerouslySetInnerHTML={{ __html: item?.summary }}
          className="font-peyda-400 text-xs lg:line-clamp-4 lg:text-sm lg:leading-6 pt-4.5"
        ></p>

        <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-center lg:justify-between xl:gap-3 mt-auto">
          <p
            
            className="flex items-center gap-x-2 font-peyda-400 text-sm 2xl:text-lg"
          >
            <span>ادامه مطلب</span>

            <ArrowLeft className="h-6 w-6" />
          </p>

          <div className="flex items-center justify-center gap-x-2 bg-white/50 p-2 text-blue-1050 xl:gap-x-3 2xl:p-3">
            <div className="flex items-start gap-x-2 text-xs 2xl:text-sm">
              <Calender className="h-4 w-4 lg:h-[18px] lg:w-[18px]" />

              <span className="font-peyda-500">{time[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
