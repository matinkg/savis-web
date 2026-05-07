"use client";
import { goldApi } from "@/configs/api-constants";
import { useFetch } from "@/configs/HTTPService";
import React, { createContext, useContext } from "react";

interface GoldPriceContextType {
  goldData: any;
  goldError: any;
  isLoading: any;
}

interface GoldPriceProviderProps {
  children: React.ReactNode;
}

const GoldPriceContext = createContext<GoldPriceContextType | undefined>(
  undefined
);

export const GoldPriceProvider = ({ children }: GoldPriceProviderProps) => {
  const { data, error, isLoading } = useFetch<any>(goldApi?.get);

  return (
    <GoldPriceContext.Provider
      value={{ goldData: data ?? 0, goldError: error, isLoading: isLoading }}
    >
      {children}
    </GoldPriceContext.Provider>
  );
};

export const useGoldPrice = () => {
  const context = useContext(GoldPriceContext);

  if (context === undefined) {
    throw new Error("useGoldPrice must be used within a GoldPriceProvider");
  }

  return context;
};
