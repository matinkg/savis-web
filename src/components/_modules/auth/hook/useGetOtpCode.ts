import { request } from "@/configs/HTTPService";
import { clearLocalStorageKey } from "@/helper/localStorage/clearLocalStorage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function useGetOtpCode(
  setCurrentStep: any,
  userPhone: any,
  setUserPhone: any,
  authRequestUrl: string,
  action: string,
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
        } else if (res?.status == 410) {
          setLoading({ ...loading, continuation: false });
          setOtpError(" کد وارد شده منقضی شده");
        } else if (res?.status === 201) {
          setLoading({ ...loading, continuation: false });

          if (action === "register") {
            toast.success("ثبت نام با موفقیت انجام شد");
            clearLocalStorageKey();
            setCurrentStep("GetPassword");
          } else {
            const token = res?.data?.token;
            const user = res?.data?.user;

            if (token) {
              Cookies.set("authToken", token, { expires: 7 });
              Cookies.set("user", JSON.stringify(user), { expires: 7 });

              let cart = localStorage.getItem("cart");
              cart = cart ? JSON.parse(cart) : { items: [], totalAmount: 0 };

              await request("/api/v1/users/updateCart", "PATCH", cart);
              localStorage.removeItem("cart");
            }

            clearLocalStorageKey();
            toast.success("ورود با موفقیت انجام شد");
            router.push("/user-panel");
          }
        } else {
          setLoading({ ...loading, continuation: false });
          setOtpError("مشکلی پیش آمده.");
        }
      } else {
        setLoading({ ...loading, continuation: false });

        console.error("userPhone یا otp_code مقدار نادرست دارند");
      }
    } catch (error) {
      setLoading({ ...loading, continuation: false });
      console.log("error => ", error);
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
            toast.success(
              `کد پیامکی با موفقیت به شماره تلفن ${safeData.phone} ارسال شد`,
            );
          }
        })
        .finally(() => {
          setLoading({ ...loading, resend: true });
        });
    } catch (error) {
      console.log("message =>", error);
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
