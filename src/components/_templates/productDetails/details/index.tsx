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
  availableChains,
  selectedChain,
  handleChainClick,
  selectedWeight,
  handleWeightClick,
}: any) {
  const [showModal, setShowModal] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const pathName = usePathname();
  const { dispatch } = useCart();

  const getMediaType = (url: string) => {
    if (!url) return "image";
    if (url.toLowerCase().includes(".mp4")) return "video";
    return "image";
  };

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
    const raw: string[] = [];

    if (selectedVariations?.gallery) {
      raw.push(...selectedVariations.gallery);
    }

    if (productDetails?.product?.image) {
      raw.push(productDetails.product.image);
    }

    if (productDetails?.product?.gallery) {
      raw.push(...productDetails.product.gallery);
    }

    const unique = Array.from(new Set(raw))
      .filter(Boolean)
      .map((url) => ({
        url,
        type: getMediaType(url),
      }));

    setMediaItems(unique);

    handleWeightClick(selectedVariations?.weight);
  }, [
    selectedVariations,
    productDetails?.product?.image,
    productDetails?.product?.gallery,
  ]);

  const handleAddToCart = () => {
    const stock = selectedVariations?.sku
      ? Number(selectedVariations?.stock ?? 0)
      : Number(productDetails?.product?.stock ?? 0);

    const canPreorder = selectedVariations?.sku
      ? Number(selectedVariations?.can_preorder ?? 0) === 1
      : Number(productDetails?.product?.can_preorder ?? 0) === 1;

    const isOutOfStockCompletely = stock <= 0 && !canPreorder;

    if (isOutOfStockCompletely) {
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

    const is_preorder = stock <= 0 && canPreorder;

    let price = selectedVariations?.price || productDetails?.product?.price;

    if (is_preorder) {
      if (selectedVariations?.sku) {
        price =
          selectedVariations?.preorder_price_type === "fixed"
            ? price - selectedVariations?.preorder_price
            : price * (selectedVariations?.preorder_price / 100);
      } else {
        price =
          productDetails?.product?.preorder_price_type === "fixed"
            ? price - productDetails?.product?.preorder_price
            : price * (productDetails?.product?.preorder_price / 100);
      }
    }

    const itemToAdd = {
      product: productDetails?.product,
      slug: productDetails?.product?.slug,
      product_id: productDetails?.product?.id,
      name: selectedVariations?.name || productDetails?.product?.name,
      image: selectedVariations?.gallery?.[0] || productDetails?.product?.image,
      price,
      quantity: 1,
      sku: productDetails?.product?.sku,
      variation_sku: selectedVariations?.sku || "",
      color: selectedColorData?.color_name,
      size: selectedSize?.value,
      packing: packagingData,
      stockQuantity: stock,
      wage: productDetails?.product?.wage,
      weight: selectedVariations?.weight || productDetails?.product?.weight,
      type: "product",
      box_id: packagingData?.id ? String(packagingData?.id) : "",
      box: packagingData,
      is_preorder,
      pricing: {
        base_price:
          selectedVariations?.base_price ??
          productDetails?.product?.base_price ??
          0,
        markup_price:
          selectedVariations?.markup_price ??
          productDetails?.product?.markup_price ??
          0,
        discount_amount:
          selectedVariations?.discount_amount ??
          productDetails?.product?.discount_amount ??
          0,
        tax_amount:
          selectedVariations?.tax_amount ??
          productDetails?.product?.tax_amount ??
          0,
      },
    };

    dispatch({
      type: "ADD_ITEM",
      item: itemToAdd,
      dispatch,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const stock = selectedVariations?.sku
    ? Number(selectedVariations?.stock ?? 0)
    : Number(productDetails?.product?.stock ?? 0);

  const canPreorder = selectedVariations?.sku
    ? Number(selectedVariations?.can_preorder ?? 0) === 1
    : Number(productDetails?.product?.can_preorder ?? 0) === 1;

  const isPreorder = stock <= 0 && canPreorder;

  const isUnavailable = stock <= 0 && !canPreorder;

  const currentPrice = Number(
    selectedVariations?.sku
      ? (selectedVariations?.price ?? 0)
      : (productDetails?.product?.price ?? 0),
  );

  const finalPriceBeforeDiscount = Number(
    selectedVariations?.sku
      ? (selectedVariations?.final_price_before_discount ?? 0)
      : (productDetails?.product?.final_price_before_discount ?? 0),
  );

  const discountText = selectedVariations?.sku
    ? (selectedVariations?.discount_text ?? "")
    : (productDetails?.product?.discount_text ?? "");

  const hasDiscount =
    discountText &&
    discountText !== "0%" &&
    discountText !== "0" &&
    finalPriceBeforeDiscount > currentPrice;

  const rawDiscountText = selectedVariations?.sku
    ? (selectedVariations?.discount_text ?? "")
    : (productDetails?.product?.discount_text ?? "");

  const parsedDiscountNumber = Number(rawDiscountText.replace("%", "").trim());

  const discountDisplay = isNaN(parsedDiscountNumber)
    ? rawDiscountText
    : `${Math.round(parsedDiscountNumber).toLocaleString("fa-IR")}%`;

  const chains = availableChains || [];

  const displayWeight = selectedWeight || productDetails?.product?.weight;

  const weights = Array.from(
    new Set(
      (productDetails?.product?.variations || [])
        .map((v: any) => v.weight)
        .filter(
          (weight: any) =>
            weight !== null &&
            weight !== undefined &&
            weight !== "" &&
            Number(weight) > 0,
        ),
    ),
  );

  const hasWeightSelector = weights.length > 1;

  const availableColors = (colors || []).filter(Boolean);

  const hasColorSelector = availableColors.length >= 1;

  return (
    <>
      <div className="mb-10 grid grid-cols-1 gap-y-6 lg:grid-cols-5 lg:gap-x-10">
        <div className="lg:col-span-2 relative">
          {hasDiscount ? (
            <div className="absolute right-4 top-4 z-10 w-fit bg-red-250 px-3 py-1.5 font-peyda-400 text-xs text-white">
              {discountDisplay} تخفیف
            </div>
          ) : isUnavailable ? (
            <div className="absolute right-4 top-4 z-10 w-fit bg-slate-1000/50 px-3 py-1.5 font-peyda-400 text-xs text-white">
              ناموجود
            </div>
          ) : isPreorder ? (
            <div className="absolute right-4 top-4 z-10 w-fit bg-yellow-600 px-3 py-1.5 font-peyda-400 text-xs text-white">
              پیش سفارش
            </div>
          ) : null}

          {mediaItems?.length > 0 ? (
            <>
              <div className="mt-3">
                <Thumbnails media={mediaItems} />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center">
              <ImageIcon className="text-secendry w-[80%]" />
            </div>
          )}
        </div>

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

              <div
                className={`group relative inline-block ms-auto ml-1 -mt-2 cursor-pointer`}
              >
                <div className="absolute bottom-1 hidden w-full whitespace-nowrap pr-0.5 group-hover:block calc-price">
                  <div className="flex translate-y-full flex-col-reverse items-center justify-start">
                    <div className="cursor-default rounded-lg bg-secendry px-3 py-2 font-peyda-400 text-[10px] text-white shadow-md ml-1">
                      <span className="leading-4">
                        وزن طلا × (قیمت روز طلا + اجرت) + ۷ % سود + <br />
                        متعلقات + ۱۰ % مالیات از سود و اجرت
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

            {(selectedColorData?.color_name || hasColorSelector) && (
              <div className="my-6 space-y-2 lg:mb-4 lg:mt-4">
                {selectedColorData?.color_name && (
                  <div className="mb-4">
                    <span className="font-peyda-500 text-lg text-blue-1050 lg:text-xl">
                      رنگ: {selectedColorData.color_name}
                    </span>
                  </div>
                )}

                {hasColorSelector && (
                  <div className="mb-6 lg:mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {availableColors.map((color: any) => (
                        <button
                          key={color.id}
                          onClick={() => handleColorClick(color.value)}
                          className={`px-4 h-8 border transition-all ${
                            selectedColor === color.value
                              ? "bg-primary text-white border-primary"
                              : "bg-white text-neutral-1000 border-neutral-1000"
                          }`}
                        >
                          {color.value}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {hasWeightSelector && (
              <div className="flex flex-col gap-2 mb-6 lg:mb-4">
                <span className="font-peyda-500 text-lg text-blue-1050 lg:text-xl">
                  وزن:
                </span>

                <div className="flex gap-2 flex-wrap">
                  {weights.map((weight: any) => (
                    <button
                      key={weight}
                      onClick={() => handleWeightClick(weight)}
                      className={`cursor-pointer flex items-center justify-center border px-4 pt-2 pb-1 transition text-sm
            ${
              selectedWeight === weight
                ? "border-primary bg-primary text-white"
                : "border-gray-300"
            }`}
                    >
                      <span>{weight} گرم</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <span className="font-peyda-500 text-lg text-blue-1050 lg:text-xl">
                {displayWeight
                  ? `وزن: ${Number(displayWeight).toLocaleString("fa")} گرم`
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
              {availableSizes?.map((as: any, index: number) => {
                const size = as.attributes?.find(
                  (attr: any) => attr.name === "سایز" || attr.name === "طول",
                );
                return (
                  <button
                    className={`w-11 h-7 ${selectedSize?.value === size?.value?.value ? "text-white bg-primary" : "bg-transparent text-neutral-1000 border border-neutral-1000"}`}
                    key={index}
                    onClick={() => handleSizeClick(size?.value?.id)}
                  >
                    <span dir="ltr" className="inline-block">
                      {formatSizeValue(size?.value?.value)}
                    </span>
                  </button>
                );
              })}
            </div>

            {chains.length > 0 && (
              <div className="my-6">
                <span className="font-peyda-500 text-lg text-blue-1050">
                  نوع زنجیر:
                  {selectedChain?.value ? " " + selectedChain.value : ""}
                </span>

                <div className="flex gap-2 mt-3 flex-wrap">
                  {availableChains.map((chain: any) => (
                    <button
                      key={chain.id}
                      onClick={() => handleChainClick(chain.id)}
                      className={`px-4 h-8 border transition-all
            ${
              selectedChain?.id === chain.id
                ? "bg-primary text-white border-primary"
                : "bg-white border-neutral-1000"
            }
          `}
                    >
                      {chain.value}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
                  {isUnavailable ? (
                    // تغییر: نمایش ناموجود به جای قیمت منفی یا صفر
                    <span className="font-peyda-500 text-xl text-red-600 lg:text-3xl">
                      ناموجود
                    </span>
                  ) : hasDiscount ? (
                    <div className="flex flex-col">
                      <span className="text-gray-500 line-through text-lg lg:text-2xl">
                        {finalPriceBeforeDiscount.toLocaleString("fa-IR")} تومان
                      </span>

                      <span className="font-bold text-xl text-blue-1050 lg:text-3xl">
                        {currentPrice.toLocaleString("fa-IR")} تومان
                      </span>
                    </div>
                  ) : (
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
                {isPreorder ? (
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
                            selectedVariations?.preorder_final_price ??
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
                disabled={isUnavailable}
                className={`flex-center grow gap-x-1 py-2 lg:py-3 ${
                  isUnavailable
                    ? "bg-gray-400 cursor-default opacity-50"
                    : "bg-secendry"
                }`}
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
                      {isUnavailable
                        ? "ناموجود"
                        : stock <= 0 && canPreorder
                          ? "افزودن به سبد خرید (پیش‌فروش)"
                          : "افزودن به سبد خرید"}
                    </span>
                    {!isUnavailable && (
                      <Bag className="h-[18px] w-[18px] text-white lg:h-6 lg:w-6" />
                    )}
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
