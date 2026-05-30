import Link from "next/link";
import React from "react";
import ArrowLeft from "@/public/icons/arrowLeft";
import Calender from "@/public/icons/calender";

export default function HorizontalCard({ item }: { item: any }) {
  const time = new Date(item?.created_at)?.toLocaleString("fa-IR").split(",");
  return (
    <div key={item?.id} className="grid w-full grid-cols-2 bg-gray-250">
      <div className="relative">
        {item?.image_1 ? (
          <img
            src={item?.image_1}
            alt=""
            className="h-80 object-cover w-full"
          />
        ) : (
          <img
            src={"/images/emptyImg/no-image.jpg"}
            alt="No Image"
            className="aspect-[1/0.7] h-full w-full"
          />
        )}
        <div className="absolute bottom-0 flex w-full items-center justify-center gap-x-1 bg-[#1E1E1E80] py-3 text-white backdrop-blur-xl lg:gap-x-3">
          <div className="flex items-start gap-x-2">
            <Calender className="h-4 w-4 lg:h-[18px] lg:w-[18px] " />

            <span className="font-peyda-500 text-xs lg:text-sm p-0 m-0">
              {time[0]}
            </span>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col justify-between gap-y-2 px-4 py-[18px] lg:px-[18px]">
        <h3 className="text-start font-peyda-600 text-base lg:text-lg">
          {item?.title_1}
        </h3>
        <p
          dangerouslySetInnerHTML={{ __html: item?.summary }}
          className="line-clamp-4 text-justify font-peyda-400 text-xs lg:line-clamp-5 lg:leading-6"
        ></p>
        <Link
          href={`/blog/${item?.slug}`}
          className="flex items-center gap-x-2 font-peyda-400 text-sm lg:text-lg"
        >
          <span>ادامه مطلب</span>

          <ArrowLeft className="h-6 w-6" />
        </Link>
      </div>
    </div>
  );
}
