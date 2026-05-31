import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

axios.interceptors.request.use(
  function (config) {
    const token = Cookies.get("auth-token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (
      config.params &&
      typeof config.params === "object" &&
      !Array.isArray(config.params)
    ) {
      const { current_page, ...restParams } = config.params;
      config.params = restParams;
    }

    if (config.headers.useMultipartForm) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    config.headers.Accept = "application/json";

    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      Cookies.remove("auth-token");
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;

        if (pathname.startsWith("/system")) {
          window.location.href = "/auth/system";
        } else if (pathname.startsWith("/dashboard")) {
          window.location.href = "/auth/login";
        }
      }

      if (error?.response?.data?.error) {
        toast.error(error.response.data.error);
      }

      return Promise.reject(error);
    }

    if (status === 403) {
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        if (pathname.startsWith("/system")) {
          Cookies.set("role", "admin");
        } else if (pathname.startsWith("/dashboard")) {
          Cookies.set("role", "user");
        }
        window.location.href = "/403";
      }
    }

    if (error?.response?.data?.error) {
      toast.error(error.response.data.error);
    }

    return Promise.reject(error);
  },
);

const methods = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};
export default methods;
