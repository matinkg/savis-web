"use client";

import Button from "@/components/_modules/button";
import Input from "@/components/_modules/input/inex";
import Spinner from "@/components/_modules/loading/spinner";
import Logo from "@/components/_modules/logo";
// ------------------------------------------------------------------------
import { authApi } from "@/configs/api-constants";
import { request } from "@/configs/HTTPService";
import Eye from "@/public/icons/eye";
import EyeSlash from "@/public/icons/eyeSlash";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });
  const router = useRouter();
  const onSubmit = (data: any) => {
    const ORIGIN_DATA = {
      phone: data?.identifier,
      password: data?.password,
    };
    setLoading(true);
    request(authApi?.ADMIN, "POST", ORIGIN_DATA)
      .then((res) => {
        if (!res?.error) {
          router.push("/admin-panel");
        } else {
          console.log(res.error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <section className="signInBackImg_mobile md:signInBackImg flex flex-col lg:flex-row">
        <Logo
          type="third"
          className="mx-auto mt-[60px] block h-[147px] w-[87px] text-white lg:mt-[72px] lg:hidden"
        />
        <div className="mt-auto w-full bg-white/20 py-[60px] backdrop-blur-2xl lg:h-screen lg:w-[45.5%] lg:py-0">
          <div className="flex flex-col items-center lg:gap-y-[146px]">
            <Logo
              type="third"
              className="mt-[60px] hidden h-[147px] w-[87px] text-white lg:mt-[72px] lg:block"
            />

            <div className="flex w-[91.1%] flex-col items-center text-white lg:w-[69.5%]">
              <h1 className="mb-6 text-center font-peyda-600 text-2xl lg:mb-8 lg:text-[32px]">
                ورود به حساب کاربری
              </h1>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-8"
              >
                <Input
                  type="text"
                  label="نام کاربری"
                  labelStyle="font-peyda-400  text-xs lg:text-base mb-4"
                  className={` w-full h-[48px] px-3  outline-none focus:border-2 focus:outline-none ${
                    errors?.identifier
                      ? " border border-solid border-[#F3434399] bg-[#F343431A]"
                      : "border border-solid border-white/40 bg-white/20"
                  }`}
                  validate={{
                    ...register("identifier", {
                      required: true,
                    }),
                  }}
                />
                <Input
                  label="رمز عبور"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`ltrDir h-[48px] px-3 outline-none focus:border-2 focus:outline-none ${
                    errors.password
                      ? "border border-solid border-[#F3434399] bg-[#F343431A] text-red-250"
                      : "border border-solid border-white/40 bg-white/20"
                  }`}
                  labelStyle="font-peyda-400  text-xs lg:text-base mb-4"
                  validate={{
                    ...register("password", {
                      required: "لطفا فیلد  پسورد را پرکنید ",
                    }),
                  }}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPassword(!showPassword);
                    }}
                    className="eyePosition"
                  >
                    {showPassword ? (
                      <Eye className="h-6 w-6 text-gray-400" />
                    ) : (
                      <EyeSlash className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                </Input>
                <Button
                  type="submit"
                  className=" h-[48px] w-full bg-white font-peyda-400 text-blue-1050  lg:text-lg"
                >
                  {loading ? (
                    <>
                      <Spinner type="spinner" className="w-8 h-8" />
                    </>
                  ) : (
                    <span> ورود</span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
