"use client";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import InputIcon from "react-multi-date-picker/components/input_icon";
import Button from "@/components/_modules/button";
import Input from "@/components/_modules/input/inex";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jobApplicationSchema } from "@/configs/validationSchema";
import Spinner from "@/components/_modules/loading/spinner";
import { degreeEducation, gender } from "@/configs/constants";
import FileUploderResume from "./fileUploder-resume";
import CheckBoxIsStudent from "./checkBox-IsStudent";
import { request } from "@/configs/HTTPService";
import { showSwal } from "@/helper/swal";

interface EmploymentFormType {
  jobs: any;
}

export default function EmploymentForm({ jobs }: EmploymentFormType) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
    formState: { errors },
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(jobApplicationSchema(jobs)),
  });

  const handleRequest = async (data: any) => {
    setLoading(true);

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    });

    try {
      const res = await request("/api/v1/jobOpportunities", "POST", formData, false);
      if (!res?.success) {
        showSwal(res?.message || "خطا در ارسال فرم. لطفاً دوباره تلاش کنید.", "error");
        return;
      }
  
      showSwal("درخواست شما با موفقیت ثبت شد.");
      reset();
    } catch (err) {
      console.error(err);
      showSwal("خطا در ارسال فرم. لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      // reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleRequest)}
      className="mx-auto my-10 w-full font-peyda-400 text-base lg:my-[60px] xl:w-1/2"
    >
      <div className="grid w-full grid-cols-2 place-items-center gap-x-8">
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
              required: "لطفا فیلد نام خانوادگی  را پرکنید ",
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
      <div className="grid w-full grid-cols-2 gap-x-8">
        <div className="w-full  flex-col gap-y-1">
          <label> تاریخ تولد</label>
          <div className="w-full" style={{ direction: "rtl" }}>
            <DatePicker
              inputMode="none"
              render={<InputIcon />}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
              onChange={(date: any) => setValue("birth_day", date)}
            />
          </div>
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.birth_day?.message}
          </small>
        </div>

        <div className="w-full">
          <label>جنسیت</label>
          <select
            {...register("gender", {
              required: "لطفا فیلد  جنسیت  را پرکنید ",
            })}
            className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
              errors.gender?.message ? "border-red-600" : "border-[#D3D8DA]"
            } `}
          >
            <option value="option" selected>
              انتخاب
            </option>

            {gender?.map((item, index) => (
              <option key={index} value={item?.key}>
                {item?.value}
              </option>
            ))}
          </select>
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.gender?.message}
          </small>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 place-items-center gap-x-8">
        <Input
          label="شماره موبایل"
          type="text"
          validate={{
            ...register("mobile_number", {
              required: "لطفا فیلد شماره موبایل  را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.mobile_number?.message
              ? "border-red-600"
              : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.mobile_number?.message}
          </small>
        </Input>
        <Input
          label=" تلفن ثابت"
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
      </div>

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

      <div className="grid w-full grid-cols-2 place-items-center gap-x-8">
        <div className="w-full">
          <label>مدرک تحصیلی</label>
          <select
            {...register("degree", { required: true })}
            className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
              errors.degree ? "border-red-600" : "border-[#D3D8DA]"
            } `}
          >
            <option value="option" selected>
              انتخاب
            </option>

            {degreeEducation?.map((item, index) => (
              <option key={index} value={item?.key}>
                {item?.value}
              </option>
            ))}
          </select>

          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.degree?.message}
          </small>
        </div>
        <Input
          label=" رشته تحصیلی"
          type="text"
          validate={{
            ...register("field", {
              required: "لطفا فیلد  رشته تحصیلی را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.field?.message ? "border-red-600" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.field?.message}
          </small>
        </Input>
      </div>
      <div className="grid w-full grid-cols-2 place-items-center gap-x-8">
        <div className="w-full space-y-4">
          <label>در حال حاظر مشغوم به تحصیل میباشم؟ </label>

          <CheckBoxIsStudent
            errors={errors}
            register={register}
            setValue={setValue}
          />
        </div>
        <div className="w-full">
          <label>شغل مورد نظر </label>
          <select
            {...register("position", {
              required: "لطفا فیلد  شغل مورد نظر انتخاب کنید ",
            })}
            className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
              errors.field?.message ? "border-red-600" : "border-[#D3D8DA]"
            } `}
          >
            <option value="option" selected>
              انتخاب
            </option>

            {jobs?.map((item: any, index: number) => (
              <option key={index} value={item?.id}>
                {item?.title}
              </option>
            ))}
          </select>
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.position?.message}
          </small>
        </div>
      </div>

      <div>
        <label>سوابق کاری</label>

        <textarea
          {...register("resume", {
            required: "لطفا فیلد  سوابق  کاری را پرکنید ",
          })}
          className={`mt-1 w-full border border-solid bg-white/50 p-3 ${
            errors.resume?.message ? "border-red-600" : "border-[#D3D8DA]"
          } `}
          rows={10}
        ></textarea>
        <small className="block h-7 font-peyda-400 text-red-600">
          {errors.resume?.message}
        </small>
      </div>
      <div className="flex flex-col gap-y-1">
        <FileUploderResume control={control} setValue={setValue} />
      </div>

      <Button
        type="submit"
        className="h-10 w-full bg-secendry font-peyda-400 text-sm text-white lg:text-lg mt-5"
        disabled={loading}
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
