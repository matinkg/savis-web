"use client";

import React from "react";
import useSettingOperation from "../home/index/hook/setting/useOperation";
import ProductCard from "@/components/_modules/productCard";
import OffersProductsSkeleton from "@/components/_modules/skeletons/offers";

export default function OffersProducts({ offer }: { offer: any }) {
  const { savisOffers, loading } = useSettingOperation();

  const products = savisOffers?.find((p: any) => p.name === offer?.title);

  if (loading || !products) {
    return <OffersProductsSkeleton />;
  }

  return (
    <div className="mt-44">
      <h1 className="mb-10 text-center font-peyda-800 text-3xl text-blue-1050">
        {offer?.title}
      </h1>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 2xl:gap-6">
        {products?.products?.map((product: any) => (
          <ProductCard key={product?.id} product={product} />
        ))}
      </div>
    </div>
  );
}
