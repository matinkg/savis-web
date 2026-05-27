"use client";
import Button from "@/components/_modules/button";
import Bag from "@/public/icons/Bag";
import HeartBold from "@/public/icons/heartBold";
import Like from "@/public/icons/Like";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ImageIcon from "@/public/icons/image";
import useWishOperation from "@/components/_modules/productCard/hook/useWishOperation";
import { useCart } from "@/libs/context/cart-shopping/CartContext";
import Check from "@/public/icons/check";
import swal from "sweetalert";
import Image from "next/image";

type propsType = {
  product: any;
  getDataFromServer?: any;
};

export default function ProductCard({ product }: propsType) {
  const [like, setLike] = useState({
    status: product?.isFavorite ?? false,
    productId: product?.id,
  });
  const [isAdded, setIsAdded] = useState(false);
  const [selectedVariations, setSelectedVariations] = useState<any>(null);

  const [isLoadingWish, setIsLoadingWish] = useState(false);

  const { handleAddToWishList } = useWishOperation();

  useEffect(() => {
    setSelectedVariations(product?.variations ? product?.variations[0] : null);
  }, [product]);

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

  const router = useRouter();
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    if (
      (selectedVariations?.sku &&
        selectedVariations?.stock <= 0 &&
        !selectedVariations?.can_preorder) ||
      (product?.stock <= 0 && !selectedVariations?.can_preorder)
    ) {
      return swal({
        title: "موجودی ناکافی!",
        text: "متأسفیم، این کالا در حال حاضر ناموجود است.",
        icon: "warning",
        buttons: {
          confirm: {
            text: "بستن",
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          },
        },
      });
    }

    let is_preorder =
      selectedVariations?.stock <= 0 && selectedVariations?.can_preorder;

    let price = selectedVariations?.price || product?.price;

    if (is_preorder) {
      if (selectedVariations) {
        price =
          selectedVariations.preorder_price_type === "fixed"
            ? price - selectedVariations.preorder_price
            : price * (selectedVariations.preorder_price / 100);
      } else {
        price =
          product.preorder_price_type === "fixed"
            ? price - product.preorder_price
            : price * (product.preorder_price / 100);
      }
    }

    const itemToAdd = {
      product: product,
      slug: product?.slug,
      product_id: product?.id,
      name: selectedVariations?.name || product?.name,
      image: selectedVariations?.gallery[0] || product?.image,
      price: selectedVariations?.price || product?.price,
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

  const price = Number(selectedVariations?.price || product?.price);
  const originalPrice = Number(
    selectedVariations?.original_price || product?.original_price
  );
  const discount =
    selectedVariations?.discount_type === "percentage"
      ? selectedVariations?.discount_value
      : 0;
  const preOrder = selectedVariations?.can_preorder;
  const count = selectedVariations?.stock || product?.stock || 0;

  return (
    <div className="group flex flex-col gap-y-4 w-full mx-auto">
      {/* Card Container */}
      <div className="relative w-full">
        {/* Wishlist Button */}
        <Button
          onClick={handleWishListToggle}
          disabled={isLoadingWish}
          className="absolute left-2 top-2 z-10 rounded-md bg-gray-250 p-2 transition-all hover:scale-105"
        >
          {isLoadingWish ? (
            <div className="animate-spin h-5 w-5 border-t-2 border-blue-1050 rounded-full" />
          ) : like.status ? (
            <HeartBold className="h-5 w-5 text-rose-600 sm:h-6 sm:w-6" />
          ) : (
            <Like className="h-5 w-5 text-blue-1050 sm:h-6 sm:w-6" />
          )}
        </Button>

        {/* Image Section */}
        {discount !== 0 ? (
          <div className="flex-center z-10 absolute right-[14px] top-[14px] w-fit bg-red-250 px-3 py-1.5 font-peyda-400 text-xs text-white">
            % {discount}
          </div>
        ) : count === 0 && !preOrder ? (
          <div className="flex-center z-10 absolute right-[14px] top-[14px] w-fit bg-slate-1000/50 px-3 py-1.5 font-peyda-400 text-xs text-white">
            نا موجود
          </div>
        ) : preOrder ? (
          <div className="flex-center z-10 absolute right-[14px] top-[14px] w-fit bg-secendry px-3 py-1.5 font-peyda-400 text-xs text-white">
            پیش سفارش
          </div>
        ) : null}
        <div
          className="cursor-pointer"
          onClick={() => router.push(product.slug ?? "")}
        >
          <div className="relative w-full aspect-[4/5] overflow-hidden rounded-md bg-white border border-gray-200">
            {product?.image ||
            product?.gallery?.length ||
            selectedVariations?.gallery?.length ? (
              <Image
                src={
                  selectedVariations?.gallery?.[0] ||
                  product?.image ||
                  product?.gallery?.[0]
                }
                alt={product?.name}
                fill
                sizes="(min-width: 768px) 20vw, 45vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <ImageIcon className="w-16 h-16 text-primary m-auto" />
            )}
          </div>
        </div>

        {/* Add to cart button */}
        <Button
          onClick={handleAddToCart}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[90%] flex items-center justify-center gap-x-2 bg-gray-250 py-2 sm:py-2.5 lg:py-3 rounded-md shadow transition-all"
        >
          {isAdded ? (
            <>
              <Check className="h-5 w-5 text-blue-1050" />
              <span className="font-peyda-400 text-xs sm:text-sm lg:text-base text-blue-1050">
                به سبد خرید اضافه شد!
              </span>
            </>
          ) : (
            <>
              <span className="font-peyda-400 text-xs sm:text-sm lg:text-base text-blue-1050">
                {product?.quantity === 0 && selectedVariations?.can_preorder
                  ? "افزودن (پیش‌فروش)"
                  : "افزودن به سبد خرید"}
              </span>
              <Bag className="h-4 w-4 sm:h-5 sm:w-5 text-blue-1050" />
            </>
          )}
        </Button>
      </div>

      {/* Name + Price */}
      <div className="flex flex-col items-center gap-y-2 text-center">
        <Link
          href={product?.slug ?? ""}
          className="font-peyda-500 text-sm sm:text-base lg:text-lg text-slate-1000"
        >
          {product?.name}
        </Link>

        <div className="flex items-center gap-x-2">
          {price != originalPrice && (
            <span className="text-sm sm:text-base text-gray-400 line-through">
              {Number(originalPrice).toLocaleString("fa-IR")} تومان
            </span>
          )}
          <span className="font-peyda-500 text-xs sm:text-sm lg:text-base text-blue-1050">
            {Number(price) !== 0
              ? Number(price).toLocaleString("fa-IR") + " تومان"
              : "تماس بگیرید"}
          </span>
        </div>
      </div>
    </div>
  );
}
