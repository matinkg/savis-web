"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactUsSchema } from "@/configs/validationSchema";
import Input from "@/components/_modules/input/inex";
import Button from "@/components/_modules/button";
import { usePostData } from "@/helper/globalHook/usePostData";
import Spinner from "@/components/_modules/loading/spinner";
import { request } from "@/configs/HTTPService";

export default function ContactusForm() {
  const { PostDataToServer, loading } = usePostData();
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactUsSchema),
  });

  const handleContactUs = async (data: any) => {
    console.log(data)
    await request("/api/v1/contact-us", "POST", data);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ name: "", subject: "", email: "", phone: "", message: "" });
    }
  }, [formState, handleContactUs, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleContactUs)}
      className="mx-auto mb-10 w-full  font-peyda-400 text-base lg:mb-[60px] lg:w-1/2"
    >
      <div className="flex w-full items-center gap-x-8">
        <Input
          label="نام"
          type="text"
          validate={{
            ...register("name", {
              required: "لطفا فیلد نام را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.name?.message ? "border-red-600" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.name?.message}
          </small>
        </Input>
        <Input
          label="ایمیل"
          type="email"
          validate={{
            ...register("email", {
              required: "لطفا فیلد ایمیل را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.email?.message ? "border-red-600" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.email?.message}
          </small>
        </Input>
      </div>
      <Input
        label="شماره موبایل"
        type="text"
        validate={{
          ...register("phone", {
            required: "لطفا فیلد شماره موبایل را پرکنید ",
          }),
        }}
        className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
          errors.phone?.message ? "border-red-600" : "border-[#D3D8DA]"
        } `}
      >
        <small className="block h-7 font-peyda-400 text-red-600">
          {errors.phone?.message}
        </small>
      </Input>
      <Input
        label="موضوع"
        type="text"
        validate={{
          ...register("subject", {
            required: "لطفا فیلد  موضوع را پرکنید ",
          }),
        }}
        className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
          errors.subject?.message ? "border-red-600" : "border-[#D3D8DA]"
        } `}
      >
        <small className="block h-7 font-peyda-400 text-red-600">
          {errors.subject?.message}
        </small>
      </Input>

      <div>
        <label>پیام شما</label>

        <textarea
          cols={30}
          rows={10}
          {...register("message", {
            required: "لطفا فیلد  پیام را پرکنید ",
          })}
          className={`mt-1 w-full border border-solid bg-white/50 p-3 ${
            errors.message?.message ? "border-red-600" : "border-[#D3D8DA]"
          } `}
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
        )}
      </Button>
    </form>
  );
}
