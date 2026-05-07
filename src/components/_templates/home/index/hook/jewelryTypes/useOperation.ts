import { jewelryTypesApi } from "@/configs/api-constants";
import { request } from "@/configs/HTTPService";
import React, { useEffect, useMemo, useState } from "react";

export type DataArray = DataObject[];

export interface DataObject {
  id: string;
  name: string;
  image: string;
  svg: string;
  parent_id: any;
  url_direct: string;
  created_at: string;
  updated_at: string;
  parent: any;
  children: any[];
}

export default function useJewelryTypesOperation() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataArray>([]);

  const getDataFromServer = () => {
    // console.log("Fetching data from server...");
    // setLoading(true);

    // request(jewelryTypesApi?.GET)
    //   .then((res) => {
    //     if (!res?.error) {
    //       // console.log("Data received:", res?.data);
    //       setData(res?.data);
    //     }
    //   })
    //   .finally(() => {
    //     // console.log("Finished fetching data");
    //     setLoading(false);
    //   });
  };

  const homeJewelryCategoriesDataLevelOne = useMemo(() => {
    return data?.filter((item: any) => item?.parent_id === null);
  }, [data]);

  // --------------------------------------------------------
  useEffect(() => {
    // console.log("Component mounted, calling getDataFromServer");
    getDataFromServer();
    return () => {
      // console.log("Component unmounted or updated");
    };
  }, []);

  // -----------------------------------------------------------

  const activeId =
    homeJewelryCategoriesDataLevelOne[
      homeJewelryCategoriesDataLevelOne.length - 1
    ]?.id;

  return {
    homeJewelryCategoriesDataLevelOne,
    loading,
    activeId,
  };
}
