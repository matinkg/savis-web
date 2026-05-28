import { CartAction, CartItem } from "@/libs/context/cart-shopping/interface";
import Trash from "@/public/icons/trash";
import React from "react";
import Link from "next/link";
import { request } from "@/configs/HTTPService";
import Image from "next/image";

type propsType = {
  item: CartItem;
  dispatch: React.Dispatch<CartAction>;
  refreshCart: any;
};

export default function BasketCart({
  item,
  dispatch,
  refreshCart,
}: propsType) {
  const handelRemoveItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", id, dispatch });
  };

  const handleIncrementItem = (sku: string) => {
    dispatch({ type: "INCREMENT_ITEM", sku, dispatch });
  };

  const handleDecrementItem = (sku: string) => {
    dispatch({ type: "DECREMENT_ITEM", sku, dispatch });
  };

  const handleRemoveBox = async (id: number) => {
    request("/api/v1/cart/remove-box/" + id, "DELETE");
    refreshCart();
  };

  const currentData = item?.variation || item?.product;

  const price = Number(currentData?.price || item?.price || 0);

  const discountValue = Number(
    currentData?.discount ??
      currentData?.discount_value ??
      item?.product?.discount ??
      item?.product?.discount_value ??
      0,
  );

  const discountType =
    currentData?.discount_type || item?.product?.discount_type;

  const hasDiscount = discountValue > 0;

  let oldPrice = price;

  if (hasDiscount) {
    if (discountType === "fixed") {
      oldPrice = price + discountValue;
    }

    if (discountType === "percentage") {
      oldPrice = Math.round(price / (1 - discountValue / 100));
    }
  }

  return (
    <div
      key={
        item?.variation?.sku ||
        item?.product?.sku ||
        item?.product?.code ||
        item?.gift_card?.id
      }
      className="w-full flex bg-gray-250 p-4 rounded-lg shadow-sm"
    >
      <div className="w-[90%] sm:w-[60%] xl:w-[50%] grid grid-cols-12 gap-x-4">
        <Image
          width={250}
          height={200}
          src={
            item?.variation?.gallery?.length > 0
              ? item?.variation?.gallery[0]
              : (item?.product?.image ?? item?.gift_card?.image ?? "")
          }
          alt={
            item?.variation?.name ??
            item?.product?.name ??
            item?.gift_card?.name ??
            ""
          }
          className="rounded-md object-cover col-span-5 lg:col-span-6 3xl:col-span-5"
        />

        <div className="col-span-7 lg:col-span-6 3xl:col-span-7 my-auto flex flex-col gap-y-2 font-peyda-600 text-sm sm:gap-y-3 sm:text-lg">
          {item?.is_preorder && (
            <span className="ml-2 px-2 py-1 w-20 text-xs sm:text-sm bg-yellow-400 text-white rounded-md">
              پیش‌فروش
            </span>
          )}

          <div className="flex items-center gap-x-2">
            {/* quantity actions */}
          </div>

          <span className="block text-sm sm:text-base text-blue-1050">
            <Link
              href={item?.product?.slug || item?.gift_card?.slug || "#"}
              className="hover:underline"
            >
              {item?.variation?.name ??
                item?.product?.name ??
                item?.gift_card?.name}
            </Link>
             × {item?.quantity}

            {item?.box?.id && (
              <span className="text-gray-600 text-xs sm:text-sm ml-2">
                | بسته‌بندی: {item?.box?.name} (
                {Number(item?.box?.price).toLocaleString("fa-IR")} تومان)
              </span>
            )}

            {item?.box?.id && (
              <button
                onClick={() => handleRemoveBox(item?.id as any)}
                className="ml-2 text-red-500 hover:text-red-700 text-xs sm:text-sm"
              >
                حذف بسته‌بندی
              </button>
            )}
          </span>

          {!item?.variation?.stock &&
          !item?.product?.stock &&
          item?.type === "product" ? (
            <span className="block text-xs text-slate-1000/50 md:text-sm">
              اکنون موجود نیست؛ اما می‌توانید این محصول را پیش‌خرید کنید
            </span>
          ) : null}

          {/* MOBILE PRICE */}
          <div className="sm:hidden flex flex-col">
            {hasDiscount && (
              <span className="text-sm sm:text-base text-gray-500 line-through">
                {oldPrice.toLocaleString("fa-IR")} تومان
              </span>
            )}

            <span className="font-peyda-500 text-sm sm:text-base text-blue-1050">
              {price.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>
      </div>

      <div className="w-[10%] sm:w-[40%] xl:w-[50%] relative flex items-center justify-end pl-4">
        <Trash
          onClick={() =>
            handelRemoveItem(
              item?.id || item?.variation?.sku || item?.product?.sku,
            )
          }
          className="absolute left-2 top-2 sm:left-4 sm:top-4 w-5 h-5 sm:h-6 sm:w-6 text-red-250 cursor-pointer"
        />

        <div className="hidden sm:flex flex-col items-end mt-2.5">
          {hasDiscount && (
            <span className="text-sm sm:text-base md:text-lg text-gray-500 line-through">
              {oldPrice.toLocaleString("fa-IR")} تومان
            </span>
          )}

          <span className="font-peyda-600 text-xs sm:text-base md:text-lg text-blue-1050">
            {price.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>
    </div>
  );
}