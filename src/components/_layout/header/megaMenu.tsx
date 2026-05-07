import Button from "@/components/_modules/button";
import ArrowLeft from "@/public/icons/arrowLeft";
import Link from "next/link";
import React from "react";

export default function MegaMenu({ megaMenu }: any) {
  const categories = megaMenu?.data;
  const ads = megaMenu?.ads
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center bg-white py-10 shadow-md transition-all">
      {/* {categories?.id === "4a#" && (
        <>
          <h1 className="text-center font-peyda-600 text-3xl text-black">
            کالکشن ها
          </h1>
        </>
      )} */}
      <div className="flex flex-row flex-wrap justify-center gap-10 2xl:gap-x-[60px]">
        {categories &&
          categories?.map((item: any, index: any) => (
            <>
              <div key={index} className="flex flex-col gap-y-6">
                <Link
                  href={`/${item?.href}`}
                  className="font-peyda-600 text-xl text-blue-1050 2xl:text-2xl"
                >
                  {item?.title}
                </Link>
                <div className="flex flex-col gap-y-3">
                  {item?.children?.map((subItem: any, index: any) => (
                    <>
                      <Link
                        key={index}
                        className="font-peyda-400 text-base text-blue-1050 hover:text-primary 2xl:text-lg"
                        href={`${subItem?.href}`}
                      >
                        {subItem?.title}
                      </Link>
                    </>
                  ))}
                </div>
              </div>
            </>
          ))}

        {/* ads in mega menu */}

        {ads && (
          <div className="flex flex-row gap-6 xl:flex-col">
            {ads?.length > 0 &&
              ads?.map((item: any, index: any) => (
                <>
                  <div
                    key={index}
                    className="backStyle flex w-[360px] flex-col justify-center px-4 lg:h-[150px]"
                    style={{
                      background: `
                      linear-gradient(-90deg, #000000 0%, rgba(0, 0, 0, 0) 51.5%),
                      url(${item?.image}) 
                      `,
                    }}
                  >
                    <div className="flex flex-col justify-center gap-y-4 lg:w-[511px]">
                      <h2 className="font-peyda-600 text-base text-white">
                        {item?.image_text}
                      </h2>

                      <Button className="w-fit bg-white p-2 text-blue-1050">
                        <Link
                          href={item?.href}
                          className="flex items-center gap-x-2 font-peyda-400 text-xs"
                        >
                          <span>{item?.button_text}</span>

                          <ArrowLeft className="h-[18px] w-[18px]" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
