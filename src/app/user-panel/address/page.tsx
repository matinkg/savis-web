"use client";
import Button from "@/components/_modules/button";
import Spinner from "@/components/_modules/loading/spinner";
import AddressForm from "@/components/_templates/user-panel/userAccount/addressForm";
import { useDataContext } from "@/libs/context/app-data";
import React, { useState } from "react";

export default function Address() {
  const [inEditMode, setInEditMode] = useState(false);
  const { loading, userInfo } = useDataContext();

  return (
    <>
      {loading ? (
        <div className="py-20">
          <Spinner className="w-8 h-8" />
        </div>
      ) : (
        <>
          {inEditMode ? (
            <AddressForm userInfo={userInfo} inEditMode={inEditMode} />
          ) : (
            <div>
              <div className="bg-gray-250 p-[18px]">
                <p className="flex items-center gap-x-1 text-center font-peyda-500 text-sm text-black/50 lg:text-[18px]">
                  آدرس‌های زیر به طور پیش‌فرض در صفحه پرداخت مورد استفاده قرار
                  مي‌گیرد.
                </p>
              </div>
              <div className="mb-6 mt-10 bg-gray-250 p-4 lg:p-[18px]">
                <div className="flex flex-col gap-y-3 font-peyda-400 text-xs md:text-sm lg:text-lg">
                  <span className="text-blue-105 mb-2 font-peyda-600 text-2xl lg:mb-6">
                    آدرس
                  </span>
                  <div className="flex items-center">
                    <span>نام و نام خانوادگی : </span>
                    <span>
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
                </div>
              </div>
              <Button
                onClick={() => setInEditMode(true)}
                className="flex-center w-fit bg-secendry px-8 py-2 font-peyda-400 text-white lg:py-3 xl:text-lg"
              >
                ویرایش آدرس{" "}
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
}
