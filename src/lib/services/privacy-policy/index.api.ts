import httpService from "../http-service";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const baseEndpoint = "/api/v1/";

export const getPrivacyPolicy = () => {
  return httpService.get(`${baseUrl}${baseEndpoint}privacy-policy`);
};
