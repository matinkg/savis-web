"use client";
import EditIcon from "@/public/icons/edit";
import SettingIcon from "@/public/icons/setting";
import Trash from "@/public/icons/trash";
import VariationIcon from "@/public/icons/variation";
import Link from "next/link";
import React from "react";

interface TableSettingProps {
  removeItem: any;
  editUrl: string;
  displayUrl: string;
  displayName: string;
  isVariation?: boolean;
  customeElement?: React.ReactNode;
}

export default function TableSetting({
  removeItem,
  displayName,
  editUrl,
  displayUrl,
  isVariation,
  customeElement,
}: TableSettingProps) {
  return (
    <div className="relative group inline-block ">
      <SettingIcon className="w-6 h-6 text-secendry" />

      <div className="absolute  -left-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pt-2 w-[200px] !z-50">
        <div className="relative w-full py-1 bg-white border border-gray-200 rounded-md shadow-xl">
          {/*Shape */}
          <div className="absolute top-0 left-0 w-4 h-4 origin-center transform rotate-45 translate-x-5 -translate-y-2 bg-white border-t border-l border-gray-200 rounded-sm pointer-events-none"></div>
          {/*Shape */}
          <div className="relative child:cursor-pointer">
            {customeElement}
            <div
              onClick={removeItem}
              className="flex items-center gap-x-1 w-full  px-4 py-2 font-peyda-600 text-xs text-gray-550  hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out"
            >
              <Trash className="w-4 h-4 text-red-500" />
              <span> حذف</span>
            </div>
            <Link
              href={editUrl}
              className="flex items-center gap-x-1 w-full  px-4 py-2 font-peyda-600 text-xs text-gray-550  hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out"
            >
              <EditIcon className="w-4 h-4 text-green-500" />
              <span>ویرایش</span>
            </Link>
            <Link
              href={displayUrl}
              className="flex items-center gap-x-1 w-full  px-4 py-2 font-peyda-600 text-xs text-gray-550  hover:bg-gray-100 focus:outline-none hover:text-gray-900 focus:text-gray-900 focus:shadow-outline transition duration-300 ease-in-out border-solid border-t border-t-slate-100"
            >
              <span>{displayName}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
