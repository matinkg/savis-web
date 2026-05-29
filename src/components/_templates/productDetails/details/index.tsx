"use client";

import Button from "@/components/_modules/button";
import FavoriteButton from "@/components/_modules/favoriteBtn";
import Packaging from "@/components/_modules/giftCard/packaging";
import SizeGuideModal from "@/components/_templates/productDetails/sizeGuide";
import Thumbnails from "@/components/_modules/sliders/thumbnails";
import Bag from "@/public/icons/Bag";
import Share from "@/public/icons/share";
import Star from "@/public/icons/start";
import Check from "@/public/icons/check";
import { useEffect, useState } from "react";
import Modal from "@/components/_modules/modal";

import swal from "sweetalert";

import { BASE_URL } from "@/configs/api-constants";
import { usePathname } from "next/navigation";
import GetCodeInputComponent from "@/components/_modules/get codeInputComponent";
import { useCart } from "@/libs/context/cart-shopping/CartContext";
import Info from "@/public/icons/info";
import ImageIcon from "@/public/icons/image";

export default function ProductDataDetails({
  productDetails,
  handleSizeClick,
  selectedSize,
  handleColorClick,
  selectedColor,
  selectedColorData,
  setPackingData,
  packagingData,
  handleAddToWishList,
  availableSizes,
  colors,
  selectedVariations,
  sizeText,
}: any) {
  const [showModal, setShowModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [images, setImages] = useState([]);
  const pathName = usePathname();
  const { dispatch } = useCart();
  const [selectedWeight, setSelectedWeight] = useState(
    selectedVariations?.weight,
  );

  const formatSizeValue = (value: unknown) => {
    if (value === null || value === undefined) {
      return "";
    }

    if (typeof value === "number") {
      return value.toLocaleString("fa");
    }

    const raw = String(value).trim();
    const numericPattern = /^-?\d+(?:\.\d+)?$/;

    if (numericPattern.test(raw)) {
      return Number(raw).toLocaleString("fa");
    }

    return raw;
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  useEffect(() => {
    const thumbnails = [];

    if (selectedVariations?.gallery) {
      thumbnails.push(...(selectedVariations.gallery as []));
    }

    if (productDetails?.product?.image) {
      thumbnails.push(productDetails?.product?.image);
    }

    if (productDetails?.product?.gallery) {
      thumbnails.push(...productDetails.product.gallery);
    }
    setImages(thumbnails as any);
    setSelectedWeight(selectedVariations?.weight);
  }, [selectedVariations]);

  const handleAddToCart = () => {
    if (
      selectedVariations?.sku
        ? selectedVariations?.stock <= 0 && !selectedVariations?.can_preorder
        : productDetails?.product?.stock <= 0
    ) {
      return swal({
        title: "موجودی ناکافی!",
        text: "متأسفیم، این کالا در حال حاضر ناموجود است.",
        icon: "warning",
        buttons: {
          confirm: {
            text: "بستن",
            value: true,
            visible: true,
            className: "",
            closeModal: true,
          },
        },
      });
    }

    let is_preorder =
      selectedVariations?.stock <= 0 && selectedVariations?.can_preorder;

    let price = selectedVariations?.price || productDetails?.product?.price;

    if (is_preorder) {
      if (selectedVariations) {
        price =
          selectedVariations.preorder_price_type === "fixed"
            ? price - selectedVariations.preorder_price
            : price * (selectedVariations.preorder_price / 100);
      } else {
        price =
          productDetails?.product.preorder_price_type === "fixed"
            ? price - productDetails?.product.preorder_price
            : price * (productDetails?.product.preorder_price / 100);
      }
    }

    const itemToAdd = {
      product: productDetails?.product,
      slug: productDetails?.product?.slug,
      product_id: productDetails?.product?.id,
      name: selectedVariations?.name || productDetails?.product?.name,
      image: selectedVariations?.gallery[0] || productDetails?.product?.image,
      price,
      quantity: 1,
      sku: productDetails?.product?.sku,
      variation_sku: selectedVariations?.sku || "",
      color: selectedColorData?.color_name,
      size: selectedSize?.value,
      packing: packagingData,
      stockQuantity: selectedVariations?.stock || 0,
      wage: productDetails?.product?.wage,
      weight: selectedVariations?.weight || productDetails?.product?.weight,
      type: "product",
      box_id: packagingData?.id ? String(packagingData?.id) : "",
      box: packagingData,
      is_preorder,
    };

    dispatch({ type: "ADD_ITEM", item: itemToAdd, dispatch });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <>
      <div className="mb-10 grid grid-cols-1 gap-y-6 lg:grid-cols-5 lg:gap-x-10">
        {images?.length > 0 ? (
          <div className="lg:col-span-2 product-gallery-container">
            <Thumbnails images={images} />
          </div>
        ) : (
          <div className="lg:col-span-2">
            <ImageIcon className="text-secendry w-[80%]" />
          </div>
        )}

        {}
        <div className="lg:col-span-3">
          <div className="border-b border-solid border-b-slate-1000/20 pb-4">
            <div className="flex items-center justify-between">
              <h1 className="font-peyda-500 text-lg text-blue-1050 lg:text-2xl">
                {productDetails?.product?.name}
              </h1>

              <div className="hidden items-start gap-x-1 lg:flex">
                <span className="font-peyda-400 text-lg">
                  {Number(productDetails?.averageRating)
                    ?.toLocaleString("fa-IR", { maximumFractionDigits: 2 })
                    .replace("٫", "/")}
                </span>

                <Star className="h-6 w-6 text-yellow-500" />
              </div>
            </div>

            <span className="my-1.5 hidden font-peyda-500 text-sm text-blue-1050 lg:block lg:text-base">
              کد محصول :{" "}
              {selectedVariations?.sku || productDetails?.product?.sku}
            </span>

            <div className="my-4 flex items-center justify-between calc-price-container">
              {productDetails?.product?.material && (
                <span className="font-peyda-500 text-sm text-slate-1000/50 lg:text-base">
                  جنس محصول:
                  {productDetails?.product?.material}
                </span>
              )}

              <div className="group relative inline-block cursor-pointer ml-4">
                <div className="absolute bottom-1 hidden w-full whitespace-nowrap pr-0.5 group-hover:block calc-price">
                  <div className="flex translate-y-full flex-col-reverse items-center justify-start">
                    <div className="cursor-default rounded-lg bg-secendry px-3 py-2 font-peyda-400 text-[10px] text-white shadow-md ml-1">
                      <span className="leading-4">
                        وزن طلا × (قیمت روز طلا + اجرت) + ۷ % سود + <br />
                        متعلقات + ۹ % مالیات از سود و اجرت
                      </span>
                    </div>
                    <div className="-mb-[1px] h-0 w-0 border-b-[8px] border-l-[12px] border-r-[12px] border-b-secendry border-l-transparent border-r-transparent"></div>
                  </div>
                </div>
                <span className="font-peyda-500 text-sm text-blue-1050 lg:text-base">
                  نحوه محاسبه قیمت
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-solid border-t-slate-1000/20 pt-4 lg:hidden">
              <span className="my-1.5 block font-peyda-500 text-sm text-blue-1050 lg:text-base">
                کد محصول :{" "}
                {selectedVariations?.sku || productDetails?.product?.sku}
              </span>

              <div className="flex items-end gap-x-1">
                <span className="font-peyda-400 text-base">
                  {productDetails?.product?.star}
                </span>

                <Star className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-6">
            <p
              dangerouslySetInnerHTML={{
                __html: productDetails?.product?.summary,
              }}
              className="font-peyda-500 text-xs text-slate-1000/50 lg:w-[424px] lg:text-sm"
            ></p>

            <div className="my-6 space-y-2 lg:mb-10 lg:mt-6">
              <span className="font-peyda-500 text-lg text-blue-1050 lg:text-xl">
                {selectedColorData?.color_name
                  ? "رنگ: " + selectedColorData?.color_name
                  : ""}
              </span>
              <div className="flex items-center gap-x-2">
                {colors?.map((color: any) => (
                  <button
                    key={color.value2}
                    onClick={() => handleColorClick(color.value2)}
                    style={{
                      backgroundColor: color.value2,
                      width: "30px",
                      height: "30px",
                      border:
                        selectedColor === color.value2
                          ? "2px solid #ffffff"
                          : "none",
                    }}
                    className="flex items-center justify-center"
                  >
                    {selectedColor.value2 === color.value2 ? (
                      <Check className="text-white w-5 h-5" />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <span className="font-peyda-500 text-lg text-blue-1050 lg:text-xl">
                {selectedWeight
                  ? `وزن: ${Number(selectedWeight).toLocaleString("fa")} گرم`
                  : ""}
              </span>
            </div>

            <div className="mb-2 flex items-center gap-x-2">
              <span className="font-peyda-500 text-lg text-blue-1050 lg:text-xl">
                {selectedSize?.value ? (
                  <>
                    {sizeText + ": "}
                    <span dir="ltr" className="inline-block">
                      {formatSizeValue(selectedSize?.value)}
                    </span>
                  </>
                ) : (
                  ""
                )}
              </span>

              <SizeGuideModal />
            </div>
            <div className="flex items-center gap-x-2">
              {availableSizes?.map((as: any) => {
                const size = as.attributes?.find(
                  (attr: any) => attr.name === "سایز" || attr.name === "طول",
                );
                return (
                  <button
                    className={`w-11 h-7 ${selectedSize?.value === size?.value?.value ? "text-white bg-primary" : "bg-transparent text-neutral-1000 border border-neutral-1000"}`}
                    key={size?.id}
                    onClick={() => handleSizeClick(size?.value?.id)}
                  >
                    <span dir="ltr" className="inline-block">
                      {formatSizeValue(size?.value?.value)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ------------------------------------------ */}
            <Packaging
              className="my-6 lg:my-10"
              setPackingData={setPackingData}
              packagingData={packagingData}
            />
            {/* ------------------------------------------ */}

            <div className="border-t border-solid border-t-slate-1000/20 py-6">
              <div className="flex flex-col">
                {/* Main Price Display */}
                <div className="flex items-center gap-2">
                  {selectedVariations?.discount_type === "percentage" &&
                  selectedVariations?.discount_value > 0 ? (
                    <span className="font-peyda-400 text-xl text-blue-1050 lg:text-3xl block">
                      قیمت:
                      <br />
                      {/* قیمت اصلی با خط خورده */}
                      <span className="text-gray-500 line-through text-lg lg:text-2xl">
                        {Number(
                          selectedVariations?.original_price,
                        ).toLocaleString("fa-IR")}{" "}
                        <span>تومان</span>
                      </span>
                      {/* قیمت با تخفیف */}
                      <span className="block font-bold text-xl lg:text-3xl">
                        {Number(
                          selectedVariations?.original_price *
                            (1 - selectedVariations?.discount_value / 100),
                        ).toLocaleString("fa-IR")}{" "}
                        <span>تومان</span>
                      </span>
                    </span>
                  ) : (
                    // در صورت نبود تخفیف
                    <span className="font-peyda-400 text-xl text-blue-1050 lg:text-3xl">
                      {Number(
                        selectedVariations?.price ||
                          productDetails?.product?.price,
                      ).toLocaleString("fa-IR")}{" "}
                      <span>تومان</span>
                    </span>
                  )}
                </div>

                {/* Pre-order Notice */}
                {(selectedVariations?.sku &&
                  selectedVariations?.can_preorder) ||
                (!selectedVariations?.sku &&
                  productDetails?.product?.can_preorder) ? (
                  <div className="flex flex-col mt-3">
                    <div className="flex items-center p-3 bg-[#c3dce3] text-gray-800 rounded">
                      <Info className="text-black w-5 h-5 mx-1" />
                      <div className="flex flex-col text-sm">
                        <span className="font-semibold">
                          قیمت اصلی:{" "}
                          {Number(
                            selectedVariations?.original_price ||
                              productDetails?.product?.price,
                          ).toLocaleString("fa-IR")}{" "}
                          تومان
                        </span>
                        <span className="font-semibold">
                          پیش‌پرداخت:
                          {`${Number(
                            productDetails?.product?.preorder_final_price,
                          ).toLocaleString("fa")} تومان`}
                        </span>
                        <span>
                          محصول طی 72 ساعت پس از ثبت سفارش آماده خواهد شد.
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex gap-x-3">
              <Button
                onClick={handleAddToCart}
                className="flex-center grow gap-x-1 bg-secendry py-2 lg:py-3"
              >
                {isAdded ? (
                  <>
                    <Check className="h-5 w-5 text-white" />
                    <span className="font-peyda-400 text-xs text-white lg:text-lg">
                      به سبد خرید اضافه شد!
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-peyda-400 text-xs text-white lg:text-lg">
                      {productDetails?.product?.quantity === 0 &&
                      (selectedVariations?.can_preorder ||
                        productDetails?.product?.can_preorder)
                        ? "افزودن به سبد خرید (پیش‌فروش)"
                        : "افزودن به سبد خرید"}
                    </span>
                    <Bag className="h-[18px] w-[18px] text-white lg:h-6 lg:w-6" />
                  </>
                )}
              </Button>

              <FavoriteButton
                productDetails={productDetails}
                handleAddToWishList={handleAddToWishList}
              />

              <Button
                onClick={() => setShowModal(true)}
                className="flex-center flex-none bg-secendry p-3"
              >
                <Share className="h-[18px] w-[18px] text-white lg:h-6 lg:w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          openModal={showModal}
          setOpenModal={setShowModal}
          modalTitle="ما را با دوستان خود به اشتراک بگذارید"
          modalStylel="w-[98%] lg:w-[50%] xl:w-[40%] p-4 xl:p-6 "
        >
          <div className=" w-full flex justify-center">
            <GetCodeInputComponent url={BASE_URL + pathName} />
          </div>
        </Modal>
      )}
    </>
  );
}
