import Button from "@/components/_modules/button";
import Input from "@/components/_modules/input/inex";
import SelectFullSearch from "@/components/_modules/select-fullSearch";
import React from "react";
import { Controller } from "react-hook-form";
import useAddressOperation from "./hook/useAddressOperation";
import { province } from "../../../../static_data/json/province";
import { userInfoType } from "@/libs/interface";
import Spinner from "@/components/_modules/loading/spinner";

type propsType = {
  userInfo: userInfoType;
  inEditMode: boolean;
};

export default function AddressForm({ userInfo, inEditMode }: propsType) {
  const {
    register,
    handleSubmit,
    reset,

    errors,
    control,
    handleRequest,
    filteredCities,
    cititiesLoading,
    handleChangeProvincesData,
    loading,
  } = useAddressOperation(userInfo, inEditMode);

  //   ---------------

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      borderRadius: "0px !important", // تغییر border-radius
      borderColor: state.isFocused ? "#2684FF" : "#d1d5db", // تغییر رنگ مرز هنگام فوکوس
      boxShadow: state.isFocused ? "0 0 0 1px #2684FF" : null,
      "&:hover": {
        borderColor: "#2684FF",
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: "0px", // حذف گردی گوشه‌ها برای منوی انتخاب
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#F3F4F6" : "#fff", // تغییر رنگ زمینه گزینه‌ها
      color: "#111827",
    }),
  };

  return (
    <form
      onSubmit={handleSubmit(handleRequest)}
      className="font-peyda-400 text-blue-1050"
    >
      <h1 className="mb-6 font-peyda-600 text-2xl lg:text-[32px]">آدرس</h1>
      <div className="grid w-full grid-cols-2 place-items-center gap-x-2 lg:gap-x-8">
        <Input
          label="نام"
          isStar={true}
          type="text"
          validate={{
            ...register("first_name", {
              required: "لطفا فیلد  نام را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.first_name?.message ? "" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.first_name?.message}
          </small>
        </Input>
        <Input
          label="نام خانوادگی"
          isStar={true}
          type="text"
          validate={{
            ...register("last_name", {
              required: "لطفا فیلد نام خانوادگی  را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.last_name?.message ? "" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.last_name?.message}
          </small>
        </Input>
      </div>

      {/* ----------------------------------------------------------------------- */}
      <div className="grid w-full grid-cols-2 place-items-center gap-x-2 lg:gap-x-8 ">
        {/* انتخاب استان */}
        <Controller
          name="province"
          control={control}
          rules={{
            required: "انتخاب استان الزامی است ",
          }}
          render={({ field: { onChange, value } }) => (
            <div
              className={` w-full ${errors?.province ? "border-rose-600" : ""}`}
            >
              <SelectFullSearch
                handleChange={(selectedProvince: any) => {
                  handleChangeProvincesData(selectedProvince);
                  onChange(selectedProvince); // ثبت مقدار استان انتخابی
                }}
                selectedOption={value}
                options={province}
                title="استان محل سکونت"
                isMulti={false}
                classNamePrefix="w-full"
                customStyles={customStyles}
              />
              <small className="block h-7 font-peyda-400 text-red-600">
                {errors.province && String(errors.province?.message)}
              </small>
            </div>
          )}
        />

        {/* انتخاب شهر */}
        <Controller
          name="city"
          control={control}
          rules={{
            required: "انتخاب شهر الزامی است ",
          }}
          render={({ field: { onChange, value } }) => (
            <div className={` w-full ${errors?.city ? "border-rose-600" : ""}`}>
              <SelectFullSearch
                handleChange={(selectedCity: any) => onChange(selectedCity)}
                selectedOption={value}
                options={filteredCities} // استفاده از شهرهای فیلتر شده
                title="شهر محل سکونت"
                isMulti={false}
                loading={cititiesLoading}
                isStar={true}
                classNamePrefix={`w-full`}
                titleStyle="font-peyda-400"
                customStyles={customStyles}
              />
              <small className="block h-7 font-peyda-400 text-red-600  ">
                {errors.city && String(errors.city?.message)}
              </small>
            </div>
          )}
        />
      </div>
      {/* ----------------------------------------------------------------------- */}

      <Input
        label=" آدرس دقیق"
        isStar={true}
        type="text"
        validate={{
          ...register("address", {
            required: "لطفا فیلد   آدرس را پرکنید ",
          }),
        }}
        className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
          errors.address?.message ? "" : "border-[#D3D8DA]"
        } `}
      >
        <small className="block h-7 font-peyda-400 text-red-600">
          {errors.address?.message}
        </small>
      </Input>

      <div className="grid w-full grid-cols-2 place-items-center gap-x-2 lg:gap-x-8">
        <Input
          label="کد پستی"
          isStar={true}
          type="text"
          validate={{
            ...register("postal_code", {
              required: "لطفا فیلد  کد پستی را پرکنید ",
              minLength: {
                message: "کد پستی را به درستی وارد کنید ",
                value: 10,
              },
              maxLength: {
                message: "کد پستی را به درستی وارد کنید ",
                value: 10,
              },
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.postal_code?.message ? "" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.postal_code && String(errors.postal_code?.message)}
          </small>
        </Input>
        <Input
          label=" شماره موبایل"
          isStar={true}
          type="text"
          validate={{
            ...register("phone", {
              required: "لطفا فیلد   شماره موبایل را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.phone?.message ? "" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.phone?.message}
          </small>
        </Input>
      </div>

      <Button className="flex-center mx-auto mt-6 w-full h-10 bg-secendry py-2 text-center font-peyda-400 text-white md:w-[312px] lg:mt-10 lg:py-3 xl:text-lg">
        {loading ? <Spinner type="source" className="w-8 h-8" /> : "ذخیره آدرس"}
      </Button>
    </form>
  );
}
