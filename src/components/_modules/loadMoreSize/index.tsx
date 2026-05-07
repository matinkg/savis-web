import React from "react";
import ArrowDown from "@/public/icons/arrowDown";

type LoadMoreSizeProps = {
  productDetails: any;

  setActiveIndexSize: any;
};
export default function LoadMoreSize({
  productDetails,
  setActiveIndexSize,
}: LoadMoreSizeProps) {
  return (
    <div className="flex-center group relative h-6 cursor-pointer gap-x-2 border border-solid border-blue-1050 p-1 px-3 font-peyda-400 text-sm lg:h-7 lg:text-base">
      <span>بیشتر</span>
      <ArrowDown className="h-[18px] w-[18px] cursor-pointer" />

      <div className="invisible absolute left-0 right-0 top-8 z-10 w-full opacity-0 transition-all group-hover:visible group-hover:opacity-100">
        {/* <div className="flex w-full flex-col items-center bg-white">
          {productDetails?.size
            ?.slice(4, productDetails?.size.length - 1)
            .map((item: any, index: any) => (
              <>
                <div
                  onClick={() =>
                    setActiveIndexSize({
                      index,
                      size: item,
                    })
                  }
                  className="flex-center w-full cursor-pointer py-1 text-sm hover:bg-gray-250"
                >
                  {item}
                </div>
              </>
            ))}
        </div> */}
      </div>
    </div>
  );
}
