import axios, { AxiosRequestConfig, Method } from "axios";
import { toast } from "react-toastify";
import useSWR from "swr";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    let token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    if (status === 401) {
      Cookies.remove("authToken"); 
    }

    return Promise.reject(error);
  }
);


const getHeaders = (data?: any) => {
  return data instanceof FormData ? {"Content-Type": "multipart/form-data"} : { "Content-Type": "application/json" };
};

const noToest = ['/api/v1/user/get-info']

const request = async (
  url: string,
  method: Method = "GET",
  data?: any,
  fullUrl: boolean = false
) => {
  const finalUrl = fullUrl ? url : `${BASE_URL}${url}`;
  const config: AxiosRequestConfig = {
    url: finalUrl,
    method,
    headers: getHeaders(data),
  };

  if (method !== "GET" && data) {
    config.data = data instanceof FormData ? data : JSON.stringify(data);
  }

  try {
    const response = await axiosInstance(config);
    if (response.status >= 200 && response.status < 300) {
      return {
        success: true,
        status: response.status,
        message: response?.data.message || "",
        data: response.data.data,
        last_page: response?.data?.last_page || null,
        current_page: response?.data?.current_page || null,
      };
    }
  } catch (error: any) {
    const message = error.response?.data?.message || "خطایی رخ داده است";
    if(!noToest.includes(url))
      toast.error(message);
    return {
      success: false,
      status: error.response?.status || 0,
      error: message,
    };
  }
};

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data.data);

const useFetch = <T>(url: string, options: any = {}) => {
  const { data, error, isValidating } = useSWR<T>(url, fetcher, {
    revalidateOnFocus: false,
    ...options,
  });

  return {
    data,
    isLoading: !data && !error,
    error,
    isValidating,
  };
};

export { request, useFetch, fetcher };
