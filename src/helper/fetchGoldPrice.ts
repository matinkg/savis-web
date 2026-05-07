import { goldApi } from "@/configs/api-constants";
import { caratGoldKey } from "@/configs/constants";
import axios from "axios";

export async function fetchGoldPrice(): Promise<number | null> {
  try {
    const response = await axios.get(goldApi.ORIGIN, {
      headers: {
        Authorization: `Bearer g2n96rfobrqdm48hnkq9`,
      },
    });

    const goldPriceReail = response.data?.result;
    const goldPrice =
      goldPriceReail?.data?.filter(
        (item: any) => item?.key === caratGoldKey?.caratGold18Key
      ) || [];

    return Number(goldPrice[0]?.["قیمت"]);
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return null;
  }
}
