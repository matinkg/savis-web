import { createContext, useContext, useState, useEffect } from "react";
import { createContextType } from "./interface";
import { userInfoType } from "@/libs/interface";
import { userInfoValue } from "@/configs/constants";
import { request } from "@/configs/HTTPService";

const DataContext = createContext<createContextType>({
  userInfo: userInfoValue,
  loading: false,
  fetchUserInfo: null,
});

type propsType = {
  children: React.ReactNode;
};

export const AppDataProvider = ({ children }: propsType) => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState<userInfoType>(userInfoValue);

  const fetchUserInfo = async () => {
    setLoading(true);
    request("/api/v1/user/get-info")
      .then((res) => {
        if (!res?.error) {
          setUserInfo(res?.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <DataContext.Provider value={{ userInfo, loading, fetchUserInfo }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => useContext(DataContext);
