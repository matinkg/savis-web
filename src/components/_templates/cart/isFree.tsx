import React from "react";

interface IsFreeProps {
  price: number;
  threshold: number;
}

export default function IsFree({ price, threshold }: IsFreeProps) {
  const isFree = price >= threshold;

  const progress = threshold > 0 ? Math.min((price / threshold) * 100, 100) : 0;

  return (
    <div className="w-full flex flex-col gap-y-4 lg:gap-y-[18px] p-4 lg:p-6 bg-secendry">
      <span className="font-peyda-600 text-lg lg:text-2xl text-white">
        {isFree
          ? "ارسال سفارش شما، رایگان شد!"
          : `با ${(threshold - price).toLocaleString(
              "fa-IR",
            )} تومان خرید بیشتر، ارسال شما رایگان می‌شود`}
      </span>

      <progress
        value={progress}
        max="100"
        className="w-full h-3 free_progress"
      />
    </div>
  );
}
