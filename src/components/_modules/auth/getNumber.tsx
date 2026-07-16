"use client";
import React from "react";
import Input from "../input/inex";
import Button from "../button";
import { Step } from "../../../../libs/interface/steps";
import Spinner from "../loading/spinner";
import useGetNumber from "./hook/useGetNumber";

interface StepsProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
  setUserPhone: React.Dispatch<React.SetStateAction<string>>;
  authRequestUrl: string;
  action: string;
}

const normalizePhoneNumber = (value: string) => {
  return value
    .replace(/[\u0660-\u0669]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 0x30)) 
    .replace(/[\u06F0-\u06F9]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0x06F0 + 0x30));
};

export default function GetNumber({
  setCurrentStep,
  setUserPhone,
  authRequestUrl,
  action
}: StepsProps) {
  const { register, handleSubmit, watch, errors, onSubmit, loading } =
    useGetNumber(setCurrentStep, setUserPhone, authRequestUrl, action);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center"
    >
      <Input
        label="شماره موبایل"
        type="tel"
        name="phone"
        className="ltrDir h-[48px] font-peyda-num-400 border border-solid border-black/10 bg-black/5 px-3 outline-none"
        labelStyle="font-peyda-400 text-xs lg:text-base mb-4  "
        validate={{
          ...register("phone", {
            required: "لطفا فیلد شماره موبایل را پرکنید",
            pattern: {
              value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g,
              message: "شماره تلفن وارد شده معتبر نمی باشد",
            },
            onChange: (e) => {
              e.target.value = normalizePhoneNumber(e.target.value);
            }
          }),
        }}
      >
        {errors.phone?.message && (
          <small className="mt-1 block font-peyda-400 text-red-250">
            {errors.phone.message}
          </small>
        )}
      </Input>

      <Button className="my-8 h-[48px] w-full bg-secendry font-peyda-400 text-white lg:my-10 lg:text-lg">
        {loading ? (
          <>
            <Spinner type="spinner" className="w-8 h-8" />
          </>
        ) : (
          <span>تایید شماره همراه</span>
        )}
      </Button>
    </form>
  );
}