import { categoriesApi } from "@/configs/api-constants";
import { request } from "@/configs/HTTPService";
import React, { useEffect, useState } from "react";

export default function useOperation() {
  const [loading, setLoading] = useState(false);
  const [headerData, setHeaderData] = useState([]);
  const [siteSetting, setSiteSetting] = useState<any>([]);
  const [instagram, setInstagram] = useState([]);

  const getDataFromServer = () => {
    setLoading(true);

    request(categoriesApi.sitesetting)
      .then((res) => {
        if (!res?.error) {
          setHeaderData(res?.data?.header);
          setSiteSetting(res?.data?.siteSetting)
          setInstagram(res?.data?.instagram)
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  // ----------------------------------------

  const categoriesDataLevelOne = headerData
  return {
    headerData,
    categoriesDataLevelOne,
    loading,
    getDataFromServer,
    siteSetting,
    instagram
  };
}
