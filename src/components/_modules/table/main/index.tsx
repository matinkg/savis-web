import { TableProps } from "@/libs/interface/table";

import React from "react";

const MainTable = ({ columns, data, children }: TableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="table w-full">
        <thead>
          <tr className="flex w-full justify-center items-center  bg-primary child:!border-none rounded-t-lg">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="w-1/4 py-2 px-4 md:py-4 md:px-6 text-center font-peyda-600 text-sm md:text-base text-white "
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          className="flex flex-col items-center  w-full h-[49vh] rounded-b-lg
            overflow-y-auto scrollbar scrollbar-track-rounded-full scrollbar-thumb-secendry 
            font-peyda-500 text-xs md:text-sm"
        >
          {data?.length ? (
            data &&
            data?.map((item: any, index: any) => (
              <tr
                key={item?.id}
                className="flex w-full  child:border-gray-200 "
              >
                <td className="py-2 px-4 md:py-4 md:px-6 flex w-full justify-center items-center">
                  {index + 1}
                </td>
                <td className="py-2 px-4 md:py-4 md:px-6 flex w-full justify-center items-center">
                  {item?.name}
                </td>
                <td className="py-2 px-4 md:py-4 md:px-6 flex w-full justify-center items-center">
                  {new Date(item?.created_at).toLocaleDateString("fa-IR")}
                </td>
                {/* =================================== بخش عملیات جدول  ============================================= */}
                <td className="py-2 px-4 md:py-4 md:px-6 flex w-full justify-center items-center gap-x-3">
                  {children}
                </td>
              </tr>
            ))
          ) : (
            <p className="w-fit font-peyda-600 text-gray-300 text-lg m-auto">
              هنوز هیچ ردیفی ایجاد نکرده اید !
            </p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
