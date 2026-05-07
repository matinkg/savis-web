import { request } from "@/configs/HTTPService";
import swal from "sweetalert";

export function useDeleteItemV2(url: string, getDataFromServer: any) {
  const removeItem = (id: number | string) => {
    swal({
      title: "آیا از  حذف ایتم مورد نظر اطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        request(`${url}/${id}`, "DELETE").then((res) => {
          if (!res?.error) {
            swal({
              title: "ایتم  مورد نظر  شما با موفقیت حذف شد",
              icon: "success",

              buttons: {
                confirm: {
                  text: "بستن",
                  value: true,
                  visible: true,
                  className: "",
                  closeModal: true,
                },
              },
            }).then(() => {
              getDataFromServer();
            });
          }
        });
      }
    });
  };
  return {
    removeItem,
  };
}
