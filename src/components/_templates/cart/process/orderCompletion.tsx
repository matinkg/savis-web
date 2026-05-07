"use client";
import Button from "@/components/_modules/button";
import React from "react";
import OrderBox from "./orderBox";
import NewsForms from "@/components/_modules/newsForm";
import { useCart } from "@/libs/context/cart-shopping/CartContext";
import { useDataContext } from "@/libs/context/app-data";
import Spinner from "@/components/_modules/loading/spinner";

export default function OrderCompletion({}) {
  const { state, dispatch } = useCart();

  const { loading, userInfo } = useDataContext();

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-6">
        {loading ? (
          <div className="py-20">
            <Spinner className="w-8 h-8" />
          </div>
        ) : (
          <div className="lg:col-span-6 flex flex-col ">
            <span className="block font-peyda-600 text-2xl lg:text-[42px] text-blue-1050">
              سفارش شما با موفقیت ثبت شد
            </span>
            <span className="block font-peyda-600 text-2xl lg:text-[32px] text-blue-1050 mt-6 lg:mt-10 mb-6">
              صورت حساب و حمل و نقل
            </span>

            <div className="flex flex-col gap-y-3 font-peyda-400 text-xs lg:text-lg text-blue-1050">
              <div className="flex items-center">
                <span>نام و نام خانوادگی : </span>
                <span>
                  {" "}
                  {userInfo?.first_name} {userInfo?.last_name}{" "}
                </span>
              </div>

              <div className="flex items-center">
                <span>آدرس :</span>
                <span>{userInfo?.address}</span>
              </div>
              <div className="flex items-center">
                <span>کد پستی :</span>
                <span>{userInfo?.postal_code}</span>
              </div>

              <div className="flex items-center">
                <span>شماره موبایل :</span>
                <span> {userInfo?.phone}</span>
              </div>
              <div className="flex items-center">
                <span>آدرس ایمیل :</span>
                <span> {userInfo?.email} </span>
              </div>
              {/* <span>
                توضیحات : با سلام خسته نباشید ، ممنون میشم سفارش رو بین ساعت ۷
                تا ۸ شب برام ارسال کنید
              </span> */}
            </div>

            <NewsForms />
          </div>
        )}

        <div className="lg:col-span-4 flex flex-col gap-y-6 sticky left-0">
          <OrderBox isCompleted={true} state={state} />
        </div>
      </div>
    </>
  );
}
