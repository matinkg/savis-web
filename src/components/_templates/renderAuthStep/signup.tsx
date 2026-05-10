"use client";

import GetNumber from "@/components/_modules/auth/getNumber";
import GetOtpCode from "@/components/_modules/auth/getOtpCode";
import GetPassword from "@/components/_modules/auth/getPassword";
import { getLocalStep } from "@/helper/localStorage/getLocalStep";
import { getLocalPhone } from "@/helper/localStorage/getLocalUserPhone";
import { Step } from "../../../../libs/interface/steps";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { localStorageKey } from "@/configs/constants";
import { clearLocalStorageKey } from "@/helper/localStorage/clearLocalStorage";

export default function RenderSignUpStep() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(getLocalStep());
  const [userPhone, setUserPhone] = useState(getLocalPhone());

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.localStorage !== "undefined"
    ) {
      localStorage.setItem(localStorageKey.CURRENTSTEP, currentStep);
      localStorage.setItem(localStorageKey.USERSPHONE, userPhone);
    }
  }, [currentStep, userPhone]);

  switch (currentStep) {
    case "GetNumber":
      return (
        <>
          <GetNumber
            action="register"
            setCurrentStep={setCurrentStep}
            setUserPhone={setUserPhone}
            authRequestUrl={"/api/v1/users/send-otp"}
          />

          <p
            onClick={() => {
              clearLocalStorageKey();
              router.push("/auth/signin");
            }}
            className="block text-center font-peyda-600 text-xs cursor-pointer"
          >
            حساب کاربری دارید؟ از اینجا وارد شوید
          </p>
        </>
      );
    case "GetOtpCode":
      return (
        <>
          <GetOtpCode
            setCurrentStep={setCurrentStep}
            setUserPhone={setUserPhone}
            userPhone={userPhone}
            authRequestUrl={"/api/v1/users/send-otp"}
            action={"register"}
          />

          <p
            onClick={() => setCurrentStep("GetNumber")}
            className="block cursor-pointer text-center font-peyda-600 text-xs"
          >
            آیا لازم است شماره موبایل خود را ویرایش کنید ؟ اینجا کلیک کنید
          </p>
        </>
      );
    case "GetPassword":
      return (
        <>
          <GetPassword
            userPhone={userPhone}
          />

          <p
            onClick={() => {
              clearLocalStorageKey();
              router.push("/auth/signin");
            }}
            className="mt-4 cursor-pointer text-center font-peyda-600 text-xs"
          >
            حساب کاربری دارید؟ از اینجا وارد شوید
          </p>
        </>
      );

    default:
      return null;
  }
}
