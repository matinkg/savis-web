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

  // const thumbnails = [];

  // if (selectedVariations?.gallery) {
  //   thumbnails.push(...(selectedVariations.gallery as []));
  // }

  // if (productDetails?.product?.image) {
  //   thumbnails.push(productDetails?.product?.image);
  // }

  // if (productDetails?.product?.gallery) {
  //   thumbnails.push(...productDetails.product.gallery);
  // }
  // setImages(thumbnails as any);
console.log(item)
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
      <div className="w-[90%] xl:w-[70%] grid grid-cols-2 gap-x-2 lg:gap-x-4">
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
          className="w-full h-[200px] rounded-md"
        />

        <div className="my-auto flex flex-col gap-y-2 font-peyda-600 text-sm lg:gap-y-3 lg:text-lg">
          {item?.is_preorder && (
            <span className="ml-2 px-2 py-1 w-20 text-xs lg:text-sm bg-yellow-400 text-white rounded-md">
              پیش‌فروش
            </span>
          )}
          <div className="flex items-center gap-x-2">
            {/* <button
              onClick={() =>
                handleDecrementItem(
                  item?.variation?.sku ||
                    item?.product?.sku ||
                    item?.product?.code ||
                    item?.gift_card?.code
                )
              }
            >
              <Minus className="w-5 h-5 cursor-pointer text-gray-600" />
            </button>
            <input
              type="number"
              value={Number(item.quantity || 1).toString()}
              readOnly
              className="w-12 text-center border border-gray-300 rounded-md"
            />
            <button
              onClick={() =>
                handleIncrementItem(
                  item?.variation?.sku ||
                    item?.product?.sku ||
                    item?.product?.code ||
                    item?.gift_card?.code
                )
              }
            >
              <Plus className="w-5 h-5 cursor-pointer text-gray-600" />
            </button> */}
          </div>
          <span className="block text-sm lg:text-base text-blue-1050">
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
              <span className="text-gray-600 text-xs lg:text-sm ml-2">
                | بسته‌بندی: {item?.box?.name} (
                {Number(item?.box?.price).toLocaleString("fa-IR")} تومان)
              </span>
            )}
            {item?.box?.id && (
              <button
                onClick={() => handleRemoveBox(item?.id as any)}
                className="ml-2 text-red-500 hover:text-red-700 text-xs lg:text-sm"
              >
                حذف بسته‌بندی
              </button>
            )}
          </span>

          {!item?.variation?.stock &&
          !item?.product?.stock &&
          item?.type === "product" ? (
            <span className="block text-xs text-slate-1000/50 lg:text-sm">
              اکنون موجود نیست؛ اما می‌توانید این محصول را پیش‌خرید کنید
            </span>
          ) : null}

          <div className="lg:hidden flex flex-col">
            {item?.["oldPrice"] ? (
              <span className="text-sm lg:text-base text-gray-500 line-through">
                {String(item?.oldPrice?.toLocaleString("fa-ir"))} تومان
              </span>
            ) : null}
            <span className="font-peyda-500 text-sm lg:text-base text-blue-1050">
              {String(item?.price?.toLocaleString("fa-ir"))} تومان
            </span>
          </div>
        </div>
      </div>

      <div className="w-[10%] xl:w-[30%] relative flex items-center justify-end pl-4">
        <Trash
          onClick={() =>
            handelRemoveItem(
              item?.id || item?.variation?.sku || item?.product?.sku
            )
          }
          className="absolute left-2 top-2 lg:left-4 lg:top-4 w-5 h-5 lg:h-6 lg:w-6 text-red-250 cursor-pointer"
        />
        <div className="hidden lg:flex flex-col items-end">
          {item?.oldPrice ? (
            <span className="text-sm lg:text-lg text-gray-500 line-through">
              {String(item?.oldPrice?.toLocaleString("fa-ir"))} تومان
            </span>
          ) : null}
          <span className="font-peyda-600 text-xs lg:text-lg text-blue-1050">
            {String(item?.price?.toLocaleString("fa-ir"))} تومان
          </span>
        </div>
      </div>
    </div>
  );
}
