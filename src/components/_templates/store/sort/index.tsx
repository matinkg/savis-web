import React from "react";
import useSortOperation from "./hook/useSortOperation";
import { useSearchParams } from "next/navigation";
import { Check } from "lucide-react";

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
  const searchParams = useSearchParams();

  const activeSort = searchParams.get("sort");

  return (
    <div className="absolute -bottom-[137px] -left-3 lg:-bottom-[173px] lg:-left-4 z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-[117px] sm:w-[137px] lg:w-[173px] bg-white border border-blue-1050 flex flex-col">
      {sortingArray.map((item) => {
        const isActive = activeSort === item.value;

        return (
          <div
            key={item.id}
            onClick={() => handleFilterChange(item.value)}
            className={`flex items-center justify-between px-3 py-1.5 cursor-pointer text-sm sm:text-base
              ${isActive ? "bg-gray-250 font-peyda-600" : "hover:bg-gray-250"}`}
          >
            <span>{item.name}</span>

            {isActive && <Check size={16} />}
          </div>
        );
      })}
    </div>
  );
}
