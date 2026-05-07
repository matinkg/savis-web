import React, { useState } from "react";
import Modal from "../../../_modules/modal";
import Info from "@/public/icons/info";
import SizeGuideComponent from "../../sizeGuide/SizeGuideComponent";

export default function SizeGuideModal() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Info
        onClick={() => setOpenModal(true)}
        className="h-6 w-6 cursor-pointer text-blue-1050"
      />
      <span className="font-peyda-400 text-sm text-blue-1050 lg:text-base">
        راهنمای سایز
      </span>

      {/* ------------------------------------------------------------------------ */}

      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle=" راهنمای سایز"
        modalTitleStyle="font-peyda-600 text-2xl lg:text-[32px] text-blue-1050 text-center  "
        modalStylel="w-[90%] md:w-[70%] lg:w-[60%] h-[90%] py-6 scrollbar-none"
        headingDivStyle="px-3"
      >
        <SizeGuideComponent isModal={true} />
      </Modal>
    </>
  );
}
