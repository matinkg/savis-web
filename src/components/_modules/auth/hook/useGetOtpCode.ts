import { request } from "@/configs/HTTPService";
import { clearLocalStorageKey } from "@/helper/localStorage/clearLocalStorage";
import sendSms from "@/helper/sendSms";
import { showSwal } from "@/helper/swal";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function useGetOtpCode(
  setCurrentStep: any,
  userPhone: any,
  setUserPhone: any,
  authRequestUrl: string,
  action: string
) {
  const [code, setCode] = useState([]);
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState({
    continuation: false,
    resend: false,
  });

  const router = useRouter();

  const verifyCode = async () => {
    const otp_code = code.join("");
    localStorage.setItem("code", otp_code);

    if (otp_code.length !== 6) {
      return setOtpError(" کد وارد شده صحیح نمی باشد");
    }
    setLoading({ ...loading, continuation: true });

    try {
      if (userPhone && otp_code) {
        const referral_code = Cookies.get("referral_code");

        const res = await request("/api/v1/users/verify-otp", "POST", {
          otp_code,
          phone: userPhone,
          action,
          referral_code,
        });
        if (res?.status === 409) {
          setLoading({ ...loading, continuation: false });
          setOtpError(" کد وارد شده صحیح نمی باشد");

          return showSwal("کد وارد شده معتبر نیست", "error", "تلاش مجدد");
        } else if (res?.status == 410) {
          setLoading({ ...loading, continuation: false });
          setOtpError(" کد وارد شده منقضی شده");
          return showSwal("کد وارد شده منقضی شده", "error", "تلاش مجدد");
        } else if (res?.status === 201) {
          setLoading({ ...loading, continuation: false });
          toast.success("شماره تلفن شما با موفقیت احراز شد");

          if (action === "register") {
            setCurrentStep("GetPassword");
          } else {
            const token = res?.data?.token;
            const user = res?.data?.user;

            if (token) {
              Cookies.set("authToken", token, { expires: 7 });
              Cookies.set("user", JSON.stringify(user), { expires: 7 });
              let cart = localStorage.getItem("cart");
              cart = cart
                ? JSON.parse(cart)
                : { items: [], totalAmount: 0 };
              await request("/api/v1/users/updateCart", "PATCH", cart);
              localStorage.removeItem("cart");
            }

            router.push("/user-panel");
          }
          clearLocalStorageKey();
        } else {
          setLoading({ ...loading, continuation: false });
          setOtpError("مشکلی پیش آمده.");
          return showSwal("مشکلی پیش آمده.", "error", "تلاش مجدد");
        }
      } else {
        setLoading({ ...loading, continuation: false });

        console.error("userPhone یا otp_code مقدار نادرست دارند");
      }
    } catch (error) {
      setLoading({ ...loading, continuation: false });
      console.log("error => ", error);
      return showSwal("خطای غیرمنتظره‌ای رخ داد.", "error", "تلاش مجدد");
    }
  };

  const resendOTPHandler = async () => {
    try {
      setLoading({ ...loading, resend: true });
      const data = { phone: userPhone, action };
      request(authRequestUrl, "POST", data)
        .then((res) => {
          if (!res?.error) {
            const safeData = data || {};
            setUserPhone(safeData.phone ?? "");
            toast.success(`کد ورود با موفقیت به شماره تلفن ${data.phone} ارسال شد`);
            setCurrentStep("GetOtpCode");
          }
        })
        .finally(() => {
          setLoading({ ...loading, resend: true });
        });
    } catch (error) {
      console.log("message =>", error);
      return showSwal("خطای غیرمنتظره‌ای رخ داد.", "error", "تلاش مجدد");
    }
  };
  return {
    resendOTPHandler,
    verifyCode,
    code,
    setCode,
    otpError,
    setOtpError,
    loading,
  };
}
