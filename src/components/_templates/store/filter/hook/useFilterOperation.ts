import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function useFilterOperation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [minPrice, setMinPrice] = useState(Number(searchParams.get("min_price")) || 0);
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get("max_price")) || 218828000);
  const [isDiscounted, setIsDiscounted] = useState(searchParams.get("isDiscounted") === "true");
  const [isAvailable, setIsAvailable] = useState(searchParams.get("isAvailable") === "true");

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

  return {
    setMinPrice,
    setMaxPrice,
    setIsDiscounted,
    setIsAvailable,
    handleFilterChange,
    isDiscounted,
    isAvailable
  };
}
