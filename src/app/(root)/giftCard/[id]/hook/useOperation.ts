import { request } from "@/configs/HTTPService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DataType } from "./interface";
import { giftCardInitailValues } from "@/configs/constants";

export default function useOperation() {
  const [data, setData] = useState<DataType>(giftCardInitailValues);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const { id } = params;
  const fetchDataFromServer = () => {
    setLoading(true);
    request(`/api/v1/gift-card/${id}`)
      .then((res) => {
        if (!res?.error) {
          setData(res?.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);
  return {
    data,
    loading,
  };
}
