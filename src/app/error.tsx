"use client";
import Button from "@/components/_modules/button";
import NotFoundIcon from "../../public/icons/404";
import Link from "next/link";
export default function Error() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <NotFoundIcon className="h-[146px] w-[210px] font-peyda-900 text-secendry" />
      <span className="mb-5 font-peyda-600 text-lg text-secendry lg:text-2xl">
        خطایی در سرور رخ داده است
      </span>
      <span className="block text-center font-peyda-400 text-sm text-gray-550 lg:text-base">
        متاسفانه صفحه مورد نظر خطا دارد ، از طریق دکمه
      </span>

      <span className="block text-center font-peyda-400 text-sm text-gray-550 lg:text-base">
        زیر وارد صفحه اصلی شوید و مجدد تلاش کنید
      </span>

      <Button className="mt-6 w-[161px] bg-secendry py-2 font-peyda-400 text-base text-white lg:mt-10 lg:py-3 lg:text-lg">
        <Link href={"/"}>صفحه اصلی</Link>
      </Button>
    </div>
  );
}
