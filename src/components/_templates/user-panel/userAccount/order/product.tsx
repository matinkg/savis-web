import React from "react";

export default function Product({item} : any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-4">
        <img src={item?.product?.image} alt="" className="w-[100px] h-[100px]" />

        <div className="flex flex-col gap-y-2 lg:gap-y-3 my-auto font-peyda-400 text-sm lg:text-base">
          <span className="block   text-blue-1050">
            {item?.variation?.name || item?.product?.name}  × {item?.quantity}
          </span>

          <span className="block text-slate-1000/50 text-xs lg:text-sm">
            کد محصول : {item?.variation?.sku || item?.product?.sku}
          </span>
          <span className="lg:hidden block font-peyda-600 text-lg text-slate-1000/50">
            {Number(item?.price).toLocaleString("fa")} تومان
          </span>
        </div>
      </div>
      <span className="hidden lg:block font-peyda-600 text-lg text-slate-1000/50">
        {Number(item?.price).toLocaleString("fa")} تومان
      </span>
    </div>
  );
}
