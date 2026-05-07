import React from "react";
import Button from "../button";
import Link from "next/link";
import ProductCard from "../productCard";
import ArrowLeft from "@/public/icons/arrowLeft";
import { ProductCardProps } from "../../../../libs/interface/ProductCard";

interface RelatedProductsDataProps {
  RelatedProductsData: any;
  className?: string;
}

export default function RelatedProducts({
  RelatedProductsData,
  className,
}: RelatedProductsDataProps) {
  return (
    <div className="w-full mt-10 pb-16 lg:mt-[60px]">
      <div className={`${className} `}>
        <div className="flex w-full items-end justify-between border-b border-solid border-b-[#C8CECF] child:pb-5">
          <div>
            <span className="font-peyda-800 text-2xl text-blue-1050 2xl:text-3xl">
              محصولات مرتبط
            </span>
          </div>

          <div className="flex items-center gap-x-6">
            <Button className="flex items-center gap-x-1 bg-white p-2 font-peyda-400 text-sm text-blue-1050 lg:px-[18px] lg:py-3 lg:text-lg">
              <Link href={`/gold`}>
                <span>نمایش همه</span>
              </Link>
              <ArrowLeft href="#" className="h-[18px] w-[18px] lg:h-6 lg:w-6" />
            </Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4">
          {RelatedProductsData?.slice(0, 4).map((item: any) => (
            <ProductCard product={item} key={item?.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
