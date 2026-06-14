"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../button";
import Like from "@/public/icons/Like";
import HeartBold from "@/public/icons/heartBold";
import ImageIcon from "@/public/icons/image";
import useWishOperation from "./hook/useWishOperation";
import { useCart } from "@/libs/context/cart-shopping/CartContext";
import Image from "next/image";
import { showSwal } from "@/helper/swal";
import BagIcon from "@/lib/assets/icons/bag";

type propsType = {
  product: any;
};

export default function ProductCard({ product }: propsType) {
  const [isAdded, setIsAdded] = useState(false);
  const [selectedVariations, setSelectedVariations] = useState<any>(null);
  const [like, setLike] = useState({ status: product?.isFavorite ?? false });
  const [isLoadingWish, setIsLoadingWish] = useState(false);

  const { handleAddToWishList } = useWishOperation();
  const { dispatch } = useCart();

  useEffect(() => {
    setSelectedVariations(product?.variations?.[0] ?? null);
  }, [product]);

  const handleWishListToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoadingWish) return;
    setIsLoadingWish(true);
    try {
      await handleAddToWishList(product?.id);
      setLike((prev) => ({ ...prev, status: !prev.status }));
    } catch (err) {
      console.error("wishlist error", err);
    } finally {
      setIsLoadingWish(false);
    }
  };

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

  const canPreorder = selectedVariations?.sku
    ? Number(selectedVariations?.can_preorder ?? 0) === 1
    : Number(product?.can_preorder ?? 0) === 1;

  const isOutOfStock = stock <= 0 && !canPreorder;

  const showPreorder = stock <= 0 && canPreorder;

  const rawDiscountText = selectedVariations?.sku
    ? (selectedVariations?.discount_text ?? "")
    : (product?.discount_text ?? "");

  const parsedDiscountNumber = Number(rawDiscountText.replace("%", "").trim());

  const discountDisplay = isNaN(parsedDiscountNumber)
    ? rawDiscountText
    : `${Math.round(parsedDiscountNumber).toLocaleString("fa-IR")}%`;

  const handleAddToCart = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    const isOutOfStockCompletely = stock <= 0 && !canPreorder;

    if (isOutOfStockCompletely) {
      return showSwal("این محصول موجود نمیباشد", "warning");
    }

    const is_preorder = stock <= 0 && canPreorder;

    let itemPrice = selectedVariations?.price ?? product?.price;

    if (is_preorder) {
      if (selectedVariations?.sku) {
        itemPrice =
          selectedVariations?.preorder_price_type === "fixed"
            ? itemPrice - selectedVariations?.preorder_price
            : itemPrice * (selectedVariations?.preorder_price / 100);
      } else {
        itemPrice =
          product?.preorder_price_type === "fixed"
            ? itemPrice - product?.preorder_price
            : itemPrice * (product?.preorder_price / 100);
      }
    }

    const itemToAdd = {
      product,
      slug: product?.slug,
      product_id: product?.id,
      name: selectedVariations?.name || product?.name,
      image: selectedVariations?.gallery?.[0] || product?.image,
      price: itemPrice,
      quantity: 1,
      sku: product?.sku,
      variation_sku: selectedVariations?.sku || "",
      variation: selectedVariations,
      color: selectedVariations?.color_name,
      stockQuantity: stock,
      wage: product?.wage,
      weight: selectedVariations?.weight || product?.weight,
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

    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  };

  return (
    <Link
      href={product?.slug}
      key={product?.id}
      className="w-full min-w-0 group relative"
    >
      <div className="flex h-full w-full flex-col justify-between gap-y-2 cursor-pointer bg-gray-250 p-2 transition-all sm:p-3 md:p-4 lg:bg-transparent lg:p-[14px] group-hover:lg:bg-gray-250">
        {/* Image Section */}
        <div className="relative">
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-[4/5] bg-white border border-gray-300 overflow-hidden flex items-center justify-center">
              {selectedVariations?.gallery?.[0] || product?.image ? (
                <Image
                  src={selectedVariations?.gallery?.[0] || product?.image}
                  alt={product?.name}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              ) : (
                <ImageIcon className="w-16 h-16 text-primary" />
              )}
            </div>
          </div>

          {/* Wish icon on top-left (only on mobile) */}
          <Button
            onClick={handleWishListToggle}
            disabled={isLoadingWish}
            className="flex-center absolute left-1 top-1 bg-transparent p-3 sm:left-2 sm:top-2 lg:hidden"
          >
            {isLoadingWish ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-1050"></div>
            ) : like.status ? (
              <HeartBold className="h-5 w-5 sm:h-6 sm:w-6 text-rose-600" />
            ) : (
              <Like className="h-5 w-5 sm:h-6 sm:w-6 text-blue-1050" />
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
            <div className="flex-center absolute right-[14px] top-[14px] z-10 w-fit bg-yellow-600 px-3 py-1.5 font-peyda-400 text-xs text-white">
              پیش سفارش
            </div>
          ) : null}
        </div>

        {/* Product name */}
        <div className="text-center font-peyda-500 text-sm sm:text-base md:text-lg text-blue-1050">
          {product?.name}
        </div>

        {/* Price and actions */}
        <div className="flex flex-col gap-y-2">
          <p className="pt-1 text-center font-peyda-500 text-xs sm:text-sm lg:text-base text-blue-1050">
            {isOutOfStock ? (
              "ناموجود"
            ) : hasDiscount ? (
              <>
                <span className="line-through text-gray-400 block">
                  {finalPriceBeforeDiscount.toLocaleString("fa-IR")} تومان
                </span>
                <span>{price.toLocaleString("fa-IR")} تومان</span>
              </>
            ) : (
              `${price.toLocaleString("fa-IR")} تومان`
            )}
          </p>

          {/* Cart and Wish buttons (only visible on hover for desktop) */}
          <div className="flex gap-x-3 transition-all lg:invisible lg:opacity-0 group-hover:lg:visible group-hover:lg:opacity-100 mt-auto">
            <Button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`grow py-2 sm:py-2.5 md:py-3 ${
                isOutOfStock
                  ? "bg-gray-200 opacity-50 cursor-default"
                  : "bg-white"
              }`}
            >
              <div className="flex-center gap-x-1">
                <span className="font-peyda-500 text-xs sm:text-sm lg:text-base text-blue-1050">
                  {isAdded
                    ? "اضافه شد!"
                    : isOutOfStock
                      ? "ناموجود"
                      : showPreorder
                        ? "افزودن (پیش‌فروش)"
                        : "افزودن به سبد خرید"}
                </span>
                {!isAdded && !isOutOfStock && (
                  <BagIcon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-1050" />
                )}
              </div>
            </Button>

            {/* Desktop wishlist button (always hidden on small) */}
            <Button
              onClick={handleWishListToggle}
              disabled={isLoadingWish}
              className="hidden lg:flex-center bg-white p-3"
            >
              {isLoadingWish ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-1050"></div>
              ) : like.status ? (
                <HeartBold className="h-5 w-5 lg:h-6 lg:w-6 text-rose-600" />
              ) : (
                <Like className="h-5 w-5 lg:h-6 lg:w-6 text-blue-1050" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
