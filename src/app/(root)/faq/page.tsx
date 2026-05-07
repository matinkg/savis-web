"use client";

import DropDownMenu from "@/components/_modules/dropDownMenu";
import PrimaryLoading from "@/components/_templates/loading/primaryLoading";
import { request } from "@/configs/HTTPService";
import { fetchAndExtractSVG } from "@/helper/extractSVG";
import React, { useEffect, useState } from "react";

export default function FAQ() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [svgContent, setSvgContent] = useState<Record<number, string>>({});
  const [active, setActive] = useState<number | null>(null);
  const [banner, setBanner] = useState("");

  useEffect(() => {
    request("/api/v1/faq")
      .then((res) => {
        setData(res?.data);
        setActive(res?.data?.childs[0]?.id);
        setBanner(res?.data?.banner?.image_1)
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchSVGs = async () => {
      const svgMap: Record<number, string> = {};
      await Promise.all(
        data?.childs.map(async (item: any) => {
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

    if (data?.childs) {
      fetchSVGs();
    }
  }, [data?.childs]);

  if (isLoading) {
    return <PrimaryLoading />;
  }

  return (
    <>
      <div
        className="faq_banner_mobile lg:faq_banner_desk mb-10 flex items-center lg:mb-[60px]"
        style={{
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto flex w-[86%] flex-col lg:w-[91.67%]">
          <h1 className="font-peyda-900 text-[44px] text-blue-1050 md:text-[55px] lg:font-peyda-600 lg:text-[85px]">
            سوالات متداول
          </h1>
        </div>
      </div>

      <section className="mx-auto mt-10 w-[91.12%] lg:mt-[60px] lg:w-[91.67%] 4xl:w-[85%]">
        <div className="mx-auto grid w-full grid-cols-2 gap-4 lg:w-[73.63%] lg:grid-cols-4 lg:gap-6">
          {data?.childs?.map((item: any, index: number) => (
            <div
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`flex flex-col items-center gap-y-6 pb-6 border-b border-solid cursor-pointer ${
                active === item.id
                  ? "border-b-primary text-primary"
                  : "border-b-blue-1050 text-blue-1050"
              }`}
            >
              <div
                className="svg-container"
                dangerouslySetInnerHTML={{
                  __html: svgContent[item?.id]?.replace(
                    "<svg",
                    `<svg fill="${active === item.id ? "#0796b2" : "black"}"`
                  ),
                }}
              />
              <a
                href={`#faq-${item.id}`}
                className={`font-peyda-600 text-sm xl:text-lg 2xl:text-2xl ${
                  active === item.id ? "text-[#0796b2]" : "text-black"
                }`}
              >
                {item.name_2}
              </a>
            </div>
          ))}
        </div>

        <div className="mb-[80px] mt-[60px] space-y-10 lg:mb-[120px] lg:mt-[80px] lg:space-y-[80px]">
          {data?.childs?.map((item: any, index: number) => (
            <div
              id={`faq-${item.id}`}
              key={index}
              className="space-y-4 lg:space-y-6"
            >
              <h2 className="text-center font-peyda-600 text-lg text-blue-1050 lg:text-[32px]">
                {item.name_2}
              </h2>
              {item?.posts?.map((p: any) => (
                <DropDownMenu
                  key={p?.id}
                  type="down"
                  title={p.title_1}
                  titleStyle="text-sm lg:text-lg"
                  className="bg-gray-250 p-3 lg:p-[18px]"
                >
                  <p
                    dangerouslySetInnerHTML={{ __html: p.summary }}
                    className="text-right font-peyda-600 text-xs !leading-7 text-blue-1050 lg:text-sm"
                  ></p>
                </DropDownMenu>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
