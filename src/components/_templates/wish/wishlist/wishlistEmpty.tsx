import Button from "@/components/_modules/button";
import Like from "@/public/icons/Like";
import Link from "next/link";
import React from "react";

export default function WishlistEmpty() {
  return (
    <div className="flex flex-col items-center gap-y-4 lg:gap-y-10">
      <Like className="h-[120px] w-[120px] text-[#C5CACB] lg:h-[200px] lg:w-[200px]" />

      <div className="flex flex-col items-center gap-y-[18px] text-blue-1050">
        <span className="block text-center font-peyda-600 text-[32px] lg:text-[58px]">
          لیست علاقه مندی ها خالیست
        </span>

        <span className="block font-peyda-400 text-lg lg:text-2xl">
          شما محصولی را به این لیست اضافه نکرده‌ایید
        </span>
      </div>

      <Button className="w-fit bg-secendry px-[18px] py-3 font-peyda-400 text-sm text-white lg:text-lg">
        <Link href="/">بازگشت به فروشگاه</Link>
      </Button>
    </div>
  );
}
