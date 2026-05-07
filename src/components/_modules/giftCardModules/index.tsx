import React from "react";
import Button from "../button";
import Link from "next/link";

interface GiftCardModulesProps {
  name: string;
  description: string;
  image: string;
  id: string;
}
export default function GiftCardModules({
  name,
  description,
  image,
  id,
}: GiftCardModulesProps) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 bg-gray-250 p-4 lg:p-0">
        <div className="order-2 lg:order-1  ">
          <div className=" h-full w-full lg:w-[76.5%] lg:m-auto flex flex-col justify-center ">
            <div className=" space-y-4 lg:space-y-[18px]  ">
              <span className="font-peyda-600 text-lg lg:text-xl xl:text-2xl text-blue-1050">
                {name}
              </span>
              <p
                dangerouslySetInnerHTML={{ __html: description }}
                className="font-peyda-400  text-xs lg:text-sm xl:text-lg text-blue-1050"
              ></p>
            </div>

            <Button className="bg-secendry text-white font-peyda-400 w-full lg:w-fit xl:text-lg flex-center py-2 lg:py-2 lg:px-20 mt-6 lg:mt-10">
              <Link href={`giftCard/${id}`}>جزیات محصول</Link>
            </Button>
          </div>
        </div>
        <div className="order-1 lg:order-2 pb-5 lg:pb-0">
          <img src={image ?? ""} alt="" className=" w-full h-auto" />
        </div>
      </div>
    </>
  );
}
