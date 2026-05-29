" use client";

import { productsApi } from "@/configs/api-constants";
import { request } from "@/configs/HTTPService";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function useOperation() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  // ----------------------------------------
  const searchParams = useSearchParams();
  const urlSearchParams = searchParams.get("category");
  const decodedParams = decodeURIComponent(urlSearchParams ?? "زنانه");
  //  ------------------------------------------------
  const [params, setParams] = useState(decodedParams);

  // ---------------------------------------

  const getDataFromServer = (params: string) => {
    setLoading(true);

    request(productsApi?.SEARCH + `category=${params}`)
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
    getDataFromServer(params);
  }, [params, urlSearchParams]);

  // ------------------------------
  return {
    data,
    loading,
    setParams,
    getDataFromServer,
  };
}
