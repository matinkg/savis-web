"use client";

import React, { useState } from "react";
import Input from "../input/inex";
import Button from "../button";
import Eye from "@/public/icons/eye";
import Spinner from "../loading/spinner";
import EyeSlash from "@/public/icons/eyeSlash";
import useVerifyUserPassword from "./hook/useVerifyUserPassword";

type StepsProps = {
  userPhone: string;
};

export default function VerifyUserPassword({ userPhone }: StepsProps) {
  const {
    handleSubmit,
    onSubmit,
    errors,
    register,
    setShowPassword,
    showPassword,
    passwordError,
    loading,
  } = useVerifyUserPassword(userPhone);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
      <Input
        label="رمز عبور"
        name="password"
        type={showPassword ? "text" : "password"}
        className={`ltrDir h-[48px] px-3 outline-none focus:border-2 focus:outline-none ${
          errors.password || passwordError
            ? "border border-solid border-[#F3434399] bg-[#F343431A] text-red-250"
            : "border border-solid border-white/40 bg-white/20"
        }`}
        labelStyle="font-peyda-400  text-xs lg:text-base mb-4"
        validate={{
          ...register("password", {
            required: "لطفا فیلد  پسورد را پرکنید ",
            pattern: {
              value:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g,
              message: "پسورد وارد شده معتبر نمی باشد ",
            },
          }),
        }}
      >
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="eyePosition"
        >
          {showPassword ? (
            <Eye className="h-6 w-6 text-white" />
          ) : (
            <EyeSlash className="h-6 w-6 text-white" />
          )}
        </div>
      </Input>
      {passwordError ? (
        <div className="mt-2 flex items-center justify-between px-0.5">
          <small className="mt-1 block font-peyda-400 text-xs text-red-250">
            رمز عبور وارد شده اشتباه است
          </small>

          <p className="cursor-pointer font-peyda-400 text-xs">
            فراموشی رمز عبور
          </p>
        </div>
      ) : (
        <small className="mt-2 font-peyda-400 text-xs text-white/50">
          رمز عبور شما حتما باید شامل حروف کوچک و بزرگ ( A-z) ، اعداد (9-0) و
          متغیر ها (!،@،#،$،&،_،-) باشد.
        </small>
      )}

      <Button className="mt-6 h-[48px] w-full bg-secendry font-peyda-400 text-white lg:mt-8 lg:text-lg">
        {loading ? (
          <>
            <Spinner type="spinner" className="w-8 h-8" />
          </>
        ) : (
          <span>ورود به حساب کاربری</span>
        )}
      </Button>
    </form>
  );
}
