import React from "react";
import HorizontalCard from "@/components/_modules/horizontalCard";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";

export default function RelatedPost({
  RelatedPostData,
}: {
  RelatedPostData: any;
}) {
  return (
    <div className="mt-10 pb-16 lg:mt-[60px]">
      <h3 className="mb-[18px] font-peyda-600 text-xl text-blue-1050 lg:mb-6 lg:text-[32px]">
        مطالب مرتبط
      </h3>
      <Swiper
        loop
        rewind
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 1,
            // spaceBetween: 50,
          },
          425: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
      >
        {RelatedPostData?.map((item: any) => (
          <SwiperSlide key={item?.id}>
            <HorizontalCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
