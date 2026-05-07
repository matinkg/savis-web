"use client";
import Input from "../input/inex";
import Button from "../button";
import RangeSliderComponents from "./scoringRange";
import useOperation from "./hook/useOperation";
import Spinner from "../loading/spinner";

export default function RegisterYourOpinionForm({ productId }: any) {
  const { handleRequest, loading, register, handleSubmit, errors, control } =
    useOperation();

  return (
    <form
      className="space-y-5 bg-gray-250 p-4"
      onSubmit={handleSubmit((data) => handleRequest({ ...data, productId }))}
    >
      <div className="space-y-2 border-b border-solid border-b-slate-1000/20 pb-4">
        <h1 className="font-peyda-600 text-base text-blue-1050">
          ثبت دیدگاه شما
        </h1>

        <span className="font-peyda-400 text-sm text-slate-1000/50">
          با ثبت نظر در بهبود فرایند تولید و ارائه با ما همکاری کنید
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6">
        <div className="flex flex-col gap-y-4">
          <div className="flex w-full items-center gap-x-4">
            <Input
              labelStyle="font-peyda-500 text-slate-1000 text-xs lg:text-sm"
              label="نام و نام خانوادگی"
              type="text"
              validate={{
                ...register("full_name", {
                  required: "لطفا فیلد نام , نام خانوادگی را پرکنید ",
                }),
              }}
              className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 font-peyda-400 text-xs text-slate-1000 ${
                errors.full_name?.message ? "border-red-600" : "border-[#D3D8DA]"
              } `}
            >
              {errors.full_name?.message && (
                <small className="block h-7 font-peyda-400 text-red-600">
                  {errors.full_name?.message}
                </small>
              )}
            </Input>
            <Input
              labelStyle="font-peyda-500 text-slate-1000 text-xs lg:text-sm"
              label="آدرس ایمیل"
              type="email"
              validate={{
                ...register("email", {
                  required: "لطفا فیلد آدرس ایمیل را پرکنید ",
                }),
              }}
              className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 font-peyda-400 text-xs text-slate-1000 ${
                errors.email?.message ? "border-red-600" : "border-[#D3D8DA]"
              } `}
            >
              {errors.email?.message && (
                <small className="block h-7 font-peyda-400 text-red-600">
                  {errors.email?.message}
                </small>
              )}
            </Input>
          </div>

          <div>
            <label className="font-peyda-500 text-xs text-slate-1000 lg:text-sm">
              دیدگاه شما
            </label>

            <textarea
              cols={30}
              rows={10}
              {...register("comment", {
                required: "لطفا فیلد  پیام را پرکنید ",
              })}
              className={`mt-1 w-full border border-solid bg-white/50 p-3 font-peyda-400 text-xs text-slate-1000 ${
                errors.comment?.message ? "border-red-600" : "border-[#D3D8DA]"
              } `}
            ></textarea>

            {errors.comment?.message && (
              <small className="block h-7 font-peyda-400 text-red-600">
                {errors.comment?.message}
              </small>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center bg-white/50 px-4 lg:px-6">
          <span className="block font-peyda-500 text-base text-blue-1050 lg:text-lg">
            ثبت امتیاز
          </span>
          <span className="mb-6 mt-2 block font-peyda-500 text-sm text-slate-1000/50">
            با ثبت نظر در بهبود کیفیت محصولات ما با ما همکاری کنید
          </span>
          <RangeSliderComponents name="rating" control={control} />
        </div>
      </div>
      <Button
        disabled={loading}
        className={`h-10 w-full font-peyda-400 text-sm text-white lg:text-lg ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-secendry"
        }`}
      >
        {loading ? (
          <Spinner type="source" className="w-8 h-8 text-white" />
        ) : (
          "ارسال پیام"
        )}
      </Button>
    </form>
  );
}
