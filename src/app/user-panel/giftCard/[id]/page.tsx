"use client";

import Button from "@/components/_modules/button";
import ArrowLeftlessLine from "@/public/icons/arrowLeftlessLine";
import Modal from "@/components/_modules/modal";
import React, { useEffect, useState } from "react";
import GiftCardComponents from "@/components/_templates/user-panel/userAccount/giftCard/giftCard";
import Notification from "@/components/_templates/user-panel/userAccount/order/notification";
import { useParams } from "next/navigation";
import { request } from "@/configs/HTTPService";
import GetCodeInputComponent from "@/components/_modules/get codeInputComponent";

export default function GiftCardDetails() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (id) {
      request(`/api/v1/user/gift-cards/${id}`).then((res) => {
        setData(res?.data);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading || !data) {
    return <div className="text-center py-8">در حال بارگذاری...</div>;
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="hidden w-full lg:block">
          <Notification
            id={data?.id}
            created_at={new Date(data?.created_at)}
            status={data?.is_redeemed ? "استفاده شده" : "استفاده نشده"}
          />
        </div>

        <span className="text-blue-105 my-6 text-center font-peyda-600 text-2xl lg:text-start">
          مشخصات کارت هدیه
        </span>

        <div className="borderBottom flex flex-col gap-y-6">
          <div className="grid grid-cols-3 font-peyda-600 text-[20px] text-blue-1050">
            <span>محصول</span>
            <span className="text-center">مبلغ</span>
            <span className="text-end">جزئیات</span>
          </div>

          <div className="grid grid-cols-3">
            <span className="font-peyda-400 text-lg text-blue-1050">
              {data?.order_item?.gift_card?.name} ×{" "}
              {Number(data?.order_item?.quantity).toLocaleString("fa")}
            </span>
            <span className="text-center font-peyda-400 text-lg text-slate-1000/50">
              {Number(data?.order_item?.price).toLocaleString("fa")} تومان
            </span>

            <Button
              onClick={() => setShowModal(true)}
              className="flex items-center justify-end font-peyda-400 text-lg text-blue-1050"
            >
              <span>نمایش جزئیات</span>
              <ArrowLeftlessLine className="h-6 w-6 rotate-180" />
            </Button>
          </div>

          <div className="flex items-center justify-between font-peyda-500 text-xs text-blue-1050 md:text-sm lg:text-lg">
            <span>کد کارت</span>
            <span className="text-left font-mono ltr">
              <GetCodeInputComponent url={data?.code} />
            </span>
          </div>

          <div className="flex items-center justify-between font-peyda-500 text-xs text-blue-1050 md:text-sm lg:text-lg">
            <span>تاریخ صدور</span>
            <span>
              {new Date(data?.created_at).toLocaleDateString("fa-IR")}
            </span>
          </div>

          <div className="flex items-center justify-between font-peyda-500 text-xs text-blue-1050 md:text-sm lg:text-lg">
            <span>کد سفارش</span>
            <span>
              #{Number(data?.order?.id ?? data?.order_id).toLocaleString("fa")}
            </span>
          </div>

          <div className="flex items-center justify-between font-peyda-500 text-xs text-blue-1050 md:text-sm lg:text-lg">
            <span>روش پرداخت</span>
            <span>{data?.order?.transactions?.[data?.order?.transactions?.length - 1  ]?.details ?? "—"}</span>
          </div>

          <div className="flex items-center justify-between font-peyda-600 text-sm text-blue-1050 md:text-lg lg:text-2xl">
            <span>وضعیت</span>
            <span>{data?.is_redeemed ? "استفاده شده" : "قابل استفاده"}</span>
          </div>
        </div>
      </div>

      {/* modal */}
      {showModal && (
        <Modal
          openModal={showModal}
          setOpenModal={setShowModal}
          modalTitle="جزئیات کارت هدیه"
          modalStylel="w-[98%] lg:w-[50%] xl:w-[40%] p-4 xl:p-6 "
          modalTitleStyle=""
        >
          <div className="flex justify-center">
            <GiftCardComponents
              img={data?.order_item?.gift_card?.image}
              name={data?.order_item?.gift_card?.name}
              code={data?.code}
            />
          </div>
        </Modal>
      )}
    </>
  );
}
