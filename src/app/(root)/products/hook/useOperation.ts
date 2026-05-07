" use client";

import { request } from "@/configs/HTTPService";
import { handleQueryParams } from "@/helper/QueryParams";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function useOperation() {
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();

  const getDataFromServer = (params: string = "", page = 1) => {
    setLoading(true);
    request(`/api/v1/products?page=${page}&${params}`)
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
    const queryParams = handleQueryParams(searchParams);
    getDataFromServer(queryParams, currentPage);
  }, [searchParams, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    data,
    loading,
    currentPage,
    handlePageChange,
    categoriesLoading,
  };
}