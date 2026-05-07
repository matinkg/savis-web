"use client";
import Check from "@/public/icons/check";
import Trash from "@/public/icons/trash";
import WishCard from "@/components/_modules/wishCard";
import React, { useState } from "react";
import { request } from "@/configs/HTTPService";

interface Product {
  image: string;
  name: string;
  price: number;
}
interface WishItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
}

interface WishlistType {
  data: WishItem[];
}

export default function Wishlist({
  data,
}: WishlistType) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleChange = (id: string) => {
    const updatedCheckedItems = new Set(checkedItems);
    if (updatedCheckedItems.has(id)) {
      updatedCheckedItems.delete(id);
    } else {
      updatedCheckedItems.add(id);
    }
    setCheckedItems(updatedCheckedItems);
  };

  const handleSelectAll = () => {
    if (checkedItems.size === data.length) {
      setCheckedItems(new Set()); 
    } else {
      const allItemIds = data.map((item) => item.id);
      setCheckedItems(new Set(allItemIds)); 
    }
  };

  const handelDeleteAllWishItem = () =>{
    request("/api/v1/user/delete-all-wish", 'post', Array.from(checkedItems)).then(res=>{
      if(res?.success) window.location.reload();
    })
  }

  return (
    <div className="mb-10 w-full space-y-6 lg:mb-[60px]">
      <div className="flex items-center gap-x-5 bg-gray-250 px-3 py-3 lg:gap-x-7 lg:py-[18px]">
        <div
          onClick={handelDeleteAllWishItem}
          className="flex cursor-pointer items-center gap-x-3"
        >
          <Trash className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
          <span className="font-peyda-400 text-sm text-blue-1050 lg:text-base">
            حذف
          </span>
        </div>
        <div
          onClick={handleSelectAll}
          className="flex cursor-pointer items-center gap-x-3"
        >
          <Check className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
          <span className="font-peyda-400 text-sm text-blue-1050 lg:text-base">
            انتخاب همه
          </span>
        </div>
      </div>

      <div className="flex w-full items-end justify-between border-b border-solid border-b-[#C8CECF] child:pb-5">
        <h1 className="font-peyda-800 text-xl text-blue-1050 lg:text-[32px]">
          محصولات علاقه مندی شما
        </h1>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4">
        {data?.map((item) => (
          <WishCard
            item={item}
            checked={checkedItems.has(item.id)}
            handleChange={() => handleChange(item.id)}
            key={item?.id}
          />
        ))}
      </div>
    </div>
  );
}
