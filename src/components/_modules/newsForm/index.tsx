import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../input/inex";
import Button from "../button";
import ArrowLeft from "@/public/icons/arrowLeft";

export default function NewsForms() {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      mobile: "",
    },
  });

  const handleRequest = async (data: Object) => {};

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        email: "",
        mobile: "",
      });
    }
  }, [formState, handleRequest, reset]);
  return (
    <>
      <form onSubmit={handleSubmit(handleRequest)} className="">
        <span className="my-[18px] block font-peyda-500 text-lg text-blue-1050 lg:text-[20px]">
          از جدیدترین محصولات و مطالب با خبر شو!
        </span>
        <div className="grid w-full grid-cols-2 place-items-center gap-x-2 lg:gap-x-8">
          <Input
            placeholder="ادرس ایمیل"
            isStar={true}
            type="text"
            validate={{
              ...register("email", {
                required: "لطفا فیلد   ایمیل را پرکنید ",
              }),
            }}
            className={`mt-1 h-10 w-full border border-solid bg-transparent px-3 font-peyda-400 text-sm ${
              errors.email?.message ? "border-red-600" : "border-gray-230"
            } `}
          >
            <small className="block h-7 font-peyda-400 text-red-600">
              {errors.email?.message}
            </small>
          </Input>
          <Input
            placeholder="تلفن همراه"
            isStar={true}
            type="text"
            validate={{
              ...register("mobile", {
                required: "لطفا فیلد   شماره موبایل را پرکنید ",
              }),
            }}
            className={`mt-1 h-10 w-full border border-solid bg-transparent px-3 font-peyda-400 text-sm ${
              errors.mobile?.message ? "border-red-600" : "border-[#D3D8DA]"
            } `}
          >
            <small className="block h-7 font-peyda-400 text-red-600">
              {errors.mobile?.message}
            </small>
          </Input>
        </div>

        <Button className="flex w-full items-center justify-center gap-x-1 bg-secendry p-2 font-peyda-400 text-base text-white lg:p-3 lg:text-lg">
          <span>ارسال</span>

          <ArrowLeft className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
        </Button>
      </form>
    </>
  );
}
