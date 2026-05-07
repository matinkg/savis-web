import { request } from "@/configs/HTTPService";
import { useEffect, useState } from "react";

export function useFetchData<T>(url: string) {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState<any>([]);
  const [post, setPost] = useState<any>([]);

  const fetchDataFromServer = () => {
    setLoading(true);

    request(url)
      .then((res) => {
        if (!res?.error) {
          setData(res?.data);
          // setPost(res?.data[0]);
          setLoading(false);
          // setCount(res?.totalItems);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDataFromServer();
  }, []);
  return { data, loading, count, post };
}
