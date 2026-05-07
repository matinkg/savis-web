"use client";

import Button from "@/components/_modules/button";
import Input from "@/components/_modules/input/inex";
import Spinner from "@/components/_modules/loading/spinner";
import { request } from "@/configs/HTTPService";
import { agencyRequestSchema } from "@/configs/validationSchema";
import { usePostData } from "@/helper/globalHook/usePostData";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AgencyRequestForm() {
  const { PostDataToServer, loading } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agencyRequestSchema),
  });

  const handleAgencyRequest = async (data: any) => {
    request("/api/v1/submit-agencyRequest", "POST", data).then(res=>{
      if(res?.success){
        toast.success(res?.data?.message)
      }
    });
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, handleAgencyRequest, reset]);
  return (
    <form
      onSubmit={handleSubmit(handleAgencyRequest)}
      className="mx-auto my-10 w-full  font-peyda-400 text-base lg:my-[60px] lg:w-1/2"
    >
      <div className="flex w-full items-center gap-x-8">
        <Input
          label="نام"
          type="text"
          validate={{
            ...register("first_name", {
              required: "لطفا فیلد  نام را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.first_name?.message ? "border-red-600" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.first_name?.message}
          </small>
        </Input>
        <Input
          label="نام خانوادگی"
          type="text"
          validate={{
            ...register("last_name", {
              required: "لطفا فیلد  نام خانوادگی را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.last_name?.message ? "border-red-600" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.last_name?.message}
          </small>
        </Input>
      </div>
      <Input
        label="شماره موبایل"
        type="text"
        validate={{
          ...register("mobile_number", {
            required: "لطفا فیلد  شماره موبایل را پرکنید ",
          }),
        }}
        className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
          errors.mobile_number?.message ? "border-red-600" : "border-[#D3D8DA]"
        } `}
      >
        <small className="block h-7 font-peyda-400 text-red-600">
          {errors.mobile_number?.message}
        </small>
      </Input>
      <Input
        label="آدرس "
        type="text"
        validate={{
          ...register("address", {
            required: "لطفا فیلد  آدرس  را پرکنید ",
          }),
        }}
        className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
          errors.address?.message ? "border-red-600" : "border-[#D3D8DA]"
        } `}
      >
        <small className="block h-7 font-peyda-400 text-red-600">
          {errors.address?.message}
        </small>
      </Input>

      <div className="flex w-full items-center gap-x-8">
        <Input
          label="تلفن ثابت"
          type="text"
          validate={{
            ...register("phone_number", {
              required: "لطفا فیلد  تلفن ثابت را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.phone_number?.message ? "border-red-600" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.phone_number?.message}
          </small>
        </Input>
        <Input
          label="توان سرمایه گذاری"
          type="text"
          validate={{
            ...register("investment_power", {
              required: "لطفا فیلد  توان سرمایه گذاری را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.investment_power?.message
              ? "border-red-600"
              : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.investment_power?.message}
          </small>
        </Input>
      </div>

      <div>
        <label> توضیحات بیشتر</label>

        <textarea
          {...register("message", {
            required: "لطفا فیلد  توضیحات را پرکنید ",
          })}
          className={`mt-1 w-full border border-solid bg-white/50 p-3 ${
            errors.message?.message ? "border-red-600" : "border-[#D3D8DA]"
          } `}
          rows={10}
        ></textarea>
        <small className="block h-7 font-peyda-400 text-red-600">
          {errors.message?.message}
        </small>
      </div>

      <Button
        type="submit"
        className="h-10 w-full bg-secendry font-peyda-400 text-sm text-white lg:text-lg"
      >
        {loading ? (
          <Spinner type="source" className="w-6 h-6 text-white" />
        ) : (
          `ارسال پیام`
        )}{" "}
      </Button>
    </form>
  );
}
