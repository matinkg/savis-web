import { CartAction, CartItem } from "@/libs/context/cart-shopping/interface";
import Trash from "@/public/icons/trash";
import React from "react";
import Link from "next/link";
import { request } from "@/configs/HTTPService";
import Image from "next/image";
import ImageIcon from "@/public/icons/image";

type propsType = {
  item: CartItem;
  dispatch: React.Dispatch<CartAction>;
  refreshCart: any;
};

export default function BasketCart({ item, dispatch, refreshCart }: propsType) {
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

  const currentData = item?.variation || item?.product || item?.gift_card;

  const price = Number(
    currentData?.price ?? item?.price ?? item?.gift_card?.price ?? 0,
  );

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

  const hasImage =
    item?.variation?.gallery?.length > 0 ||
    item?.product?.image ||
    item?.gift_card?.image;

  const isPreorder =
    Number(item?.product?.can_preorder ?? item?.variation?.can_preorder) ===
      1 && Number(item?.product?.stock ?? item?.variation?.stock ?? 0) === 0;

  const preorderFinalPrice =
    item?.variation?.preorder_final_price ??
    item?.product?.preorder_final_price;

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
        <div
          className={`relative col-span-5 lg:col-span-6 3xl:col-span-5 ${
            item?.type === "gift_card" ? "aspect-[17/10]" : "aspect-[5/5]"
          }`}
        >
          {hasImage ? (
            <Image
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
              fill
              className="rounded-md object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-100 rounded-md">
              <ImageIcon
                className={`h-16 w-16 3xl:w-24 3xl:h-24 ${isPreorder ? "text-yellow-600" : "text-primary"}`}
              />
            </div>
          )}

          {isPreorder && (
            <span className="absolute top-2 right-2 bg-yellow-600 text-white text-xs px-2 py-1 rounded-md">
              پیش‌فروش
            </span>
          )}
        </div>

        <div className="col-span-7 lg:col-span-6 3xl:col-span-7 my-auto flex flex-col gap-y-2 font-peyda-600 text-sm sm:gap-y-3 sm:text-lg">
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
            </Link>{" "}
            <span className="inline-block" dir="ltr">
              {item?.quantity}×
            </span>
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

            <div className="flex flex-col">
              <span className="font-peyda-500 text-sm sm:text-base text-blue-1050">
                {price.toLocaleString("fa-IR")} تومان
              </span>

              {isPreorder && preorderFinalPrice && (
                <span className="text-xs text-gray-500 mt-1">
                  پیش‌پرداخت:{" "}
                  {Number(preorderFinalPrice).toLocaleString("fa-IR")} تومان
                </span>
              )}
            </div>
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

          {isPreorder && preorderFinalPrice && (
            <span className="text-sm text-gray-500 mt-1">
              پیش‌پرداخت: {Number(preorderFinalPrice).toLocaleString("fa-IR")}{" "}
              تومان
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
