import Link from "next/link";
import Button from "../button";
import ArrowLeft from "@/public/icons/arrowLeft";
import ProductCard from "../productCard";
import { ProductCardProps } from "../../../../libs/interface/ProductCard";

interface SetProductsDataProps {
  RelatedProductsData: any;
  className?: string;
}

export default function SetProducts({
  RelatedProductsData,
  className,
}: SetProductsDataProps) {
  return (
    <div className="mt-10 pb-16 lg:mt-[60px]">
      <div className={`${className} `}>
        <div className="flex w-full items-end justify-between border-b border-solid border-b-[#C8CECF] child:pb-5">
          <div>
            <span className="font-peyda-800 text-2xl text-blue-1050 2xl:text-3xl">
              محصول ست شده
            </span>
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
