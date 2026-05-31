import { ProvinceResponseProps } from "@/lib/interface/services/shipping/index.interface";
import httpService from "../http-service";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const baseEndpoint = "/api/v1/";

export const getProvinces = (): Promise<ProvinceResponseProps> => {
  return httpService.get(`${baseUrl}${baseEndpoint}provinces/`);
};
