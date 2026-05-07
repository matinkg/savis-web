"use client";
import Button from "@/components/_modules/button";
import { extractSVG, fetchAndExtractSVG } from "@/helper/extractSVG";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import useJewelryTypesOperation from "../index/hook/jewelryTypes/useOperation";
import { useState, useEffect, useMemo } from "react";

export default function JewelryCategories({ savisCats }: any) {
  const [active, setActive] = useState(savisCats[0]?.id);
  const [showCategory, setShowCategory] = useState<any>([]);
  const [svgContent, setSvgContent] = useState<Record<number, string>>({});

  const activeItem = useMemo(() => {
    if (active) {
      return savisCats?.find((item: any) => item?.id === active);
    }
    return undefined;
  }, [active, savisCats]);

  useEffect(() => {
    if (activeItem) {
      setShowCategory(activeItem.children || []);
    }
  }, [activeItem]);

  useEffect(() => {
    const fetchSVGs = async () => {
      const svgMap: Record<number, string> = {};
      await Promise.all(
        savisCats.map(async (item: any) => {
          if (item?.image) {
            const svg = await fetchAndExtractSVG(item?.image);
            if (svg) {
              svgMap[item?.id] = svg;
            }
          }
        })
      );
      setSvgContent(svgMap);
    };

    fetchSVGs();
  }, [savisCats]);

  return (
    <>
      <section className="mx-auto w-[91.12%] pb-5 lg:w-[91.67%] lg:pb-[120px] 4xl:w-[85%]">
        <div className="mb-8 mt-10 flex flex-col items-center lg:my-[60px]">
          <span className="block pb-10 font-peyda-800 text-2xl text-blue-1050 lg:text-2xl 2xl:text-3xl">
            زیورالات ساویس
          </span>

          {/* category */}
          <Swiper
            slidesPerView={8}
            breakpoints={{
              0: {
                slidesPerView: 4,
                // spaceBetween: 50,
              },
              425: {
                slidesPerView: 6,
                // spaceBetween: 50,
              },
              1024: {
                slidesPerView: 8,
                spaceBetween: 0,
              },
            }}
            className="flex-center mb-8 w-full lg:mb-[60px] lg:w-[68%]"
            wrapperClass="justify-center"
          >
            {savisCats?.map((item: any) => (
              <SwiperSlide key={item?.id}>
                <div
                  className="flex cursor-pointer flex-col items-center gap-y-2 lg:gap-y-[18px] "
                  onClick={() => {
                    setActive(item?.id);
                    setShowCategory(item?.children);
                  }}
                >
                  <div
                    className={`${
                      item?.id === active ? "text-primary" : "text-blue-1050"
                    } h-10 w-10 hover:text-primary lg:h-[60px] lg:w-[60px] flex-center`}
                    dangerouslySetInnerHTML={{
                      __html: svgContent[item?.id] || "",
                    }}
                  />
                  {/* <ExternalSVGComponent url={item.image} fillColor="" />
                  </div> */}
                  <span
                    className={`${
                      item?.id === active ? "text-primary" : "text-blue-1050"
                    } font-peyda-400 text-sm text-[#161616] lg:text-base xl:text-[18px]`}
                  >
                    {item?.name}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* content */}

        <div className="grid grid-cols-2 gap-6 lg:flex lg:grid-cols-4 lg:gap-0">
          {showCategory &&
            [...showCategory, ...(showCategory.length < 4 ? [{}] : [])].map(
              (item, index) => (
                <div
                  key={index + "fg"}
                  className="backStyle flex h-[230px] flex-col items-center justify-end gap-y-3 p-3 flex-1 lg:h-[500px] lg:p-6 transition-all duration-300 ease-in-out hover:flex-[2]"
                  style={{
                    background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 52.3%, rgba(0, 0, 0, 0.8) 100%) , url(${item?.image ? item?.image : ""}) `,
                  }}
                >
                  {item?.slug && (
                    <>
                      <Link
                        href={item?.slug}
                        className="font-peyda-600 text-sm text-white lg:text-xl 2xl:text-2xl"
                      >
                        {item?.name}
                      </Link>

                      <Button className="w-full bg-white py-2 text-center font-peyda-500 text-sm text-blue-1050 lg:py-3 lg:text-base 2xl:text-lg">
                        <Link href={item?.slug}>جزیات بیشتر</Link>
                      </Button>
                    </>
                  )}
                </div>
              )
            )}
        </div>
      </section>
    </>
  );
}
