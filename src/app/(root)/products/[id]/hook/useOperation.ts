import { request } from "@/configs/HTTPService";
import { showSwal } from "@/helper/swal";
import { useDataContext } from "@/libs/context/app-data";

export default function useOperation(fetchDataFromServer: any) {
  const { userInfo } = useDataContext();

  const handleAddToWishList = async (productId: string) => {
    if (!userInfo?.id) {
      showSwal("لطفا ابتدا وارد حساب خود شوید!", "error", "بستن");
      return false;
    }
  
    request("/api/v1/user/toggle-wish", "POST", { productId }).then((res) => {
      if (res?.data) {
        fetchDataFromServer();
        showSwal(res.data?.message, "success", "باشه");
      } else {
        showSwal("مشکلی پیش آمده، لطفا دوباره امتحان کنید!", "error", "متوجه شدم");
      }
    }).catch(() => {
      showSwal("خطایی رخ داده است، لطفا دوباره تلاش کنید!", "error", "باشه");
    });
  };
  return { handleAddToWishList };
}
