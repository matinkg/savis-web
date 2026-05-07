import React from "react";

interface IsFreeProps {
  price: number;
}

export default function IsFree({ price }: IsFreeProps) {
  const isFree = price > 500000 ? true : false;
  return (
    <div className="w-full flex flex-col gap-y-4 lg:gap-y-[18px] p-4 lg:p-6 bg-secendry ">
      <span className="font-peyda-600 text-lg lg:text-2xl text-white">
        {isFree
          ? "ارسال سفارش شما، رایگان شد!"
          : "با خرید بیش از ۵۰۰ هزار تومان از ارسال رایگان مرسوله خود بهره مند شوید"}
      </span>

      <progress
        id="file"
        value={!isFree ? 100 : 32}
        max="100"
        className="w-full h-3 free_progress"
        style={{
          color: isFree ? "" : "#ffffff !important",
        }}
      ></progress>
    </div>
  );
}
