"use client";
import React from "react";
import Button from "../button";
import OtpInputWithValidation from "../InputWithValidation";
import CountdownTimer from "../countdown-Timer";
import { Step } from "../../../../libs/interface/steps";
import Spinner from "../loading/spinner";
import useGetOtpCode from "./hook/useGetOtpCode";

interface StepsProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<Step>>;
  userPhone?: string;
  setUserPhone: React.Dispatch<React.SetStateAction<string>>;
  authRequestUrl: string;
  action: string;
}

export default function GetOtpCode({
  setCurrentStep,
  userPhone,
  setUserPhone,
  authRequestUrl,
  action
}: StepsProps) {
  // ------------------------hook-------------------------------------

  const {
    resendOTPHandler,
    verifyCode,
    setCode,
    otpError,
    setOtpError,
    loading,
  } = useGetOtpCode(
    setCurrentStep,
    userPhone,
    setUserPhone,
    authRequestUrl,
    action
  );
  // ------------------------hook-------------------------------------

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-6 lg:mb-10">
        <label className="mb-5 block font-peyda-400 text-xs lg:text-sm">
          کد ۶ رقمی ارسال شده به تلفن همراه خود را وارد کنید
        </label>

        <OtpInputWithValidation
          numberOfDigits={6}
          setCode={setCode}
          otpError={otpError}
          setOtpError={setOtpError}
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-x-4">
        <Button
          onClick={() => verifyCode()}
          className="mb-6 h-[48px] w-full bg-secendry font-peyda-400 text-sm text-white lg:mb-[18px] lg:text-lg"
        >
          {loading?.continuation ? (
            <>
              <Spinner type="spinner" className="w-8 h-8" />
            </>
          ) : (
            <span>ادامه</span>
          )}
        </Button>

        <Button className="h-[48px] border border-solid border-white/40 bg-white/20 font-peyda-400 text-sm lg:text-lg">
          <CountdownTimer
            resendOTPHandler={resendOTPHandler}
            loading={loading}
          />
        </Button>
      </div>
    </div>
  );
}
