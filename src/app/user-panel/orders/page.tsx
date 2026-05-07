"use client";

import OrderTabelDesk from "@/components/_templates/user-panel/userAccount/order/orderTabelDesk";
import OrderTabelMobile from "@/components/_templates/user-panel/userAccount/order/orderTabelMobile";
import { request } from "@/configs/HTTPService";
import React, { useEffect, useState } from "react";

export default function Orders() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [ordersData, setOrdersData] = useState<any[]>([]);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  const fetchData = (page = 1) => {
    request(`/api/v1/orders?page=${page}`).then((res) => {
      setOrdersData(res?.data);
      setPagination({
        current_page: res?.current_page,
        last_page: res?.last_page,
      });
    });
  };

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    fetchData(page);
  };

  return (
    <>
      {windowWidth > 768 ? (
        <OrderTabelDesk
          data={ordersData}
          currentPage={pagination.current_page}
          lastPage={pagination.last_page}
          onPageChange={handlePageChange}
        />
      ) : (
        <OrderTabelMobile
          data={ordersData}
          currentPage={pagination.current_page}
          lastPage={pagination.last_page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}
