import { ProvinceCitiesResponseProps, ProvinceResponseProps } from "@/lib/interface/services/shipping/index.interface";
import { getProvinceCities, getProvinces } from "@/lib/services/shipping/index.api";
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
  });
};