import {
  ProvinceCitiesResponseProps,
  ProvinceResponseProps,
} from "@/lib/interface/services/shipping/index.interface";
import httpService from "../http-service";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const baseEndpoint = "/api/v1/";

export const getProvinces = (): Promise<ProvinceResponseProps> => {
  return httpService.get(`${baseUrl}${baseEndpoint}provinces`);
};

export const getProvinceCities = (
  id: number,
): Promise<ProvinceCitiesResponseProps> => {
  return httpService.get(`${baseUrl}${baseEndpoint}provinces/${id}/cities`);
};

export const getShippingOptions = (province_id: number, city_id: number) => {
  return httpService.get(`${baseUrl}${baseEndpoint}shipping/options`, {
    params: {
      province_id,
      city_id,
    },
  });
};
