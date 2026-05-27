import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function useFilterOperation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const DEFAULT_MIN_PRICE = 0;
  const DEFAULT_MAX_PRICE = 218828000;

  const [minPrice, setMinPrice] = useState(
    Number(searchParams.get("min_price")) || DEFAULT_MIN_PRICE,
  );

  const [maxPrice, setMaxPrice] = useState(
    Number(searchParams.get("max_price")) || DEFAULT_MAX_PRICE,
  );

  const [isDiscounted, setIsDiscounted] = useState(
    searchParams.get("isDiscounted") === "true",
  );

  const [isAvailable, setIsAvailable] = useState(
    searchParams.get("isAvailable") === "true",
  );

  const handleFilterChange = () => {
    const params = new URLSearchParams(window.location.search);

    params.set("min_price", String(minPrice));
    params.set("max_price", String(maxPrice));

    if (isDiscounted) {
      params.set("isDiscounted", "true");
    } else {
      params.delete("isDiscounted");
    }

    if (isAvailable) {
      params.set("isAvailable", "true");
    } else {
      params.delete("isAvailable");
    }

    router.push(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setMinPrice(DEFAULT_MIN_PRICE);
    setMaxPrice(DEFAULT_MAX_PRICE);
    setIsDiscounted(false);
    setIsAvailable(false);

    const params = new URLSearchParams(window.location.search);

    params.delete("min_price");
    params.delete("max_price");
    params.delete("isDiscounted");
    params.delete("isAvailable");

    router.push(`?${params.toString()}`);
  };

  return {
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    setIsDiscounted,
    setIsAvailable,
    handleFilterChange,
    resetFilters,
    isDiscounted,
    isAvailable,
  };
}
