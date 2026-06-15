import React from "react";
import useSortOperation from "./hook/useSortOperation";

const sortingArray = [
  {
    id: "@#12/",
    name: "جدید ترین",
    value: "newest",
  },
  {
    id: "@#12*",
    name: "قدیمی ترین",
    value: "oldest",
  },
  {
    id: "@#12-",
    name: "بالاترین قیمت",
    value: "expensive",
  },
  {
    id: "@#12+",
    name: "پایین ترین قیمت",
    value: "cheapest",
  },
];
export default function Sort() {
  const { handleFilterChange } = useSortOperation();

  return (
    <div className="absolute -bottom-[137px] -left-3 lg:-bottom-[173px] lg:-left-4 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-[107px] lg:w-[173px] bg-white border-solid border border-blue-1050 flex flex-col items-center">
      {sortingArray.map((item) => (
        <div
          onClick={() => handleFilterChange(item.value)}
          key={item?.id}
          className="font-peyda-500 text-xs lg:text-base hover:bg-gray-250 py-1.5 w-full text-center cursor-pointer"
        >
          <span> {item.name}</span>
        </div>
      ))}
    </div>
  );
}
