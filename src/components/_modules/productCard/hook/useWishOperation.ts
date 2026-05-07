import { request } from "@/configs/HTTPService";

import { showSwal } from "@/helper/swal";
import { useDataContext } from "@/libs/context/app-data";

export default function useWishOperation() {
  const { userInfo } = useDataContext();

  const handleAddToWishList = async (productId: string) => {
    if (!userInfo?.id) {
      showSwal("لطفا ابتدا وارد حساب خود شوید!", "error", "بستن");
      return false;
    }

    request("/api/v1/user/toggle-wish", "POST", {productId}).then(res=>{
      if(res?.data.message)
      showSwal(
        res?.data.message,
        "success",
        "بستن"
      );
    });
  };
  const handleDeleteFromWishList = async (productId: string) => {
    if (!userInfo?.id) {
      showSwal("لطفا ابتدا وارد حساب خود شوید!", "error", "بستن");
      return false;
    }
    request("/api/v1/user/toggle-wish", "DELETE", {
      productId,
    }).then((res) => {
      if (!res?.error) {
        showSwal(
          "محصول با موفقیت از فهرست علاقه مندی های شما حذف شد",
          "success",
          "بستن"
        );

        // getDataFromServer();
        // window?.location?.reload();
      }
    });
  };

  return { handleAddToWishList, handleDeleteFromWishList };
}
