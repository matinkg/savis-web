import React from "react";
import Button from "../button";
import { ModalProps } from "../../../../libs/interface/Modal";

export default function InstaModal({
  openModal,
  setOpenModal,
  children,
}: ModalProps) {
  return (
    <>
      <div
        onClick={() =>
          setOpenModal({
            data: {
              id: "",
              img: [],
              desc: "",
              date: new Date(),
              link: "",
            },
            status: false,
          })
        }
        className={`flex-center fixed inset-0 !z-50 transition-colors ${
          openModal.status ? "visible bg-black/50" : "invisible"
        } `}
      >
        {/* modal */}

        <div
          onClick={(e) => e.stopPropagation()}
          className={`shadow-normal h-auto w-[91.38%] overflow-auto bg-white transition-all lg:w-[60.5%]`}
        >
          {children}
        </div>
      </div>
    </>
  );
}
