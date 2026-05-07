import { DataObject } from "@/libs/interface/orderTabelProps";
import React from "react";

export default function Notification({ id, created_at, status }: DataObject) {
  return (
    <div className="bg-gray-250 p-[18px]">
      <p className="flex items-center gap-x-1 font-peyda-500 text-sm text-black/50 lg:text-[18px]">
        کد سفارش
        <span className="text-blue-1050">#{Number(id).toLocaleString("fa")}</span>
        در تاریخ
        <span className="text-blue-1050">
          {created_at.toLocaleDateString("fa-ir")}
        </span>
        ثبت شده است و در حال حاضر در وضعیت 
        <span className="text-blue-1050">{status}</span>
        می‌باشد.
      </p>
    </div>
  );
}
