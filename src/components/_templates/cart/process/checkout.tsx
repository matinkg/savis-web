"use client";

import React from "react";
import OrderBox from "./orderBox";
import CheckOutForm from "../checkOutForm";
import useCkeckOut from "../hook/useCkeckOut";
import { FormProvider } from "react-hook-form";
import Spinner from "@/components/_modules/loading/spinner";

export default function Checkout() {
  const { methods, handleRequest, state, userInfoLaoding } =
    useCkeckOut();

  return (
    <>
      {userInfoLaoding ? (
        <div className="py-20">
          <Spinner className="w-8 h-8 " type="spinner" />
        </div>
      ) : (
        <FormProvider {...methods}>
          <form
            onSubmit={methods?.handleSubmit(handleRequest)}
            className="grid grid-cols-1 gap-10 lg:grid-cols-10 lg:gap-6"
          >
            <div className="lg:col-span-6">
              <h1 className="font-peyda-600 text-2xl lg:text-[32px]">
                صورت حساب و حمل و نقل
              </h1>
              {/* form */}
              <div className="mt-6 flex flex-col gap-y-4">
                <CheckOutForm />
              </div>
              {/* form */}
            </div>
            <div className="stickyStyle flex flex-col gap-y-6 lg:col-span-4 -mt-8 lg:-mt-0">
              <OrderBox isCompleted={false} state={state} />
            </div>
          </form>
        </FormProvider>
      )}
    </>
  );
}
