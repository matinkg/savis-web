"use client";

import { request } from "@/configs/HTTPService";
import { handleQueryParams } from "@/helper/QueryParams";
import { useSearchParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useInfiniteProducts() {
  const searchParams = useSearchParams();
  const queryParams = handleQueryParams(searchParams);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["infinite-products", queryParams],

    queryFn: async ({ pageParam = 1 }) => {
      const res = await request(
        `/api/v1/products?page=${pageParam}&${queryParams}`,
      );

      if (res?.error) {
        throw new Error("خطا در دریافت محصولات");
      }

      return res?.data;
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const currentPage = lastPage.products.current_page;
      const lastPageNumber = lastPage.products.last_page;

      return currentPage < lastPageNumber ? currentPage + 1 : undefined;
    },
  });
  const pageData = data?.pages?.[0];
  const products = data?.pages.flatMap((page) => page.products.data) || [];

  return {
    pageData,
    products,
    loading: isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
}
