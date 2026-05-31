import {
  ProvinceCitiesResponseProps,
  ProvinceResponseProps,
} from "@/lib/interface/services/shipping/index.interface";
import {
  getProvinceCities,
  getProvinces,
  getShippingOptions,
} from "@/lib/services/shipping/index.api";
import { useQuery } from "@tanstack/react-query";

export const useGetProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: (): Promise<ProvinceResponseProps> => getProvinces(),
  });
};

export const useGetProvinceCities = (id: number) => {
  return useQuery({
    queryKey: ["cities", id],
    queryFn: (): Promise<ProvinceCitiesResponseProps> => getProvinceCities(id),
    enabled: !!id,
  });
};

export const useGetShippingOptions = (province_id: number, city_id: number) => {
  return useQuery({
    queryKey: ["shipping-options", province_id, city_id],
    queryFn: () => getShippingOptions(province_id, city_id),
    enabled: !!province_id && !!city_id,
  });
};
