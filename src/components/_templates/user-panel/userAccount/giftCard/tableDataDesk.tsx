import Pagination from "@/components/_modules/pagination";
import { TabelDataProps } from "@/libs/interface/orderTabelProps";
import Link from "next/link";
import React from "react";

export default function TabelDataDesk({
  data,
  currentPage,
  lastPage,
  onPageChange,
}: TabelDataProps) {
  return (
    <>
      <div className="flex flex-col">
        {/* head */}
        <div className="grid grid-cols-6 border-b border-solid border-b-slate-1000/50 pb-[18px] font-peyda-500 text-[20px] text-blue-1050">
          <div className="">
            <span>کد سفارش</span>
          </div>
          <div className="">
            <span>تاریخ</span>
          </div>

          <div className="col-span-3">
            <span>مبلغ کد</span>
          </div>
          <div className="flex justify-center">
            <span>عملیات‌ها</span>
          </div>
        </div>

        <div className="flex flex-col gap-y-6 child:py-6">
          {data?.length > 0 ? (
            data.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 font-peyda-400 text-lg text-blue-1050"
              >
                <div className="flex items-center">
                  <span>#{Number(item.id).toLocaleString("fa")}</span>
                </div>

                <div className="flex items-center">
                  <span>
                    {new Date(item.created_at).toLocaleDateString("fa-IR")}
                  </span>
                </div>

                <div className="col-span-3 flex items-center gap-x-1">
                  <span className="tracking-wider">
                    {Number(item.amount).toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <div className="flex w-full items-center justify-center">
                  <Link
                    href={`/user-panel/giftCard/${item.id}`}
                    className="flex-center w-full bg-secendry py-2 font-peyda-400 text-white lg:py-3 xl:text-lg"
                  >
                    نمایش جزئیات
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="flex min-h-[350px] items-center justify-center rounded-xl">
              <span className="font-peyda-500 text-slate-500">
                هیچ کارت هدیه ای یافت نشد
              </span>
            </div>
          )}
        </div>

        {lastPage > 1 && data?.length > 0 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={lastPage}
          />
        )}
      </div>
    </>
  );
}
