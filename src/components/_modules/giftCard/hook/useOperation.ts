import { packagingApi } from "@/configs/api-constants";
import { request } from "@/configs/HTTPService";
import React, { useEffect, useState } from "react";

export default function useOperation() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDataFromServer = () => {
    setLoading(true);
    request(`${packagingApi?.GET}`)
      .then((res) => {
        if (!res?.error) {
          setData(res?.data);
          setLoading(false);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, fetchDataFromServer };
}
