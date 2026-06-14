"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";

const isVideo = (url: string) =>
  typeof url === "string" && url.toLowerCase().includes(".mp4");

export default function Thumbnails({ media }: any) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="container">
      <Swiper
        loop={false}
        spaceBetween={10}
        pagination={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Pagination]}
      >
        {media?.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="flex h-full w-full items-center justify-center">
              {isVideo(item.url) ? (
                <video
                  src={item.url}
                  controls
                  className="h-full w-full object-cover"
                />
              ) : (
                <img src={item.url} className="h-full w-full object-cover" />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {media?.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={12}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Thumbs]}
          className="thumbs mt-3 h-32 w-full"
        >
          {media?.map((item: any, index: number) => (
            <SwiperSlide key={index}>
              <div className="flex h-full w-full items-center justify-center">
                {isVideo(item.url) ? (
                  <video
                    src={item.url}
                    className="h-full w-full object-cover"
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <img src={item.url} className="h-full w-full object-cover" />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
