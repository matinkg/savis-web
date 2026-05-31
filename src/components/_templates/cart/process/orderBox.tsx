import Button from "@/components/_modules/button";
import { request } from "@/configs/HTTPService";
import { showSwal } from "@/helper/swal";
import formatPrice from "@/lib/utils/format-price";
import { CartState } from "@/libs/context/cart-shopping/interface";
import BagTick from "@/public/icons/bagTick";
import Cookies from "js-cookie";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

type propsType = {
  state: CartState;
  isCompleted: boolean;
};
export default function OrderBox({ isCompleted, state }: propsType) {
  const { getValues, trigger } = useFormContext();
  const [paymentGateways, setPaymentGateways] = useState<any[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<number | null>(null);

  useEffect(() => {
    const fetchPaymentGateways = async () => {
      try {
        const response = await request("/api/v1/payment-gateways", "GET");
        setPaymentGateways(response?.data);
        setSelectedGateway(response?.data[0]?.id);
      } catch (error) {
        console.error("خطا در بارگذاری درگاه‌های پرداخت:", error);
      }
    };

    fetchPaymentGateways();
  }, []);

  const handleSubmitOrder = async () => {
    const isValid = await trigger();
    if (!isValid) {
      showSwal("لطفاً اطلاعات فرم را به درستی وارد کنید.", "error");
      return;
    }

    const referral_code = Cookies.get("referral_code");

    const formData = getValues();
    const orderData = {
      ...formData,
      city: formData.city?.title,
      province: formData.province?.title,
      payment_gateway: selectedGateway,
      referral_code,
    };

    try {
      const res = await request("/api/v1/orders", "POST", orderData);
      if (res?.status === 201) window.location.href = res?.data?.payment_link;
    } catch (error) {
      console.error("خطا در ثبت سفارش:", error);
      alert("مشکلی در ثبت سفارش پیش آمد. لطفا مجددا تلاش کنید.");
    }
  };

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

  const calcSubtotal = (items: any[] = []) => {
    return items.reduce((sum, item) => {
      return sum + getItemPrice(item) * (item?.quantity || 1);
    }, 0);
  };

  const subtotal = calcSubtotal(state?.items || []);

  const discountAmount = Number(
    state?.discount?.amount ?? state?.discount ?? 0,
  );

  const finalTotal = subtotal + (state?.totalBoxPrice || 0) - discountAmount;

  const handleSelectGateway = (gatewayId: number) => {
    setSelectedGateway(gatewayId);
  };

  return (
    <div className="flex flex-col items-center gap-y-6 bg-secendry p-4 lg:p-6">
      <span className="block font-peyda-600 text-lg text-white lg:text-[32px]">
        سفارش شما
      </span>
      <div className="borderBottom flex w-full flex-col bg-white p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <span className="font-peyda-600 text-lg text-blue-1050 lg:text-[20px]">
            محصول
          </span>
          <span className="text-slate-1050 font-peyda-600 text-lg lg:text-[20px]">
            جمع جزء
          </span>
        </div>

        {state?.items?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <span className="font-peyda-600 text-sm text-blue-1050 lg:text-lg">
                {item?.variation?.name ??
                  item?.product?.name ??
                  item?.gift_card?.name}
                 ×
                {item?.quantity}
              </span>
            </div>

            <span className="font-peyda-600 text-sm text-slate-1000/50 lg:text-lg">
              {formatPrice(getItemPrice(item) * (item?.quantity || 1))} تومان
            </span>
          </div>
        ))}
      </div>
      <div className="borderBottom flex w-full flex-col bg-white p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <span className="font-peyda-600 text-sm text-blue-1050 lg:text-lg">
            جمع جزء
          </span>
          <span className="font-peyda-600 text-sm text-slate-1000/50 lg:text-lg">
            {formatPrice(subtotal)} تومان
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-peyda-600 text-sm text-blue-1050 lg:text-lg">
            حمل و نقل
          </span>
          <div className="text-slate-1050 flex flex-col font-peyda-600 text-sm lg:text-lg">
            <span className="block text-center">ارسال با پیک</span>
            <span className="block text-center">۵۵,۰۰۰ تومان</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-peyda-600 text-sm text-blue-1050 lg:text-lg">
            تخفیف
          </span>
          <span className="font-peyda-600 text-sm text-slate-1000/50 lg:text-lg">
            {formatPrice(discountAmount)} تومان
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-peyda-600 text-lg text-blue-1050 lg:text-2xl">
            مجموع
          </span>
          <span className="text-slate-1050 font-peyda-600 text-lg lg:text-2xl">
            {formatPrice(finalTotal)} تومان
          </span>
        </div>
      </div>

      <div className="w-full space-y-6">
        {paymentGateways.map((gateway) => (
          <Button
            onClick={() => handleSelectGateway(gateway?.id)}
            className={`text-Indigo-1050 flex w-full items-center justify-between p-2 font-peyda-600 text-sm lg:p-3 lg:text-lg ${
              selectedGateway === gateway?.id ? "bg-blue-100" : "bg-white"
            }`}
            key={"gateway_" + gateway?.id}
          >
            <span>{gateway?.name}</span>
            <Image
              src={gateway?.image}
              alt={gateway?.name}
              height={45}
              width={45}
            />
          </Button>
        ))}

        {isCompleted ? (
          <></>
        ) : (
          <>
            <p className="font-peyda-600 text-sm text-white lg:text-lg">
              اطلاعات شخصی شما برای پردازش سفارش شما، پشتیبانی از تجربه شما در
              سراسر این وب سایت و برای اهدافی که در سیاست حفظ حریم خصوصی ذکر شده
              است استفاده می شود
            </p>

            <Button
              onClick={handleSubmitOrder}
              className="text-Indigo-1050 flex w-full items-center justify-center gap-x-1 bg-white p-2 font-peyda-400 text-base lg:p-3 lg:text-lg"
            >
              <span>ثبت سفارش</span>
              <BagTick href="#" className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
