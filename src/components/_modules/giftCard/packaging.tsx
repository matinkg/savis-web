"use client";
import React, { useState } from "react";
import Button from "../button";
import Box from "@/public/icons/box";
import Modal from "../modal";
import GiftCard from "./giftCard";
import Spinner from "../loading/spinner";
import { fetcher } from "@/configs/HTTPService";
import useSWR from "swr";

type PackagingProps = {
  className?: string;
  packagingData: any;
  setPackingData: any;
};

export default function Packaging({
  className,
  setPackingData,
  packagingData,
}: PackagingProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const { data, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const handleButtonClick = (button: any) => {
    if (String(packagingData?.id) === String(button?.id)) {
      setPackingData(null);
      setSelectedButtonIndex(null);
    } else {
      setPackingData(button);
      setSelectedButtonIndex(button?.id);
    }
  };

  const handleOpenModal = () => {
    setUrl("/api/v1/boxes");
    setShowModal(true);
  };

  const count = data?.length || 0;
  const visibleCards = Math.min(count, 3);
  const cardWidth = 288;
  const gap = 16;
  const widthPx = visibleCards * cardWidth + (visibleCards - 1) * gap;

  const isScrollable = count >= 3;

  // Dynamic grid-cols class based on count
  const gridColsClass =
    count === 1
      ? "grid-cols-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1"
      : count === 2
      ? "grid-cols-2"
      : "grid-cols-3";

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className={`flex-center w-fit gap-x-2 bg-secendry px-5 py-2 font-peyda-400 text-white lg:py-3 xl:text-lg ${className}`}
      >
        <span>انتخاب بسته بندی</span>
        <Box className="h-[18px] w-[18px] text-white lg:h-6 lg:w-6" />
      </Button>

      <Modal
        openModal={showModal}
        setOpenModal={setShowModal}
        modalTitle="انتخاب بسته بندی کارت هدیه"
        modalTitleStyle="w-full flex"
        headingDivStyle="py-2"
        modalStylel="px-6 py-4"
      >
        {isLoading ? (
          <Spinner className="w-6 h-6 text-primary" type="spinner" />
        ) : (
          <div
            className={`mx-auto mb-2 grid gap-4 ${gridColsClass} ${
              isScrollable
                ? "max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-100"
                : ""
            }`}
            style={{ width: `${widthPx}px` }}
          >
            {data?.map((item: any) => (
              <GiftCard
                key={item?.id}
                {...item}
                selected={selectedButtonIndex === item?.id}
                onClick={() => {
                  handleButtonClick(item);
                  setShowModal(false);
                }}
              />
            ))}
          </div>
        )}
      </Modal>
    </>
  );
}
