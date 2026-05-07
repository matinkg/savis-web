import Button from "@/components/_modules/button";
import Pagination from "@/components/_modules/pagination";
import { TabelDataProps } from "@/libs/interface/orderTabelProps";
import Link from "next/link";
import React from "react";

export default function OrderTabelDesk({
  data,
  currentPage,
  lastPage,
  onPageChange,
}: TabelDataProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار";
      case "paid":
        return "پرداخت شده";
      case "processing":
        return "در حال پردازش";
      case "shipped":
        return "ارسال شده";
      case "delivered":
        return "تحویل شده";
      default:
        return "لغو شده";
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="grid grid-cols-6 border-b border-solid border-b-slate-1000/50 pb-[18px] font-peyda-500 text-[20px] text-blue-1050">
          <div>
            <span>کد سفارش</span>
          </div>
          <div>
            <span>تاریخ</span>
          </div>
          <div>
            <span>وضعیت</span>
          </div>
          <div className="col-span-2">
            <span>مجموع</span>
          </div>
          <div className="flex justify-center">
            <span>عملیات‌ها</span>
          </div>
        </div>

        {data?.length > 0 ? (
          <div className="flex flex-col gap-y-6 child:py-6">
            {data?.map((item) => {
              const itemsLenght = item.items?.length || 1;
              return (
                <div
                  key={item?.id}
                  className="grid grid-cols-6 font-peyda-400 text-lg text-blue-1050"
                >
                  <div className="flex items-center">
                    <span>#{Number(item?.id).toLocaleString("fa")}</span>
                  </div>
                  <div className="flex items-center">
                    <span>
                      {new Date(item?.created_at)?.toLocaleDateString("fa-ir")}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span>{getStatusLabel(item?.status)}</span>
                  </div>
                  <div className="col-span-2 flex items-center gap-x-1">
                    <span className="tracking-wider">
                      {Number(item?.total_amount)?.toLocaleString("fa-ir")}{" "}
                      تومان
                    </span>

                    <span className="tracking-wider">
                      برای {itemsLenght.toLocaleString("fa")} مورد
                    </span>
                  </div>
                  <div className="flex w-full items-center justify-center">
                    <Link
                      href={`/user-panel/orders/${item?.id}`}
                      className="flex-center w-full bg-secendry py-2 font-peyda-400 text-white lg:py-3 xl:text-lg"
                    >
                      نمایش جزئیات
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-6 text-center font-peyda-500 text-lg text-gray-500">
            هیچ سفارشی یافت نشد.
          </div>
        )}

        {lastPage > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={lastPage}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </>
  );
}
