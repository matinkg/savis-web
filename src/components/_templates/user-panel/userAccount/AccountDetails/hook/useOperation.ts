import { request } from "@/configs/HTTPService";
import { useDataContext } from "@/libs/context/app-data";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
};

export default function useOperation() {
  const [loading, setLoading] = useState(false);
  const {
    userInfo,
    loading: userInfoLoading,
    fetchUserInfo,
  } = useDataContext();

  const perviousValue = {
    ...userInfo,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: userInfo ? perviousValue : defaultUserValues,
  });

  useEffect(() => {
    if (userInfo) {
      reset({
        ...defaultUserValues,
        ...userInfo,
      });
    }
  }, [userInfo, reset]);

  const handleRequest = async (data: Object) => {
    const ORIGIN_DATA = {
      ...data,
      phone: userInfo?.phone,
    };
    setLoading(true);
    request("/api/v1/user/update", "PUT", ORIGIN_DATA)
      .then((res) => {
        if (res?.success) {
          toast.success("تغییرات با موفقیت انجام شد");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const [showPassword, setShowPassword] = useState({
    pervPass: false,
    newPass: false,
  });

  return {
    register,
    handleSubmit,
    handleRequest,
    showPassword,
    setShowPassword,
    errors,
    loading,
    userInfoLoading,
    userInfo,
    fetchUserInfo,
  };
}
