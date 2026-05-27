"use client";
import React from "react";
import { useCart } from "@/libs/context/cart-shopping/CartContext";
import Basket from "../process/basket";

export default function CartTemplate() {
  const { state, dispatch, refreshCart } = useCart();
  return (
    <div className="space-y-10">
      {state?.items?.length > 0 ? (
        <>
          <Basket state={state} dispatch={dispatch} refreshCart={refreshCart} />
        </>
      ) : (
        <div className="py-80"></div>
      )}
    </div>
  );
}
