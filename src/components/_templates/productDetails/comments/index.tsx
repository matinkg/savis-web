import React from "react";
import UserComments from "./userComments";
import RegisterYourOpinionForm from "@/components/_modules/registerYourOpinionForm";

export default function ProductComments({ productDetails }: any) {
  return (
    <div className="space-y-4">
      {/* form comments :  */}
      <RegisterYourOpinionForm productId={productDetails?.product?.id} />
      {/* user comments :  */}
      {productDetails?.comments?.map((item: any, index: number) => (
        <UserComments key={index} index={index} item={item} />
      ))}
    </div>
  );
}
