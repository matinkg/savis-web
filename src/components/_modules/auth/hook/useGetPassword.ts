import React, { useState } from "react";

import swal from "sweetalert";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { clearLocalStorageKey } from "@/helper/localStorage/clearLocalStorage";
import { showSwal } from "@/helper/swal";
import { toast } from "react-toastify";
import { request } from "@/configs/HTTPService";
import Cookies from 'js-cookie';

type Inputs = {
  password: string;
};

export default function useGetPassword(userPhone: string) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
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
    
      const res = await request("/api/v1/users/signup", "POST", {
        phone: userPhone,
        password: data?.password,
        otp_code: localStorage.getItem("code"),
        referral_code
      });
      
      if (res?.status === 201) {
        const token = res?.data?.token;
        const user = res?.data?.user;

        if (token) {
          Cookies.set("authToken", token, { expires: 7 });
        }
        if (user) {
          Cookies.set("user", JSON.stringify(user), { expires: 7 });
        }
        
        // Also update cart for new user just in case
        let cart = localStorage.getItem("cart");
        if (cart) {
          await request("/api/v1/users/updateCart", "PATCH", JSON.parse(cart));
          localStorage.removeItem("cart");
        }
        
        setLoading(false);
        clearLocalStorageKey();

        toast.success("موفقیت آمیز");
        router.push("/user-panel");
      } else if (res?.status) {
        setLoading(false);
        toast.error(res?.error || "خطایی رخ داد");
        clearLocalStorageKey();
      } else if (res?.status === 500) {
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
    errors,
    register,
    setShowPassword,
    showPassword,
    loading,
    handleSubmit,
    onSubmit,
  };
}
