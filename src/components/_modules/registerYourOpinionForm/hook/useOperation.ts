import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { request } from "@/configs/HTTPService";
export default function useOperation() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      full_name: "",
      email: "",
      comment: "",
      rating: 0,
      productId: null
    },
  });

  const handleRequest = async (data: any) => {
    const ORIGIN_DATA = {
      ...data,
      rating: data?.rating / 20,
    };
    setLoading(true);
    request(`/api/v1/product/addcomment/${data?.productId}`, "POST", ORIGIN_DATA)
      .then((res) => {
        window?.location?.reload();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    handleRequest,
    loading,
    register,
    handleSubmit,
    reset,
    errors,
    control,
  };
}
