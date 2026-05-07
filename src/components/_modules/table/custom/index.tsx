import { TableProps } from "@/libs/interface/table";
import React from "react";

const CustomTable = ({ columns, data, children, imgStyle }: TableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="min-w-full bg-white">
        <thead className="bg-cyan-150 text-white">
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="py-3 px-4 text-center font-iransans-SemiBold text-sm"
              >
                {column.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr key={row.id} className="hover:bg-sky-350/40 pointe">
              {columns.map((column, columnIndex) => (
                <td
                  key={column.accessor}
                  className="py-5 px-4 text-center font-iransans-SemiBold text-xs border-b"
                >
                  {columnIndex === 0 && row.images_url ? (
                    <img
                      src={row.images_url[0]}
                      alt="image"
                      className="w-16 h-16 m-auto rounded-2xl"
                    />
                  ) : (
                    columnIndex === 0 && (
                      <img
                        src={"/images/emptyImg/no-image.jpg"}
                        alt="No Image"
                        className="w-16 h-16 m-auto rounded-2xl"
                      />
                    )
                  )}
                  {columnIndex !== 0 && row[column.accessor]}
                  {columnIndex === columns.length - 1 && children}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
