"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

export default function Thumbnails({ images }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any | null>(null);
  return (
    <div className="container">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={false}
        pagination={true}
        thumbs={{
          swiper:
            thumbsSwiper && !(thumbsSwiper as any).destroyed
              ? thumbsSwiper
              : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
        // className="h-96 w-full "
      >
        {images?.map((image: any, index: any) => (
          <SwiperSlide key={index}>
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={image}
                alt=""
                className="block h-full w-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail */}

      {images?.length > 1 && (
        <div className="hidden lg:block w-full">
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={12}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbs mt-3 h-32 w-full hidden  "
          >
            {images?.map((image: any, index: any) => (
              <SwiperSlide key={index}>
                <button className="flex h-full w-full items-center justify-center">
                  <img
                    src={image}
                    alt=""
                    className="block h-full w-full object-cover"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
