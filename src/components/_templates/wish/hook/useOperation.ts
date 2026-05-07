import { wishApi } from "@/configs/api-constants";
import {
  request,
} from "@/configs/HTTPService";
import { useDataContext } from "@/libs/context/app-data";
import React, { useEffect, useState } from "react";

import swal from "sweetalert";

export default function useOperation() {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState<any[]>([]);
  const { userInfo } = useDataContext();

  const getDataFromServer = () => {
    setLoading(true);
    request(`/api/v1/user/wishlist`)
      .then((res) => {
        if (!res?.error) {
          setProductData(res?.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data from server:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handelDeleteAllWishItem = () => {
    swal({
      title: "آیا از  حذف همه ی ایتم های مورد علاقه ی خوداطمینان دارید؟",
      icon: "warning",
      buttons: ["خیر", "بله"],
    }).then((result) => {
      if (result) {
        request(`${wishApi?.DELETEAll}/${userInfo?.id}`, "DELETE").then(
          (res) => {
            if (!res?.error) {
              swal({
                title: "تمامی ایتم ها    با موفقیت حذف شد ",
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
          }
        );
      }
    });
  };

  useEffect(() => {
    if (userInfo?.id) {
      getDataFromServer();
    }
  }, [userInfo?.id]);

  return {
    loading,
    getDataFromServer,
    handelDeleteAllWishItem,
    productData,
  };
}
