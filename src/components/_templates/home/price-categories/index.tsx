import React from "react";
import Link from "next/link";

export default function HomeCategoriesBaseOnPrice({
  HomeCategories_baseOnPriceData,
}: any) {
  return (
    <section className="mx-auto my-10 w-[91.12%] lg:my-[60px] lg:w-[91.67%] 4xl:w-[85%]">
      <div className="grid grid-cols-1 gap-4 child-hover:cursor-pointer lg:grid-flow-col lg:grid-cols-none lg:grid-rows-2">
        {/* Top section */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {HomeCategories_baseOnPriceData?.slice(0, 2).map((item: any, index: number) => (
              <div
                key={index}
                className="backStyle flex h-[171px] flex-col justify-end gap-y-[18px] p-6 lg:h-[300px]"
                style={{
                  backgroundImage: `url(${item?.image_1 ?? ""})`,
                }}
              >
                <Link
                  href={item?.slug ?? ""}
                  className="font-peyda-800 text-2xl text-blue-1050 2xl:text-3xl"
                >
                  {item?.title_1 ?? ""}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        {HomeCategories_baseOnPriceData?.[2] && (
          <div
            className="backStyle flex h-[171px] flex-col justify-end gap-y-[18px] p-6 lg:col-span-7 lg:h-[300px]"
            style={{
              backgroundImage: `url(${HomeCategories_baseOnPriceData[2]?.image_1 ?? ""})`,
            }}
          >
            <Link
              href={HomeCategories_baseOnPriceData[2]?.slug ?? ""}
              className="font-peyda-800 text-2xl text-blue-1050 2xl:text-3xl"
            >
              {HomeCategories_baseOnPriceData[2]?.title_1 ?? ""}
            </Link>
          </div>
        )}

        {/* Left section */}
        {HomeCategories_baseOnPriceData?.[3] && (
          <div
            className="backStyle flex h-[171px] flex-col justify-end gap-y-[18px] p-6 lg:row-span-3 lg:!h-[616px]"
            style={{
              backgroundImage: `url(${HomeCategories_baseOnPriceData[3]?.image_1 ?? ""})`,
            }}
          >
            <Link
              href={HomeCategories_baseOnPriceData[3]?.slug ?? ""}
              className="font-peyda-800 text-2xl text-blue-1050 2xl:text-3xl"
            >
              {HomeCategories_baseOnPriceData[3]?.title_1 ?? ""}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
