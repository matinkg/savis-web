import Input from "@/components/_modules/input/inex";
import SelectFullSearch from "@/components/_modules/select-fullSearch";
import { Controller, useFormContext } from "react-hook-form";
import useHandelprovince from "./hook/useHandelprovince";
import { useEffect } from "react";
import {
  useGetProvinceCities,
  useGetProvinces,
  useGetShippingOptions,
} from "@/lib/hooks/services/shipping/index.query";

export default function CheckOutForm() {
  const {
    control,
    register,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedProvince = watch("province");
  const selectedCity = watch("city");
  const provinceId = selectedProvince?.id;
  const cityId = selectedCity?.id;
  const { data: provincesData } = useGetProvinces();
  const { data: citiesData, isLoading: citiesLoading } = useGetProvinceCities(
    Number(provinceId),
  );
  const { data: shippingOptionsData } = useGetShippingOptions(
    Number(provinceId),
    Number(cityId),
  );

  const shippingOptions = shippingOptionsData?.data || [];
  const requiresShipping = shippingOptionsData?.requires_shipping;
  const isShippingLoading = !shippingOptionsData;
  const isLocationReady = !!provinceId && !!cityId;
  // --------------------------------------------
  const { handleChangeProvincesData } = useHandelprovince();
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

  // --------------------------------------------

  useEffect(() => {
    const province = watch("province");

    if (!province) {
      const tmp = getValues("province");

      if (tmp) {
        handleChangeProvincesData(tmp);
      }
    }
  }, [watch, getValues, handleChangeProvincesData]);

  useEffect(() => {
    if (!provinceId) return;
    const currentCity = getValues("city");
    if (currentCity?.province_id !== provinceId) {
      setValue("city", null);
    }
  }, [provinceId]);

  useEffect(() => {
    if (!shippingOptions.length) return;

    const current = getValues("shipping_method");

    const isCurrentValid = shippingOptions.some(
      (item: any) => item.code === current,
    );

    if (!current || !isCurrentValid) {
      setValue("shipping_method", shippingOptions[0].code, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [shippingOptionsData, provinceId, cityId]);

  return (
    <>
      <div className="w-full  font-peyda-400 text-base space-y-5 my-10 lg:my-[60px]   ">
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
              {errors.first_name?.message && String(errors.first_name?.message)}
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
              {errors.last_name?.message && String(errors.last_name?.message)}
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
                    onChange(selectedProvince);
                  }}
                  selectedOption={value}
                  options={provincesData?.data || []}
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
              <div
                className={` w-full ${errors?.city ? "border-rose-600" : ""}`}
              >
                <SelectFullSearch
                  handleChange={(selectedCity: any) => onChange(selectedCity)}
                  selectedOption={value}
                  options={citiesData?.data || []}
                  title="شهر محل سکونت"
                  isMulti={false}
                  loading={citiesLoading}
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

        {/* ------------------------------------------------------- */}
        <div className="w-full space-y-4">
          <label>نحوه ارسال بسته</label>
          {!provinceId || !cityId ? (
            <div className="text-sm text-gray-400 font-peyda-400">
              لطفاً استان و شهر را انتخاب کنید تا روش‌های ارسال نمایش داده شود
            </div>
          ) : isShippingLoading ? (
            <div className="text-sm text-gray-500 font-peyda-400 animate-pulse">
              در حال بررسی روش‌های ارسال...
            </div>
          ) : requiresShipping === false ? (
            <div className="text-sm text-gray-500 font-peyda-400">
              این سفارش نیاز به ارسال ندارد
            </div>
          ) : shippingOptions.length === 0 ? (
            <div className="text-sm text-red-600 font-peyda-400">
              متأسفانه امکان ارسال به شهر انتخاب شده وجود ندارد
            </div>
          ) : (
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {shippingOptions.map((item: any) => (
                <div key={item.code} className="flex items-center">
                  <Controller
                    name="shipping_method"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <label className="checkbox2">
                        <input
                          type="radio"
                          value={item.code}
                          checked={value === item.code}
                          onChange={() => onChange(item.code)}
                        />
                        <span className="checkmark2"></span>
                      </label>
                    )}
                  />

                  <span className="mr-6 mb-1 text-sm lg:text-lg text-blue-1050">
                    {item.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* ------------------------------------------------------- */}

        {/* ------------------------------------------------------- */}
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
            {errors.address?.message && String(errors.address?.message)}
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
              {errors.phone?.message && String(errors.phone?.message)}
            </small>
          </Input>
        </div>

        <Input
          label="ایمیل"
          isStar={true}
          type="text"
          validate={{
            ...register("email", {
              required: "لطفا فیلد   آدرس را پرکنید ",
            }),
          }}
          className={`mt-1 h-10 w-full border border-solid bg-white/50 px-3 ${
            errors.address?.message ? "" : "border-[#D3D8DA]"
          } `}
        >
          <small className="block h-7 font-peyda-400 text-red-600">
            {errors.email?.message && String(errors.email?.message)}
          </small>
        </Input>

        {/* ------------------------------------------------------------------------------------------------------------- */}

        <div className="space-y-3 lg:space-y-6">
          <span className="block font-peyda-600 text-2xl lg:text-[32px]">
            تحویل گیرنده سفارش
          </span>

          <span className=" block  font-peyda-400 text-sm lg:text-base">
            اگر گیرنده سفارش شخص دیگری هست اطلاعات شخص مورد نظر را در این قسمت
            وارد کنید (اختیاری)
          </span>

          <div className="space-y-4">
            <div className="w-full grid grid-cols-2 place-items-center gap-x-2 lg:gap-x-8">
              <Input
                label="نام"
                type="text"
                isStar={false}
                validate={{
                  ...register("recipient_name", {
                    // required: "لطفا فیلد  نام  گیرنده را پرکنید ",
                  }),
                }}
                className={`w-full h-10 mt-1 px-3 bg-white/50 border-solid border  ${
                  errors.recipient_name?.message
                    ? "border-red-600"
                    : "border-[#D3D8DA] "
                } `}
              >
                <small className="text-red-600 font-peyda-400  block h-7  ">
                  {/* {errors.recipient_name?.message} */}
                </small>
              </Input>
              <Input
                label="نام خانوادگی"
                isStar={false}
                type="text"
                validate={{
                  ...register("recipient_last_name", {
                    // required: "لطفا فیلد نام خانوادگی گیرنده را پرکنید ",
                  }),
                }}
                className={`w-full h-10 mt-1 px-3 bg-white/50 border-solid border ${
                  errors.recipient_last_name?.message
                    ? "border-red-600"
                    : "border-[#D3D8DA] "
                } `}
              >
                <small className="text-red-600 font-peyda-400  block h-7">
                  {/* {errors.recipient_last_name?.message} */}
                </small>
              </Input>
            </div>

            <Input
              isStar={false}
              label=" شماره موبایل"
              type="text"
              validate={{
                ...register("recipient_phone", {
                  // required: "لطفا فیلد شماره موبایل  گیرنده را پرکنید ",
                }),
              }}
              className={`w-full h-10 mt-1 px-3 bg-white/50 border-solid border ${
                errors.recipient_phone?.message
                  ? "border-red-600"
                  : "border-[#D3D8DA] "
              } `}
            >
              <small className="text-red-600 font-peyda-400  block h-7">
                {/* {errors.recipient_phone?.message} */}
              </small>
            </Input>
          </div>
        </div>

        <div>
          <span className="block font-peyda-600 text-2xl lg:text-[32px] text-blue-1050 mb-6 lg:mb-10">
            توضیحات تکمیلی{" "}
          </span>

          <label className="font-peyda-400 text-sm lg:text-base text-blue-1050">
            توضیحات سفارش (اختیاری)
          </label>

          <textarea
            {...register("note")}
            placeholder="یادداشت‌ها درباره سفارش شما، برای مثال نکات مهم درباره نحوه تحویل سفارش"
            className={`w-full mt-1 p-3 max-h-44 lg:max-h-52 bg-white/50 border-solid border ${
              false ? "border-red-600" : "border-[#D3D8DA] "
            }`}
            rows={10}
          ></textarea>
        </div>
      </div>
    </>
  );
}
