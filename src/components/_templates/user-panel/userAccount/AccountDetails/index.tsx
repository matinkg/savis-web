"use client";
import Input from "@/components/_modules/input/inex";
import React, { useEffect } from "react";
import EyeSlash from "@/public/icons/eyeSlash";
import Eye from "@/public/icons/eye";
import Button from "@/components/_modules/button";
import useOperation from "./hook/useOperation";
import Spinner from "@/components/_modules/loading/spinner";

export default function AccountDetailsForm() {
  const {
    register,
    handleSubmit,
    handleRequest,
    showPassword,
    setShowPassword,
    errors,
    loading,
    userInfoLoading,
    userInfo,
    fetchUserInfo
  } = useOperation();
  
  // \-------------------------------------------
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchUserInfo();
  }, []);  

  return (
    <>
      {userInfoLoading ? (
        <div className="py-20">
          <Spinner className="w-8 h-8" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(handleRequest)} className="flex flex-col">
          <span className="mb-6 text-center font-peyda-600 text-2xl text-blue-1050">
            جزئیات حساب
          </span>
          <div className="grid w-full grid-cols-2 gap-x-2 lg:gap-x-6">
            <Input
              label="نام"
              labelStyle="font-peyda-400 text-sm text-blue-1050"
              isStar={true}
              type="text"
              value={userInfo?.first_name ?? ""}
              validate={{
                ...register("first_name", {
                  required: "لطفا فیلد  نام را پرکنید ",
                }),
              }}
              className={`mt-1 h-8 w-full border border-solid bg-white/50 px-3 font-peyda-400 text-sm text-blue-1050 lg:h-10 ${
                errors.first_name?.message
                  ? "border-red-600"
                  : "border-[#D3D8DA]"
              } `}
            >
              <small className="mt-1 block h-7 font-peyda-400 text-xs text-red-600">
                {errors.first_name?.message}
              </small>
            </Input>
            <Input
              label="نام خانوادگی"
              labelStyle="font-peyda-400 text-sm text-blue-1050"
              isStar={true}
              value={userInfo?.last_name ?? ""}
              type="text"
              validate={{
                ...register("last_name", {
                  required: "لطفا فیلد  نام خانوادگی را پرکنید ",
                }),
              }}
              className={`mt-1 h-8 w-full border border-solid bg-white/50 px-3 lg:h-10 ${
                errors.last_name?.message
                  ? "border-red-600"
                  : "border-[#D3D8DA]"
              } `}
            >
              <small className="mt-1 block h-7 font-peyda-400 text-xs text-red-600">
                {errors.last_name?.message}
              </small>
            </Input>
          </div>
          <Input
            label=" نام نمایشی"
            labelStyle="font-peyda-400 text-sm text-blue-1050"
            isStar={true}
            value={userInfo?.nickname ?? ""}
            type="text"
            validate={{
              ...register("nickname", {
                required: "لطفا فیلد   نام نمایشی را پرکنید ",
              }),
            }}
            className={`mt-1 h-8 w-full border border-solid bg-white/50 px-3 lg:h-10 ${
              errors.nickname?.message ? "border-red-600" : "border-[#D3D8DA]"
            } `}
          >
            <small className="mt-1 block h-7 font-peyda-400 text-xs text-red-600">
              {errors.nickname?.message}
            </small>
          </Input>
          <div className=" w-full ">
            <Input
              label="آدرس ایمیل"
              labelStyle="font-peyda-400 text-sm text-blue-1050"
              isStar={true}
              type="text"
              value={userInfo?.email ?? ""}
              validate={{
                ...register("email", {
                  required: "لطفا فیلد  ایمیل را پرکنید ",
                }),
              }}
              className={`mt-1 h-8 w-full border border-solid bg-white/50 px-3 font-peyda-400 text-sm text-blue-1050 lg:h-10 ${
                errors.email?.message ? "border-red-600" : "border-[#D3D8DA]"
              } `}
            >
              <small className="mt-1 block h-7 font-peyda-400 text-xs text-red-600">
                {errors.email?.message}
              </small>
            </Input>
          </div>

          <div className="flex flex-col">
            <span className="my-6 block font-peyda-600 text-2xl text-blue-1050">
              تغییر گذرواژه
            </span>

            <div className="w-full space-y-[18px]">
              <Input
                label="گذرواژه پیشین (در صورتی که قصد تغییر ندارید خالی بگذارید)"
                labelStyle="font-peyda-400 text-sm text-blue-1050"
                type="text"
                className={`mt-1 h-8 w-full border border-solid bg-white/50 px-3 lg:h-10 ${
                  false ? "border-red-600" : "border-[#D3D8DA]"
                } `}
              >
                <div
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      pervPass: !showPassword?.pervPass,
                    })
                  }
                  className="eyePositionUserAccount"
                >
                  {showPassword?.pervPass ? (
                    <EyeSlash className="h-6 w-6 text-blue-1050" />
                  ) : (
                    <Eye className="h-6 w-6 text-blue-1050" />
                  )}
                </div>
              </Input>

              <Input
                label=" گذرواژه جدید (در صورتی که قصد تغییر ندارید خالی بگذارید)"
                labelStyle="font-peyda-400 text-sm text-blue-1050"
                type="text"
                className={`mt-1 h-8 w-full border border-solid bg-white/50 px-3 lg:h-10 ${
                  false ? "border-red-600" : "border-[#D3D8DA]"
                } `}
              >
                <div
                  onClick={() =>
                    setShowPassword({
                      ...showPassword,
                      newPass: !showPassword?.newPass,
                    })
                  }
                  className="eyePositionUserAccount"
                >
                  {showPassword?.newPass ? (
                    <EyeSlash className="h-6 w-6 text-blue-1050" />
                  ) : (
                    <Eye className="h-6 w-6 text-blue-1050" />
                  )}
                </div>
              </Input>
            </div>
          </div>

          <Button
            type="submit"
            className="flex-center mx-auto mt-6 w-full bg-secendry py-2 font-peyda-400 text-white lg:mt-10 lg:w-fit lg:px-20 lg:py-2 xl:text-lg"
          >
            {loading ? (
              <Spinner type="source" className="w-8 h-8" />
            ) : (
              `
            ذخیره جزئیات
              `
            )}
          </Button>
        </form>
      )}
    </>
  );
}
