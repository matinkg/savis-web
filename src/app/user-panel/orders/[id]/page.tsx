"use client";

import PrimaryLoading from "@/components/_templates/loading/primaryLoading";
import Notification from "@/components/_templates/user-panel/userAccount/order/notification";
import Product from "@/components/_templates/user-panel/userAccount/order/product";
import { request } from "@/configs/HTTPService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function OrderDetails() {
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await request(`/api/v1/orders/${id}`);
        if (response?.data) {
          setOrder(response.data);
          setItems(response?.data?.items);
        } else {
          setError("سفارش یافت نشد.");
        }
      } catch (err) {
        setError("خطایی در دریافت اطلاعات سفارش رخ داده است.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "در انتظار";
      case "processing":
        return "در حال پردازش";
      case "shipped":
        return "ارسال شده";
      case "paid":
        return "پرداخت شده";
      case "delivered":
        return "تحویل شده";
      default:
        return "لغو شده";
    }
  };

  if (loading) {
    return <PrimaryLoading />;
  }

  if (error) {
    return (
      <div className="py-10 text-center font-peyda-500 text-xl text-red-500">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-10 text-center font-peyda-500 text-xl text-gray-500">
        اطلاعاتی برای این سفارش یافت نشد.
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="hidden w-full lg:block">
        <Notification
          id={order?.id}
          created_at={new Date(order?.created_at)}
          status={getStatusLabel(order.status)}
        />
      </div>

      <span className="text-blue-105 my-6 text-center font-peyda-600 text-2xl lg:text-start">
        مشخصات سفارش
      </span>

      <div className="borderBottom flex flex-col">
        <div className="flex items-center justify-between font-peyda-600 text-[20px] text-blue-1050">
          <span>محصول</span>
          <span>جمع جزء</span>
        </div>

        {items && items?.length > 0 ? (
          items?.map((item, index) => <Product key={index} item={item} />)
        ) : (
          <div className="py-4 text-center font-peyda-500 text-lg text-gray-500">
            هیچ محصولی در این سفارش وجود ندارد.
          </div>
        )}

        <div className="flex items-center justify-between font-peyda-500 text-xs text-blue-1050 md:text-sm lg:text-lg">
          <span>جمع جزء</span>
          <span>
            {Number(order?.total_amount).toLocaleString("fa-ir")} تومان
          </span>
        </div>

        <div className="flex items-center justify-between font-peyda-500 text-xs text-blue-1050 md:text-sm lg:text-lg">
          <span>کد سفارش</span>
          <span>#{Number(order.id).toLocaleString("fa")}</span>
        </div>

        <div className="flex items-center justify-between font-peyda-500 text-xs text-blue-1050 md:text-sm lg:text-lg">
          <span>حمل و نقل</span>
          <div className="flex flex-col">
            <span className="text-blue-1050">
              {order.shipping_method === "bike"
                ? "ارسال با پیک"
                : "تیپاکس (پس کرایه)"}
            </span>
            <span className="text-slate-1000/50">
              حمل و نقل به {order?.city || "نامشخص"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between font-peyda-500 text-xs text-blue-1050 md:text-sm lg:text-lg">
          <span>روش پرداخت</span>
          <span>{order.payment_method || "نامشخص"}</span>
        </div>

        <div className="flex items-center justify-between font-peyda-500 text-xs text-blue-1050 md:text-sm lg:text-lg">
          <span>تخفیف</span>
          <span className="text-slate-1000/50">
            {Number(order.discount || 0).toLocaleString("fa-ir")} تومان
          </span>
        </div>

        <div className="flex items-center justify-between font-peyda-600 text-sm text-blue-1050 md:text-lg lg:text-2xl">
          <span>مجموع</span>
          <span>
            {Number(order.total_amount - (order.discount || 0)).toLocaleString(
              "fa-ir",
            )}{" "}
            تومان
          </span>
        </div>

        {/* ---------------- آدرس صورتحساب ---------------- */}
        <div className="flex flex-col gap-y-3 font-peyda-400 text-xs md:text-sm lg:text-lg">
          <span className="text-blue-105 my-6 font-peyda-600 text-2xl">
            آدرس صورتحساب
          </span>
          <div className="flex items-center">
            <span>نام و نام خانوادگی: </span>
            <span>
              {order?.first_name || "نامشخص"} {order?.last_name || ""}
            </span>
          </div>
          <div className="flex items-center">
            <span>آدرس:</span>
            <span>
              {order?.province || "نامشخص"}، {order?.city || "نامشخص"}،{" "}
              {order?.address || "نامشخص"}
            </span>
          </div>

          <div className="flex items-center">
            <span>کد پستی:</span>
            <span>{order?.postal_code || "نامشخص"}</span>
          </div>

          <div className="flex items-center">
            <span>شماره موبایل:</span>
            <span>{order?.phone || "نامشخص"}</span>
          </div>
          <div className="flex items-center">
            <span>آدرس ایمیل:</span>
            <span>{order?.email || "نامشخص"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
