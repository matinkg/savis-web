import { ProductStatusArray } from "@/configs/constants";
import React from "react";

function extracProductStatus(key: string) {
  const objectStatus = ProductStatusArray.find((item) => item?.key === key);

  return objectStatus;
}
function extracProductStatusName(key: string) {
  const objectStatus = ProductStatusArray.find((item) => item?.key === key);

  return objectStatus?.name;
}

export { extracProductStatusName, extracProductStatus };
