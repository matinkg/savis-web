"use client";
import React, { useEffect, useState } from "react";

import ProductCard from "@/components/_modules/productCard";
import { OffersTitleArray } from "@/configs/constants";

export default function HomeOffer({ savisOffers }: any) {
  const [active, setActive] = useState(OffersTitleArray[0]?.title);
  const [products, setProducts] = useState<any>([]);

  useEffect(()=>{
    const prods = savisOffers?.find((p: any) => p.name === active);
    setProducts(prods?.products)
  }, [active, savisOffers])

  return (
    <section className="mx-auto mb-[60px] w-[91.12%] lg:w-[91.67%] 4xl:w-[85%]">
      <div className="mb-8 mt-10 flex flex-col items-center lg:my-[60px]">
        <span className="block pb-10 font-peyda-800 text-2xl text-blue-1050 lg:text-2xl 2xl:text-3xl">
          پیشنهاد نیسا
        </span>
        {/* category */}

        <div className="flex-center gap-x-5 lg:gap-x-10">
          {OffersTitleArray?.map((item) => (
            <span
              onClick={() => {
                setActive(item.title);
              }}
              className={`cursor-pointer text-center font-peyda-500 text-sm lg:text-xl 2xl:text-2xl ${
                item.title === active ? "text-primary" : "text-blue-1050"
              }`}
              key={item?.id}
            >
              {item?.title}
            </span>
          ))}
        </div>
      </div>

      {/* content */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 2xl:gap-6">
        {products &&
          products.map((item: any) => (
            <ProductCard
              key={item?.id}
              product={item}
              // getDataFromServer={getDataFromServer}
            />
          ))}
      </div>
    </section>
  );
}
