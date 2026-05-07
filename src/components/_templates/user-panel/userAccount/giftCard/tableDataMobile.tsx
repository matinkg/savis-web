import Pagination from "@/components/_modules/pagination";
import { TabelDataProps } from "@/libs/interface/orderTabelProps";
import Link from "next/link";
import React from "react";

export default function TabelDataMobile({ data, currentPage, lastPage, onPageChange }: TabelDataProps) {
  return (
    <>
      <span className="mb-6 block text-center font-peyda-600 text-2xl text-blue-1050">
        گیفت کارت‌ها
      </span>
      <div className="flex flex-col gap-y-4">
        {data?.map((item) => (
          <div
            key={item?.id}
            className="flex flex-col gap-y-6 rounded bg-gray-250 p-4 shadow-sm"
          >
            <div className="flex items-center gap-x-4 font-peyda-400 text-base text-blue-1050">
              <span>کد سفارش</span>
              <span>#{Number(item?.id).toLocaleString("fa")}</span>
            </div>

            <div className="flex items-center gap-x-4 font-peyda-400 text-base text-blue-1050">
              <span>تاریخ</span>
              <span>
                {item?.created_at
                  ? new Date(item.created_at).toLocaleDateString("fa-IR")
                  : ""}
              </span>
            </div>

            <div className="flex items-center gap-x-4 font-peyda-400 text-base text-blue-1050">
              <span>مبلغ کد</span>
              <span>
                {Number(item?.amount)?.toLocaleString("fa")} تومان
              </span>
            </div>

            <div className="flex w-full justify-center">
              <Link
                href={`/user-panel/giftCard/${item?.id}`}
                className="flex-center w-full bg-secendry py-2 font-peyda-400 text-white lg:py-3 xl:text-lg"
              >
                نمایش جزئیات
              </Link>
            </div>
          </div>
        ))}

        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          totalPages={lastPage}
        />
      </div>
    </>
  );
}
