"use client";

import React from "react";
import Input from "../input/inex";
import Button from "../button";
import Eye from "@/public/icons/eye";
import EyeSlash from "@/public/icons/eyeSlash";
import Spinner from "../loading/spinner";
import useGetPassword from "./hook/useGetPassword";
import { Step } from "@/libs/interface/steps";
import useGetOtpCode from "./hook/useGetOtpCode";

type StepsProps = {
  userPhone: string;
};

export default function GetPassword({ userPhone }: StepsProps) {
  const {
    errors,
    register,
    setShowPassword,
    showPassword,
    loading,
    handleSubmit,
    onSubmit,
  } = useGetPassword(userPhone);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col">
      <Input
        label="رمز عبور"
        name="password"
        type={showPassword ? "text" : "password"}
        className={`ltrDir h-[48px] px-3 outline-none focus:border-2 focus:outline-none ${
          !errors.password
            ? "border border-solid border-white/40 bg-white/20"
            : "border border-solid border-[#F3434399] bg-[#F343431A]"
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
            <Eye className="h-6 w-6 text-[#0A141A]" />
          ) : (
            <EyeSlash className="h-6 w-6 text-[#0A141A]" />
          )}
        </div>
      </Input>
      {/* {errors.password?.message && (
        <small className='mt-1 block font-peyda-400 text-red-250'>
          {errors.password.message}
        </small>
      )} */}
      <small className="mt-2 font-peyda-400 text-xs text-[#0A141A]">
        رمز عبور شما حتما باید شامل حروف کوچک و بزرگ ( A-z) ، اعداد (9-0) و
        متغیر ها (!،@،#،$،&،_،-) باشد.
      </small>

      <Button className="mt-6 h-[48px] w-full bg-white font-peyda-400 text-blue-1050 lg:mt-8 lg:text-lg">
        {loading ? (
          <>
            <Spinner type="spinner" className="w-8 h-8" />
          </>
        ) : (
          <span>ایجاد حساب</span>
        )}
      </Button>
    </form>
  );
}
