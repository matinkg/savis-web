import { request } from "@/configs/HTTPService";
import { useDataContext } from "@/libs/context/app-data";
import { userInfoType } from "@/libs/interface";
import { cities } from "@/static_data/json/cities";
import { province } from "@/static_data/json/province";
import { useState } from "react";
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

export default function useAddressOperation(
  userInfo: userInfoType,
  inEditMode: boolean
) {
  const [loading, setLoading] = useState(false);
  const { fetchUserInfo } = useDataContext();

  const perviousValue = {
    ...userInfo,
    city:
      cities?.find((item) => item?.title === userInfo?.city) || userInfo?.city,
    province:
      province?.find((item) => item?.title === userInfo?.province) ||
      userInfo?.province,
  };

  // console.log("🚀 ~ perviousValue:", perviousValue);

  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: inEditMode ? perviousValue : defaultUserValues,
    mode: "onSubmit",
  });

  const handleRequest = async (data: userInfoType) => {
    const ORIGIN_DATA = {
      ...data,
      province: data?.province?.title,
      city: data?.city?.title,
      phone: userInfo?.phone,
    };
    setLoading(true);
    request("/api/v1/user/update-address", "PUT", ORIGIN_DATA)
      .then((res) => {
        if(res?.success){
          toast.success("تغییرات با موفقیت ثبت شد");
          fetchUserInfo()
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };
  //   --------------------------------------------------------------------
  const [selectedProvinces, setSelectedProvinces] = useState(null);
  const [filteredCities, setFilteredCities] = useState<any>([]);
  const [cititiesLoading, setCititiesLoading] = useState(false);

  const handleChangeProvincesData = (selectedProvince: any) => {
    setSelectedProvinces(selectedProvince);
    setCititiesLoading(true);

    // فیلتر کردن شهرها بر اساس province_id
    const filtered = cities.filter(
      (city) => city.province_id === selectedProvince.id
    );
    setFilteredCities(filtered);
    setCititiesLoading(false);
  };

  return {
    register,
    handleSubmit,
    reset,
    formState,

    errors,
    control,
    handleRequest,
    selectedProvinces,
    handleChangeProvincesData,
    cititiesLoading,
    filteredCities,
    loading,
  };
}
