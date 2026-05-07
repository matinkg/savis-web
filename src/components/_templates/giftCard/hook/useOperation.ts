import { giftCardApi } from "@/configs/api-constants";
import { request } from "@/configs/HTTPService";
import { useEffect, useState } from "react";

export default function useOperation() {
  const [loading, setLoading] = useState(false);
  const [serverData, setServerData] = useState<any[]>([]);

  const getDataFromServer = () => {
    setLoading(true);
    request(`${giftCardApi?.GETBASEONCATEGORY}`)
      .then((res) => {
        if (!res?.error) {
          setServerData(res?.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from server:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch server data only when userInfo.id is available
  useEffect(() => {
    getDataFromServer();
  }, []);

  return {
    serverData,
    loading,
    getDataFromServer,
  };
}
