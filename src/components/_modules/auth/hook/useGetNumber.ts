import { request } from "@/configs/HTTPService";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import swal from "sweetalert";

type Inputs = {
  phone: string;
};

export default function useGetNumber(
  setCurrentStep: any,
  setUserPhone: any,
  authRequestUrl: string,
  action: string
) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const ORIGIN_DATA = {
      phone: data?.phone,
      action
    };
    setLoading(true);

    request(authRequestUrl, "POST", ORIGIN_DATA)
      .then((res) => {
        if (!res?.error) {
          const safeData = data || {};
          setUserPhone(safeData.phone ?? "");
          swal({
            title: `  کد ورود با موفقیت  به شماره تلفن ${data.phone}ارسال شد`,
            icon: "success",
            buttons: {
              confirm: {
                text: "وارد کردن کد",
                value: true,
                visible: true,
                className: "",
                closeModal: true,
              },
            },
          }).then(() => {
            setCurrentStep("GetOtpCode");
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    loading,
  };
}
