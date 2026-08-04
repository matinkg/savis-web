import { useEffect, useState } from "react";
import { request } from "@/configs/HTTPService";

export default function useSettingOperation() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  const getDataFromServer = () => {
    setLoading(true);

    request("/api/v1/homepage")
      .then((res) => {
        if (!res?.error) {
          setData(res?.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getDataFromServer();
  }, []);

  const HomeBannerData = data?.home_Banner || {};
  const savisCats = data?.savisCats || {};
  const HomeAdsData = data?.HomeAdsData || {};
  const HomeCategories_baseOnPriceData = data?.HomeCategories_baseOnPriceData || {};
  const giftCardBannerData = data?.giftCardPost || {};
  const customerClubHomeData = data?.customerClubHomeData || {};
  const savisOffers = data?.savisOffers || [];
  const gifts = data?.gifts || {};
  const instagram = data?.instagram || {};

  return {
    HomeBannerData,
    savisCats,
    HomeAdsData,
    HomeCategories_baseOnPriceData,
    giftCardBannerData,
    customerClubHomeData,
    savisOffers,
    loading,
    gifts,
    instagram
  };
}
