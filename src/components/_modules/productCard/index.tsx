"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "../button";
import Like from "@/public/icons/Like";
import Bag from "@/public/icons/Bag";
import HeartBold from "@/public/icons/heartBold";
import ImageIcon from "@/public/icons/image";
import useWishOperation from "./hook/useWishOperation";
import { useCart } from "@/libs/context/cart-shopping/CartContext";
import Image from "next/image";
import { showSwal } from "@/helper/swal";

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

  const handleAddToCart = () => {
    const is_preorder =
      selectedVariations?.stock <= 0 && selectedVariations?.can_preorder;

    const hasStock =
      selectedVariations?.stock > 0 || selectedVariations?.can_preorder;

    if (!hasStock) return showSwal("موجودی ناکافی!", "warning");

    const price = is_preorder
      ? selectedVariations?.preorder_price_type === "fixed"
        ? selectedVariations.price - selectedVariations.preorder_price
        : selectedVariations.price * (selectedVariations.preorder_price / 100)
      : selectedVariations?.price;

    const itemToAdd = {
      product,
      slug: product?.slug,
      product_id: product?.id,
      name: selectedVariations?.name || product?.name,
      image: selectedVariations?.gallery?.[0] || product?.image,
      price,
      quantity: 1,
      sku: product?.sku,
      variation_sku: selectedVariations?.sku || "",
      variation: selectedVariations,
      color: selectedVariations?.color_name,
      stockQuantity: selectedVariations?.stock || 0,
      wage: product?.wage,
      weight: selectedVariations?.weight || product?.weight,
      type: "product",
    };

    dispatch({ type: "ADD_ITEM", item: itemToAdd, dispatch });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
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
        </div>

        {/* Product name */}
        <div
          className="text-center font-peyda-500 text-sm sm:text-base md:text-lg text-blue-1050"
        >
          {product?.name}
        </div>

        {/* Price and actions */}
        <div className="flex flex-col gap-y-2">
          <p className="pt-1 text-center font-peyda-500 text-xs sm:text-sm lg:text-base text-blue-1050">
            {selectedVariations?.price || product?.price
              ? Number(
                  selectedVariations?.price || product?.price
                ).toLocaleString("fa-IR") + " تومان"
              : "ناموجود"}
          </p>

          {/* Cart and Wish buttons (only visible on hover for desktop) */}
          <div className="flex gap-x-3 transition-all lg:invisible lg:opacity-0 group-hover:lg:visible group-hover:lg:opacity-100 mt-auto">
            <Button className="grow bg-white py-2 sm:py-2.5 md:py-3">
              <div className="flex-center gap-x-1" onClick={handleAddToCart}>
                <span className="font-peyda-500 text-xs sm:text-sm lg:text-base text-blue-1050">
                  افزودن به سبد خرید
                </span>
                <Bag className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-blue-1050" />
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
