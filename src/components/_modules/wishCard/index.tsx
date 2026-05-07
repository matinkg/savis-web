"use client";

import Link from "next/link";
import React, { useState } from "react";
import Button from "../button";
import Bag from "@/public/icons/Bag";
import Trash from "@/public/icons/trash";
import useWishOperation from "../productCard/hook/useWishOperation";

export default function WishCard({ item, checked, handleChange }: any) {
  const [isLoadingWish, setIsLoadingWish] = useState(false);

  const { handleAddToWishList } = useWishOperation();

  const handleWishListToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLoadingWish) return;
    setIsLoadingWish(true);

    try {
      await handleAddToWishList(item?.id);
      window.location.reload();
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setIsLoadingWish(false);
    }
  };

  return (
    <div key={item?.id} className="group relative">
      <div className="cursor-pointer bg-transparent p-2 transition-all lg:p-[14px] group-hover:lg:bg-gray-250">
        <div className="relative ">
          <Link href={``}>
            <img
              src={item?.image}
              alt={item?.name}
              className="w-full h-auto object-cover "
            />
          </Link>

          <div className="absolute left-3 right-3 top-3 flex items-center justify-between">
            <Button
              onClick={(e) => handleWishListToggle(e)}
              className="flex-center group bg-gray-250 p-1 text-blue-1050 hover:bg-rose-600 hover:text-white"
            >
              <Trash className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
            </Button>

            <label className="main">
              <input
                type="checkbox"
                checked={checked}
                onChange={handleChange}
              />
              <span className="checkbox-container"></span>
            </label>
          </div>
        </div>
        <div className="my-3 flex flex-col items-center gap-y-3">
          <Link
            className="pb-1 font-peyda-500 text-sm text-blue-1050 lg:text-lg"
            href={``}
          >
            {item?.name}
          </Link>

          <span className="pt-1 text-center font-peyda-500 text-xs text-blue-1050 lg:text-base">
            {Number(item?.price).toLocaleString("fa-IR")}
            تومان
          </span>
        </div>

        <div className="hidden gap-x-3 transition-all lg:invisible lg:flex lg:opacity-0 group-hover:lg:visible group-hover:lg:opacity-100">
          <Button className="flex-center w-full gap-x-1 bg-white py-2 lg:py-3">
            <span className="font-peyda-400 text-xs text-blue-1050 lg:text-lg">
              افزودن به سبد خرید
            </span>

            <Bag className="h-[18px] w-[18px] text-blue-1050 lg:h-6 lg:w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
