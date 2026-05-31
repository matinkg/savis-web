import { ProvinceResponseProps } from "@/lib/interface/services/shipping/index.interface";
import { getProvinces } from "@/lib/services/shipping/index.api";
import { useQuery } from "@tanstack/react-query";

export const useGetProvinces = () => {
  return useQuery({
    queryKey: ["provinces"],
    queryFn: (): Promise<ProvinceResponseProps> => getProvinces(),
  });
};
