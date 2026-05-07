import { request } from "@/configs/HTTPService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function useUserInfo() {
  const router = useRouter();

  const siginOutUserHandler = () => {
    request("/api/v1/user/signout", "POST")
      .then((res) => {
        if (!res?.error) {
          Cookies.remove("authToken");
          Cookies.remove("usser");
          router.push("/auth/signin");
        }
      })
      .finally(() => {});
  };

  return { siginOutUserHandler };
}
