import { request } from "@/configs/HTTPService";
import { useState } from "react";

export function usePostData() {
  const [loading, setLoading] = useState(false);
  const PostDataToServer = (url: string, data: any) => {
    setLoading(true);
    request(url, "POST", data).finally(() => {
      setLoading(false);
    });
  };

  return { loading, PostDataToServer };
}
