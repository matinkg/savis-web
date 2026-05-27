import Button from "@/components/_modules/button";
import { request } from "@/configs/HTTPService";
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
  const [discountMessage, setDiscountMessage] = useState("");

  useEffect(() => {
    if (state?.discount?.code) {
      setDiscountCode(state.discount.code);
    }
  }, [state]);

  const handleApplyDiscount = async () => {
    if (!discountCode) {
      setDiscountMessage("لطفاً کد تخفیف را وارد کنید");
      return;
    }

    setIsSubmitting(true);
    setDiscountMessage("");

    const data = await request("/api/v1/user-cart/apply-discount", "POST", {
      code: discountCode,
    });

    if (data?.success) {
      refreshCart();
      setDiscountMessage("کد تخفیف با موفقیت اعمال شد!");
    }else if (data?.status === 401) {
      setDiscountMessage("لطفاً برای استفاده از کدهای تخفیف وارد شوید.");
    } else {
      setDiscountMessage("خطا در ارتباط با سرور!");
    }
    setIsSubmitting(false);
  };

  const handleRemoveDiscount = async () => {
    setIsSubmitting(true);
    setDiscountMessage("");

    try {
      await request("/api/v1/user-cart/remove-discount", "DELETE");
      refreshCart();
      setDiscountCode("");
      setDiscountMessage("کد تخفیف حذف شد.");
    } catch (error) {
      setDiscountMessage("خطا در حذف تخفیف!");
    } finally {
      setIsSubmitting(false);
    }
  };
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
              {String(
                (Number(state?.original_price) || 0)?.toLocaleString("fa-ir")
              )}{" "}
              تومان
            </span>
          </div>

          {packagingCost ? (
            <div className="flex items-center justify-between">
              <span className="font-peyda-600 text-base text-blue-1050 lg:text-lg">
                هزینه بسته‌بندی
              </span>
              <span className="font-peyda-600 text-base text-slate-1000/50 lg:text-lg">
                {packagingCost?.toLocaleString("fa-ir")} تومان
              </span>
            </div>
          ) : null}

          {state?.discount && (
            <div className="flex items-center justify-between text-green-600">
              <span className="font-peyda-600 text-base lg:text-lg">
                تخفیف ({state.discount.code})
              </span>
              <span className="font-peyda-600 text-base lg:text-lg">
                -{String(state.discount.amount?.toLocaleString("fa-ir"))} تومان
              </span>
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="font-peyda-600 text-lg text-blue-1050 lg:text-2xl">
              مجموع
            </span>
            <span className="font-peyda-600 text-lg text-slate-1000/50 lg:text-2xl">
              {String(totalAmountPrice?.toLocaleString("fa-ir"))} تومان
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
              <span className="font-peyda-600">{state.discount.code}</span>
              <button onClick={handleRemoveDiscount} disabled={isSubmitting}>
                <CloseCircle className="h-6 w-6" />
              </button>
            </div>
            <Button className="flex w-full items-center justify-center gap-x-1 bg-secendry p-2 font-peyda-400 text-base text-white lg:p-3 lg:text-lg">
              <span>با موفقیت اعمال شد</span>
            </Button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="کد تخفیف"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
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
          <span className="text-sm font-peyda-400 text-red-600">
            {discountMessage}
          </span>
        )}
      </div>
    </div>
  );
}
