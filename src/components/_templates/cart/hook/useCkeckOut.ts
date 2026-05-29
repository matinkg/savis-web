import { useDataContext } from "@/libs/context/app-data";
import { useCart } from "@/libs/context/cart-shopping/CartContext";
import { userInfoType } from "@/libs/interface";
import { cities } from "@/static_data/json/cities";
import { province } from "@/static_data/json/province";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const defaultUserValues = {
  phone: "",
  role: "",
  id: "",
  address: "",
  email: "",
  first_name: "",
  last_name: "",
  nickname: "",
  postal_code: "",
  city: "",
  province: "",
  recipient_name: "",
  recipient_last_name: "",
  recipient_phone: "",
};

export default function useCkeckOut() {
  const [loading, setLoading] = useState(false);
  const { state } = useCart();
  const { userInfo, loading: userInfoLaoding } = useDataContext();

  const perviousValue = {
    ...userInfo,
    city:
      cities?.find((item) => item?.title === userInfo?.city) || userInfo?.city,
    province:
      province?.find((item) => item?.title === userInfo?.province) ||
      userInfo?.province,
  };

  const methods = useForm({
    defaultValues: userInfo ? perviousValue : defaultUserValues,
    mode: "onSubmit",
  });

  const handleRequest = async (data: userInfoType) => {
    const ORIGIN_DATA = {
      ...data,
      province: data?.province?.title,
      city: data?.city?.title,
      phone: userInfo?.phone,
    };
  };
  return {
    methods,
    loading,
    state,
    handleRequest,
    userInfoLaoding,
  };
}
