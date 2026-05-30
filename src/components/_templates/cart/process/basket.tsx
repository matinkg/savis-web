"use client";
import React from "react";
import IsFree from "../isFree";
import {
  CartAction,
  CartItem,
  CartState,
} from "@/libs/context/cart-shopping/interface";
import { useDataContext } from "@/libs/context/app-data";
import BasketCart from "./basketCart";
import BasketFactor from "./basketFactor";

type propsType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  refreshCart: any;
};
export default function Basket({ state, dispatch, refreshCart }: propsType) {
  const { userInfo } = useDataContext();
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-10 lg:gap-6">
      <div className="lg:col-span-6">
        <IsFree price={Number(state?.totalAmount) || Number(state?.original_price) || 0} />

        <div className="mt-[26px] hidden w-full grid-cols-2 bg-gray-250 p-[18px] lg:grid">
          <div className="text-center font-peyda-600 text-lg text-blue-1050">
            <span>محصول</span>
          </div>
          <div className="text-center font-peyda-600 text-lg text-blue-1050">
            <span>قیمت</span>
          </div>
        </div>

        {/* BasketCart */}
        <div className="mt-5 flex flex-col gap-y-4">
          {state?.items?.map((item: CartItem) => (
            <BasketCart refreshCart={refreshCart} dispatch={dispatch} item={item} key={item?.sku} />
          ))}
        </div>
        {/* BasketCart */}
      </div>

      <BasketFactor
        packagingCost={state?.totalBoxPrice || 0}
        state={state}
        totalAmountPrice={state?.totalAmount}
        userInfo={userInfo}
        refreshCart={refreshCart}
      />
    </div>
  );
}
