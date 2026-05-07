"use client";

import { request } from "@/configs/HTTPService";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useFetchDataDetails<T>(url: string) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const { id } = params;
  const fetchDataFromServer = () => {
    setLoading(true);
    request(`${url}/${id}`)
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

  useEffect(() => {
    fetchDataFromServer();
  }, []);
  return { data, id, loading };
}
