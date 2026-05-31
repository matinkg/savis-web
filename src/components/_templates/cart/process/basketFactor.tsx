"use client";

import Button from "@/components/_modules/button";
import { request } from "@/configs/HTTPService";
import formatPrice from "@/lib/utils/format-price";
import { CartState } from "@/libs/context/cart-shopping/interface";
import ArrowLeft from "@/public/icons/arrowLeft";
import CloseCircle from "@/public/icons/close-circle";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type propsType = {
  state: CartState;
  packagingCost: number;
  totalAmountPrice: number;
  userInfo: any;
  refreshCart: any;
};

export default function BasketFactor({
  state,
  packagingCost,
  totalAmountPrice,
  userInfo,
  refreshCart,
}: propsType) {
  const router = useRouter();

  const [discountCode, setDiscountCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  const [discountMessage, setDiscountMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    if (state?.discountCode) {
      setDiscountCode(state?.discountCode || "");
      setIsDiscountApplied(true);
    } else {
      setDiscountCode("");
      setIsDiscountApplied(false);
    }
  }, [state]);

  const handleApplyDiscount = async () => {
    if (!discountCode) {
      setDiscountMessage({
        text: "لطفاً کد تخفیف را وارد کنید",
        type: "error",
      });
      return;
    }

    if (isSubmitting || isDiscountApplied) return;

    setIsSubmitting(true);

    try {
      const data = await request("/api/v1/user-cart/apply-discount", "POST", {
        code: discountCode,
      });

      if (data?.success) {
        await refreshCart();

        setDiscountMessage({
          text: "کد تخفیف با موفقیت اعمال شد!",
          type: "success",
        });

        setIsDiscountApplied(true);
      } else if (data?.status === 401) {
        setDiscountMessage({
          text: "لطفاً برای استفاده از کدهای تخفیف وارد شوید.",
          type: "error",
        });
      } else {
        setDiscountMessage({
          text: "خطا در ارتباط با سرور!",
          type: "error",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveDiscount = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setDiscountMessage(null);

    try {
      await request("/api/v1/user-cart/remove-discount", "DELETE");
      await refreshCart();

      setDiscountCode("");
      setIsDiscountApplied(false);

      setDiscountMessage({
        text: "کد تخفیف حذف شد.",
        type: "success",
      });
    } catch (error) {
      setDiscountMessage({
        text: "خطا در حذف تخفیف!",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const discountAmount = Number(state?.discount ?? 0);

  const getItemPrice = (item: any) => {
    const currentData = item?.variation || item?.product || item?.gift_card;

    const isPreorder =
      Number(item?.product?.can_preorder ?? item?.variation?.can_preorder) ===
        1 && Number(item?.product?.stock ?? item?.variation?.stock ?? 0) === 0;

    if (isPreorder) {
      return Number(currentData?.preorder_final_price ?? 0);
    }
    return Number(currentData?.price ?? item?.price ?? 0);
  };

  const subtotal = (state?.items || []).reduce(
    (acc, item) => acc + getItemPrice(item) * (item?.quantity || 1),
    0,
  );

  return (
    <div className="lg:col-span-4 flex flex-col gap-y-6">
      <div className="flex flex-col items-center bg-gray-250 p-4 lg:p-6">
        <span className="block font-peyda-600 text-lg text-blue-1050 lg:text-2xl">
          جمع کل سبد خرید
        </span>

        <div className="borderBottom my-6 flex w-full flex-col gap-y-6 lg:my-10">
          <div className="flex items-center justify-between">
            <span className="font-peyda-600 text-base text-blue-1050 lg:text-lg">
              جمع جزء
            </span>

            <span className="font-peyda-600 text-base text-slate-1000/50 lg:text-lg">
              {formatPrice(subtotal)} تومان
            </span>
          </div>

          {packagingCost ? (
            <div className="flex items-center justify-between">
              <span className="font-peyda-600 text-base text-blue-1050 lg:text-lg">
                هزینه بسته‌بندی
              </span>
              <span className="font-peyda-600 text-base text-slate-1000/50 lg:text-lg">
                {formatPrice(packagingCost ?? 0)} تومان
              </span>
            </div>
          ) : null}

          {state?.discount && (
            <div className="flex items-center justify-between text-green-600">
              <span className="font-peyda-600 text-base lg:text-lg">تخفیف</span>

              <span className="font-peyda-600 text-base lg:text-lg">
                {formatPrice(discountAmount)} تومان
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="font-peyda-600 text-lg text-blue-1050 lg:text-2xl">
              مجموع
            </span>

            <span className="font-peyda-600 text-lg text-slate-1000/50 lg:text-2xl">
              {formatPrice(totalAmountPrice || 0)} تومان
            </span>
          </div>
        </div>

        <Button className="mb-3 w-full border border-solid border-Indigo-1000 p-2 text-center font-peyda-400 text-base text-Indigo-1000 lg:p-3 lg:text-lg">
          مالیات بر ارزش افزوده لحاظ شده است
        </Button>

        <Button
          onClick={() => {
            if (userInfo?.id) {
              router.push("/cart/checkout");
            } else {
              router.push("/auth/signin");
            }
          }}
          className="flex w-full items-center justify-center gap-x-1 bg-secendry p-2 font-peyda-400 text-base text-white lg:p-3 lg:text-lg"
        >
          <span>ادامه جهت تسویه حساب</span>
          <ArrowLeft href="#" className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
        </Button>
      </div>

      {/* بخش تخفیف */}
      <div className="flex flex-col items-center gap-y-[18px] bg-gray-250 p-4 lg:p-6">
        <span className="block font-peyda-600 text-lg text-blue-1050 lg:text-2xl">
          کد تخفیف / کارت هدیه
        </span>

        {state?.discount ? (
          <>
            <div className="flex items-center justify-between w-full bg-green-100 text-green-700 p-2 rounded-md shadow-sm">
              <span className="font-peyda-600">{discountCode}</span>

              <button onClick={handleRemoveDiscount} disabled={isSubmitting}>
                <CloseCircle className="h-6 w-6" />
              </button>
            </div>

            <Button
              disabled
              className="flex w-full items-center justify-center gap-x-1 bg-secendry opacity-70 p-2 font-peyda-400 text-base text-white lg:p-3 lg:text-lg"
            >
              <span>کد تخفیف اعمال شده است</span>
            </Button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="کد تخفیف"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              disabled={isSubmitting}
              className="h-10 w-full px-3 text-center font-peyda-400 text-sm text-blue-1050 lg:text-base border rounded-md shadow-sm"
            />

            <Button
              onClick={handleApplyDiscount}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-x-1 bg-secendry p-2 font-peyda-400 text-base text-white lg:p-3 lg:text-lg"
            >
              <span>{isSubmitting ? "در حال ارسال..." : "اعمال کد تخفیف"}</span>
            </Button>
          </>
        )}

        {discountMessage && (
          <span
            className={`text-sm font-peyda-400 ${
              discountMessage.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {discountMessage.text}
          </span>
        )}
      </div>
    </div>
  );
}
