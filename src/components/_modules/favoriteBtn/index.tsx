"use client";
import React from "react";
import Button from "../button";
import HeartBold from "@/public/icons/heartBold";
import Like from "@/public/icons/Like";

type FavoriteButtonProps = {
  productDetails: any;
  handleAddToWishList: any;
};

export default function FavoriteButton({
  productDetails,
  handleAddToWishList,
}: FavoriteButtonProps) {
  return (
    <Button
      onClick={() => {
        handleAddToWishList(productDetails?.product?.id || productDetails?.id);
      }}
      className="grow flex-center gap-x-2 border border-solid border-secendry p-2 font-peyda-400 text-secendry lg:px-[18px] lg:py-3"
    >
      <span className="hidden lg:block">افزودن به علاقه مندی</span>

      {productDetails?.isFavorite || productDetails?.product?.isFavorite ? (
        <HeartBold className="h-5 w-5 text-secendry lg:h-6 lg:w-6" />
      ) : (
        <Like className={`h-5 w-5 text-secendry lg:h-6 lg:w-6`} />
      )}
    </Button>
  );
}
