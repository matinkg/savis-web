import Button from "@/components/_modules/button";
import Bag from "@/public/icons/Bag";
import Link from "next/link";
import React from "react";

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center gap-y-4 lg:gap-y-10">
      <Bag className="h-[120px] w-[120px] text-[#C5CACB] lg:h-[200px] lg:w-[200px]" />

      <div className="flex flex-col items-center gap-y-[18px] text-blue-1050">
        <span className="block text-center font-peyda-600 text-[32px] lg:text-[58px]">
          سبد خرید خالی است{" "}
        </span>
      </div>

      <Button className="w-fit bg-secendry px-[18px] py-3 font-peyda-400 text-sm text-white lg:text-lg">
        <Link href="/shop">بازگشت به فروشگاه</Link>
      </Button>
    </div>
  );
}
