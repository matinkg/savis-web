import React, { useEffect } from "react";
import Button from "../button";
import { ModalProps } from "../../../../libs/interface/Modal";
import Close from "@/public/icons/close";

export default function Modal({
  openModal,
  setOpenModal,
  modalTitle,
  modalTitleStyle,
  modalStylel,
  headingDivStyle,
  children,
}: ModalProps) {
  useEffect(() => {
    // console.log("🚀 ~ openModal inside useEffect:", openModal);
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [openModal]);

  return (
    <>
      <div
        onClick={() => setOpenModal(false)}
        className={`flex-center fixed inset-0 z-30 transition-colors ${
          openModal ? "visible bg-black/50" : "invisible"
        } `}
      >
        {/* modal */}

        <div
          onClick={(e) => e.stopPropagation()}
          className={`shadow-normal overflow-auto bg-white transition-all ${modalStylel} `}
        >
          <div
            className={`mb-5 flex w-full items-center 2xl:mb-6 ${headingDivStyle} `}
          >
            <h1 className="grow text-center font-peyda-600 text-xl uppercase text-gray-700 md:text-2xl">
              {modalTitle}
            </h1>
            <Button onClick={() => setOpenModal(false)} className="">
              <Close className="h-[18px] w-[18px] flex-none lg:h-6 lg:w-6" />
            </Button>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
