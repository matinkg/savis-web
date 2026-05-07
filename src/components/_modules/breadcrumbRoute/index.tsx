import Link from "next/link";
import React from "react";

type BreadcrumbRoute = {
  stepOne?: string;
  category?: string;
  productDetails?: any;
  className?: string;
};
export default function BreadcrumbRoute({
  stepOne,
  category,
  productDetails,
  className,
}: BreadcrumbRoute) {
  return (
    <div
      className={`font-peyda-400 text-xs md:text-base text-blue-1050  ${className}`}
    >
      {stepOne}/{category}
      {productDetails?.categories?.map((cat: any) => (
        <Link key={"CAT_PARENTS_" + cat?.id} href={cat?.slug || "#"}>
          /{cat?.name}
        </Link>
      ))}
      <span className="text-primary">/{productDetails?.product?.name}</span>
    </div>
  );
}
