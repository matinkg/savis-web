"use client";

import BreadcrumbRoute from "@/components/_modules/breadcrumbRoute";
import Button from "@/components/_modules/button";
import GetCodeInputComponent from "@/components/_modules/get codeInputComponent";
import Form from "@/components/_modules/giftCard/form";
import Packaging from "@/components/_modules/giftCard/packaging";
import Bag from "@/public/icons/Bag";

import Info from "@/public/icons/info";
import Share from "@/public/icons/share";
import React, { useEffect, useState } from "react";
import useOperation from "./hook/useOperation";
import PrimaryLoading from "@/components/_templates/loading/primaryLoading";
import { useCart } from "@/libs/context/cart-shopping/CartContext";
import { CartItem } from "@/libs/context/cart-shopping/interface";
import { showSwal } from "@/helper/swal";
import { ProductStatus } from "@/configs/constants";
import { usePathname } from "next/navigation";
import Modal from "@/components/_modules/modal";

export default function GiftCardDetails() {
  const [checked, setChecked] = useState({
    physical: false,
    code: false,
    email: false,
  });

  const [recipientInfo, setRecipientInfo] = useState({
    email: "",
    fullName: "",
    message: "",
  });

  const { data, loading } = useOperation();

  const [packagingData, setPackingData] = useState<any>({});
  const { dispatch } = useCart();

  const [showModal, setShowModal] = useState(false);
  const pathName = usePathname();

  const handleAddItem = (item: CartItem) => {
    if (!checked.physical && !checked.email && !checked.code) {
      showSwal("لطفاً یک روش دریافت را انتخاب کنید", "error", "بستن");
      return;
    }

    let deliveryMethod = checked.physical
      ? "physical"
      : checked.email
      ? "email"
      : "code";

    if (checked.email && !recipientInfo.email) {
      showSwal("لطفاً ایمیل گیرنده را وارد کنید", "error", "بستن");
      return;
    }

    dispatch({
      type: "ADD_ITEM",
      item: {
        ...item,
        delivery_method: deliveryMethod,
        box_id: String(packagingData?.id ||  ""),
        recipient_email: recipientInfo.email || null,
        recipient_name: recipientInfo.fullName || null,
        message: recipientInfo.message || null,
        type: "gift_card",
        box: packagingData
      },
      dispatch
    });

    showSwal("محصول با موفقیت به سبد خرید اضافه شد", "success", "بستن");
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <>
      {loading ? (
        <PrimaryLoading />
      ) : (
        <section className="mx-auto my-10 mt-48 w-[91.12%] lg:my-[60px] lg:mt-56 lg:w-[91.67%] 4xl:w-[85%]">
          {true ? (
            <>
              <BreadcrumbRoute
                category={`دسته بندی/${data?.name}`}
                stepOne="خانه"
                className="mt-6 lg:my-10"
                productDetails={data}
              />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="">
                  <img src={`${data?.image}`} alt="" />
                </div>
                <div className="space-y-4 lg:space-y-6">
                  <span className="font-peyda-600 text-lg text-blue-1050 lg:text-2xl">
                    {data?.name}
                  </span>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data?.description ?? "",
                    }}
                    className="font-peyda-400 text-xs text-blue-1050 lg:text-lg"
                  ></p>
                  {/* ============================ */}
                  <div className="flex flex-col gap-y-4">
                    <div className="flex flex-col gap-y-4">
                      <div className="flex items-center">
                        <div className="h-6 w-6">
                          <label className="checkbox2">
                            <input
                              type="checkbox"
                              checked={checked?.physical}
                              onChange={() =>
                                setChecked({
                                  code: false,
                                  email: false,
                                  physical: !checked?.physical,
                                })
                              }
                            />
                            <span className="checkmark2"></span>
                          </label>
                        </div>
                        <span className="block font-peyda-400 text-sm text-blue-1050 lg:text-lg">
                          خرید فیزیکی
                        </span>
                      </div>
                      {/* ===================== conditional content ==================== */}

                      {checked?.physical && (
                        <Packaging
                          setPackingData={setPackingData}
                          packagingData={packagingData}
                        />
                      )}
                    </div>

                    <div className="flex flex-col gap-y-4">
                      <div className="flex items-center">
                        <div className="h-6 w-6">
                          <label className="checkbox2">
                            <input
                              type="checkbox"
                              checked={checked?.code}
                              onChange={() =>
                                setChecked({
                                  physical: false,
                                  email: false,
                                  code: !checked?.code,
                                })
                              }
                            />
                            <span className="checkmark2"></span>
                          </label>
                        </div>
                        <span className="block font-peyda-400 text-sm text-blue-1050 lg:text-lg">
                          دریافت به صورت کد
                        </span>
                      </div>
                      {/* ===================== conditional content ==================== */}

                      {checked?.code && (
                        <div className="flex items-center gap-x-2 bg-[#0F7B9D33] px-3 py-[10px] lg:py-3">
                          <Info className="h-[18px] w-[18px] text-blue-1050 lg:h-6 lg:w-6" />

                          <span className="font-peyda-500 text-sm text-blue-1050 lg:text-base">
                            بعد از پرداخت کد تخفیف به شما نمایش داده میشود
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-y-4">
                      <div className="flex items-center">
                        <div className="h-6 w-6">
                          <label className="checkbox2">
                            <input
                              type="checkbox"
                              checked={checked?.email}
                              onChange={() =>
                                setChecked({
                                  physical: false,
                                  code: false,
                                  email: !checked?.email,
                                })
                              }
                            />
                            <span className="checkmark2"></span>
                          </label>
                        </div>
                        <span className="block font-peyda-400 text-sm text-blue-1050 lg:text-lg">
                          ارسال به ایمیل دلخواه
                        </span>
                      </div>
                      {/* ===================== conditional content ==================== */}
                      {checked?.email && <Form setRecipientInfo={setRecipientInfo} />}
                    </div>
                  </div>
                  {/* ============================ */}

                  <div className="flex items-center">
                    <span className="font-peyda-400 text-lg text-blue-1050 lg:text-3xl">
                      قیمت:
                    </span>
                    <span className="font-peyda-400 text-lg text-blue-1050 lg:text-3xl">
                      {Number(data?.price)?.toLocaleString("fa-ir")} تومان
                    </span>
                  </div>

                  <div className="flex gap-x-3">
                    <Button
                      onClick={() =>
                        handleAddItem({
                          sku: data?.gift_code,
                          price: data?.price,
                          name: data?.name,
                          image: data?.image,
                          packing: packagingData,
                          color: "",
                          stockQuantity: data?.stock,
                          quantity: 1,
                          giftcard_id: data?.id,
                          wage: 0,
                          weight: 0,
                          slug: `giftCard/${data?.id}`,
                          type: "gift_card",
                        })
                      }
                      className="flex-center grow gap-x-1 bg-secendry py-2 lg:py-3"
                    >
                      <span className="font-peyda-400 text-xs text-white lg:text-lg">
                        افزودن به سبد خرید
                      </span>

                      <Bag className="h-[18px] w-[18px] text-white lg:h-6 lg:w-6" />
                    </Button>
                    <Button
                      onClick={() => setShowModal(true)}
                      className="flex-center flex-none bg-secendry p-3"
                    >
                      <Share className="h-[18px] w-[18px] text-white lg:h-6 lg:w-6" />
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-center w-full">
              <div className="flex w-fit flex-col items-center">
                <img
                  src="/images/giftcard/card.png"
                  alt=""
                  className="w-full lg:w-[50%] xl:w-[40%]"
                />

                <div className="my-10 flex flex-col items-center gap-y-[18px]">
                  <span className="block text-center font-peyda-600 text-2xl text-primary md:text-[32px]">
                    کارت هدیه شما با موفقیت خریداری شد
                  </span>
                  <p className="text-center font-peyda-400 text-xs text-blue-1050 md:text-lg">
                    از طریق کد زیر و وارد کردن آن در بخش کد تخفیف از این کارت
                    هدیه استفاده کنید
                  </p>
                </div>

                <GetCodeInputComponent url="Exclusivediscountcode" />
              </div>
            </div>
          )}
        </section>
      )}

      {showModal && (
        <Modal
          openModal={showModal}
          setOpenModal={setShowModal}
          modalTitle="ما را با دوستان خود به اشتراک بگذارید"
          modalStylel="w-[98%] lg:w-[50%] xl:w-[40%] p-4 xl:p-6 "
        >
          <div className=" w-full flex justify-center">
            <GetCodeInputComponent url={pathName} />
          </div>
        </Modal>
      )}
    </>
  );
}
