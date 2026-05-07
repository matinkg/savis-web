"use client";

import TabelDataDesk from "@/components/_templates/user-panel/userAccount/giftCard/tableDataDesk";
import TabelDataMobile from "@/components/_templates/user-panel/userAccount/giftCard/tableDataMobile";
import { request } from "@/configs/HTTPService";
import React, { useEffect, useState } from "react";

export default function GiftCard() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
  });

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchData = (page = 1) => {
    request(`/api/v1/user/get-gift-cards?per_page=5&page=${page}`).then(
      (res) => {
        setData(res?.data?.data);
        setPagination({
          current_page: res?.data?.current_page,
          last_page: res?.data?.last_page,
        });
      }
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  return (
    <>
      {windowWidth > 768 ? (
        <TabelDataDesk
          data={data}
          currentPage={pagination.current_page}
          lastPage={pagination.last_page}
          onPageChange={handlePageChange}
        />
      ) : (
        <TabelDataMobile
          data={data}
          currentPage={pagination.current_page}
          lastPage={pagination.last_page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
