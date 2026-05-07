import Link from "next/link";
import NotFoundIcon from "../../../public/icons/404";
import Button from "@/components/_modules/button";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <NotFoundIcon className="h-[146px] w-[210px] font-peyda-900 text-blue-1000" />
      <span className="mb-5 font-peyda-600 text-lg text-blue-1000 lg:text-2xl">
        صفحه مورد نظر یافت نشد
      </span>
      <span className="block text-center font-peyda-400 text-sm text-gray-550 lg:text-base">
        متاسفانه صفحه مورد نظر پیدا نشد ، از طریق دکمه
      </span>

      <span className="block text-center font-peyda-400 text-sm text-gray-550 lg:text-base">
        زیر وارد صفحه اصلی شوید و مجدد تلاش کنید
      </span>

      <Button className="mt-6 w-[161px] bg-blue-1000 py-2 font-peyda-400 text-base text-white lg:mt-10 lg:py-3 lg:text-lg">
        <Link href={"/"}>صفحه اصلی</Link>{" "}
      </Button>
    </div>
  );
}
