"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import swal from "sweetalert";

import Button from "@/components/_modules/button";
import useWishOperation from "@/components/_modules/productCard/hook/useWishOperation";
import { useCart } from "@/libs/context/cart-shopping/CartContext";

import Bag from "@/public/icons/Bag";
import HeartBold from "@/public/icons/heartBold";
import Like from "@/public/icons/Like";
import ImageIcon from "@/public/icons/image";
import Check from "@/public/icons/check";

type PropsType = {
  product: any;
  getDataFromServer?: any;
};

export default function ProductCard({ product }: PropsType) {
  const router = useRouter();
  const { dispatch } = useCart();
  const { handleAddToWishList } = useWishOperation();

  const [isAdded, setIsAdded] = useState(false);
  const [isLoadingWish, setIsLoadingWish] = useState(false);
  const [selectedVariations, setSelectedVariations] = useState<any>(null);

  const [like, setLike] = useState({
    status: product?.isFavorite ?? false,
    productId: product?.id,
  });

  useEffect(() => {
    setSelectedVariations(product?.variations?.[0] || null);
  }, [product]);

  const price = Number(
    selectedVariations?.sku
      ? (selectedVariations?.price ?? 0)
      : (product?.price ?? 0),
  );

  const finalPriceBeforeDiscount = Number(
    selectedVariations?.sku
      ? (selectedVariations?.final_price_before_discount ?? 0)
      : (product?.final_price_before_discount ?? 0),
  );

  const discountText = selectedVariations?.sku
    ? (selectedVariations?.discount_text ?? "")
    : (product?.discount_text ?? "");

  const hasDiscount =
    discountText &&
    discountText !== "0%" &&
    discountText !== "0" &&
    finalPriceBeforeDiscount > price;

  const stock = selectedVariations?.sku
    ? Number(selectedVariations?.stock ?? 0)
    : Number(product?.stock ?? 0);

  const isPreorder = selectedVariations?.sku
    ? Number(selectedVariations?.can_preorder ?? 0) === 1
    : Number(product?.can_preorder ?? 0) === 1;

  const isOutOfStock = stock <= 0 && !isPreorder;

  const showPreorder = stock <= 0 && isPreorder;

  const productImage = product?.image || product?.gallery?.[0];

  const handleWishListToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLoadingWish) return;

    setIsLoadingWish(true);

    try {
      await handleAddToWishList(product?.id);

      setLike((prev) => ({
        ...prev,
        status: !prev.status,
      }));
    } catch (error) {
      console.error("Error updating wishlist:", error);
    } finally {
      setIsLoadingWish(false);
    }
  };

  const handleAddToCart = () => {
    const isOutOfStockCompletely = stock <= 0 && !isPreorder;

    if (isOutOfStockCompletely) {
      return swal({
        title: "این محصول موجود نمیباشد",
        text: "متأسفیم، این محصول در حال حاضر موجود نمیباشد.",
        icon: "warning",
        buttons: {
          confirm: {
            text: "بستن",
            value: true,
            visible: true,
            closeModal: true,
          },
        },
      });
    }

    const is_preorder = stock <= 0 && isPreorder;

    const itemToAdd = {
      product,
      slug: product?.slug,
      product_id: product?.id,
      name: product?.name,
      image: product?.image,
      price: selectedVariations?.price ?? product?.price,
      quantity: 1,
      sku: product?.sku,
      variation_sku: selectedVariations?.sku || "",
      variation: null,
      color: "",
      stockQuantity: selectedVariations?.stock ?? product?.stock ?? 0,
      wage: product?.wage,
      weight: selectedVariations?.weight ?? product?.weight,
      type: "product",
      is_preorder,
      pricing: {
        base_price: selectedVariations?.base_price ?? product?.base_price ?? 0,
        markup_price:
          selectedVariations?.markup_price ?? product?.markup_price ?? 0,
        discount_amount:
          selectedVariations?.discount_amount ?? product?.discount_amount ?? 0,
        tax_amount: selectedVariations?.tax_amount ?? product?.tax_amount ?? 0,
      },
    };

    dispatch({
      type: "ADD_ITEM",
      item: itemToAdd,
      dispatch,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const rawDiscountText = selectedVariations?.sku
    ? (selectedVariations?.discount_text ?? "")
    : (product?.discount_text ?? "");

  const parsedDiscountNumber = Number(rawDiscountText.replace("%", "").trim());

  const discountDisplay = isNaN(parsedDiscountNumber)
    ? rawDiscountText
    : `${Math.round(parsedDiscountNumber).toLocaleString("fa-IR")}%`;

  return (
    <div className="group mx-auto flex w-full flex-col gap-y-4">
      <div className="relative w-full">
        <Button
          onClick={handleWishListToggle}
          disabled={isLoadingWish}
          className="absolute left-2 top-2 z-10 rounded-md bg-gray-250 p-2 transition-all hover:scale-105"
        >
          {isLoadingWish ? (
            <div className="h-5 w-5 animate-spin rounded-full border-t-2 border-blue-1050" />
          ) : like.status ? (
            <HeartBold className="h-5 w-5 text-rose-600 sm:h-6 sm:w-6" />
          ) : (
            <Like className="h-5 w-5 text-blue-1050 sm:h-6 sm:w-6" />
          )}
        </Button>

        {hasDiscount ? (
          <div className="flex-center absolute right-[14px] top-[14px] z-10 w-fit bg-red-250 px-3 py-1.5 font-peyda-400 text-xs text-white">
            {discountDisplay} تخفیف
          </div>
        ) : isOutOfStock ? (
          <div className="flex-center absolute right-[14px] top-[14px] z-10 w-fit bg-slate-1000/50 px-3 py-1.5 font-peyda-400 text-xs text-white">
            ناموجود
          </div>
        ) : showPreorder ? (
          <div
            className={`flex-center absolute right-[14px] top-[14px] z-10 w-fit px-3 py-1.5 font-peyda-400 text-xs text-white ${isPreorder ? "bg-yellow-600" : "bg-secendry"}`}
          >
            پیش سفارش
          </div>
        ) : null}

        <div
          className="cursor-pointer"
          onClick={() => router.push(product?.slug ?? "")}
        >
          <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-md border border-gray-200 bg-white">
            {productImage ? (
              <Image
                src={productImage}
                alt={product?.name}
                fill
                sizes="(min-width: 768px) 20vw, 45vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <ImageIcon
                className={`mb-4 h-16 w-16 xs:h-24 xs:w-24 sm:h-32 sm:w-32 ${isPreorder ? "text-yellow-600" : "text-primary"}`}
              />
            )}
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="absolute bottom-3 left-1/2 flex w-[90%] -translate-x-1/2 items-center justify-center gap-x-2 rounded-md bg-gray-250 py-2 shadow transition-all sm:py-2.5 lg:py-3"
        >
          {isAdded ? (
            <>
              <Check className="h-5 w-5 text-blue-1050" />
              <span className="font-peyda-400 text-xs text-blue-1050 sm:text-sm lg:text-base">
                به سبد خرید اضافه شد!
              </span>
            </>
          ) : (
            <>
              <span className="font-peyda-400 text-xs text-blue-1050 sm:text-sm lg:text-base">
                {showPreorder ? "افزودن (پیش‌فروش)" : "افزودن به سبد خرید"}
              </span>
              <Bag className="h-4 w-4 text-blue-1050 sm:h-5 sm:w-5" />
            </>
          )}
        </Button>
      </div>

      <div className="flex flex-col items-center gap-y-2 text-center">
        <Link
          href={product?.slug ?? ""}
          className="font-peyda-500 text-sm text-slate-1000 sm:text-base lg:text-lg"
        >
          {product?.name}
        </Link>

        <div className="flex items-center gap-x-2">
          {isOutOfStock ? (
            <span className="font-peyda-500 text-xs text-red-500 sm:text-sm lg:text-base">
              ناموجود
            </span>
          ) : (
            <>
              {hasDiscount && (
                <span className="text-sm text-gray-400 line-through sm:text-base">
                  {Number(finalPriceBeforeDiscount).toLocaleString("fa-IR")}{" "}
                  تومان
                </span>
              )}

              <span className="font-peyda-500 text-xs text-blue-1050 sm:text-sm lg:text-base">
                {Number(price).toLocaleString("fa-IR")} تومان
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
