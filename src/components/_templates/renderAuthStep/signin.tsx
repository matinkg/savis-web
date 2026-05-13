"use client";

import GetNumber from "@/components/_modules/auth/getNumber";
import GetOtpCode from "@/components/_modules/auth/getOtpCode";
import VerifyUserPassword from "@/components/_modules/auth/verifyUserPassword";
import { clearLocalStorageKey } from "@/helper/localStorage/clearLocalStorage";
import { getLocalPhone } from "@/helper/localStorage/getLocalUserPhone";
import { Step } from "../../../../libs/interface/steps";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RenderSigninStep() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>("GetNumber");
  const [userPhone, setUserPhone] = useState(getLocalPhone());

  switch (currentStep) {
    case "GetNumber":
      return (
        <>
          <GetNumber
            setCurrentStep={setCurrentStep}
            setUserPhone={setUserPhone}
            authRequestUrl={"/api/v1/users/send-otp"}
            action={"login"}
          />

          <p
            onClick={() => {
              clearLocalStorageKey();
              router.push("/auth/signup");
            }}
            className="mt-3 cursor-pointer font-peyda-600 text-xs"
          >
            حساب کاربری ندارید؟ از اینجا حساب کاربری خود را ایجاد کنید
          </p>
        </>
      );
    case "GetOtpCode":
      return (
        <>
          <GetOtpCode
            action="login"
            setCurrentStep={setCurrentStep}
            setUserPhone={setUserPhone}
            userPhone={userPhone}
            authRequestUrl={"/api/v1/users/send-otp"}
          />

          <p
            onClick={() => setCurrentStep("GetPassword")}
            className="cursor-pointer font-peyda-600 text-xs"
          >
            ورود با رمز عبور
          </p>
        </>
      );
    case "GetPassword":
      return (
        <>
          <VerifyUserPassword userPhone={userPhone} />

          <p
            onClick={() => setCurrentStep("GetNumber")}
            className="mt-4 block cursor-pointer text-center font-peyda-600 text-xs"
          >
            آیا لازم است شماره موبایل خود را ویرایش کنید ؟ اینجا کلیک کنید
          </p>

          <p
            onClick={() => {
              clearLocalStorageKey();
              router.push("/auth/signup");
            }}
            className="mt-3 cursor-pointer font-peyda-600 text-xs"
          >
            ایجاد حساب کاربری
          </p>
        </>
      );

    default:
      return null;
  }
}
