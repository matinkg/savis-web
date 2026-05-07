import { cities } from "@/static_data/json/cities";
import React, { useState } from "react";

export default function useHandelprovince() {
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
    filteredCities,
    cititiesLoading,
    handleChangeProvincesData,
  };
}
