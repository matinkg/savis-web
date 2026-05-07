import Button from "@/components/_modules/button";
import Pagination from "@/components/_modules/pagination";
import { TabelDataProps } from "@/libs/interface/orderTabelProps";
import Link from "next/link";
import React from "react";

export default function OrderTabelMobile({
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
      <span className="mb-6 block text-center font-peyda-600 text-2xl text-blue-1050">
        سفارش‌ها
      </span>
      <div className="flex flex-col gap-y-4">
        {data?.length > 0 ? (
          data?.map((item) => {
            const itemsLenght = item.items?.length || 1;
            return (
              <div
                key={item?.id}
                className="flex flex-col gap-y-6 bg-gray-250 p-4"
              >
                <div className="flex items-center gap-x-6 font-peyda-400 text-lg text-blue-1050">
                  <span>کد سفارش:</span>
                  <span>{Number(item?.id).toLocaleString("fa")}</span>
                </div>

                <div className="flex items-center gap-x-6 font-peyda-400 text-lg text-blue-1050">
                  <span>تاریخ:</span>
                  <span>
                    {new Date(item?.created_at)?.toLocaleDateString("fa-ir")}
                  </span>
                </div>

                <div className="flex items-center gap-x-6 font-peyda-400 text-lg text-blue-1050">
                  <span>وضعیت:</span>
                  <span>{getStatusLabel(item?.status)}</span>
                </div>

                <div className="flex items-center gap-x-6 font-peyda-400 text-lg text-blue-1050">
                  <span>مجموع:</span>
                  <div className="flex flex-col gap-y-1">
                    <span className="tracking-wider">
                      {Number(item?.total_amount)?.toLocaleString("fa-ir")}{" "}
                      تومان
                    </span>
                    <span className="tracking-wider">
                      برای {itemsLenght.toLocaleString("fa")} مورد
                    </span>
                  </div>
                </div>

                <div className="flex w-full justify-center">
                  <Link
                    href={`/user-panel/orders/${item?.id}`}
                    className="flex-center w-full bg-secendry py-2 font-peyda-400 text-white lg:py-3 xl:text-lg"
                  >
                    نمایش جزئیات
                  </Link>
                </div>
              </div>
            );
          })
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
