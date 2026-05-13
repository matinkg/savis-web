import React, { useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import swal from "sweetalert";
import { clearLocalStorageKey } from "@/helper/localStorage/clearLocalStorage";
import { showSwal } from "@/helper/swal";
import { toast } from "react-toastify";
import { request } from "@/configs/HTTPService";
import Cookies from "js-cookie";

type Inputs = {
  password: string;
};

export default function useVerifyUserPassword(userPhone: string) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);

    try {
      const referral_code = Cookies.get("referral_code");

      const res = await request("/api/v1/users/signin", "POST", {
        phone: userPhone,
        password: data?.password,
        referral_code
      });
      if (res?.status === 200) {
        clearLocalStorageKey();
        const token = res?.data?.token;
        const user = res?.data?.user;

        if (token) {
          Cookies.set("authToken", token, { expires: 7 });
          Cookies.set("user", JSON.stringify(user), { expires: 7 });
        }

        setLoading(false);
        toast.success(" به نیسا خوش امدید");
        router.push("/user-panel");
      } else if (res?.status === 401 || res?.status === 404) {
        setPasswordError(true);
        setLoading(false);
        return showSwal(
          "کاربری با این اطلاعات  وجود ندارد",
          "error",
          "تلاش مجدد"
        );
      } else if (res?.status === 500) {
        clearLocalStorageKey();
        setLoading(false);
        return showSwal("خطای غیرمنتظره‌ای رخ داد.", "error", "تلاش مجدد");
      }
    } catch (error) {
      setLoading(false);

      console.log("error =>", error);
      return showSwal("خطای غیرمنتظره‌ای رخ داد.", "error", "تلاش مجدد");
    }
  };
  return {
    handleSubmit,
    onSubmit,
    showPassword,
    errors,
    register,
    setShowPassword,
    passwordError,
    loading,
  };
}
