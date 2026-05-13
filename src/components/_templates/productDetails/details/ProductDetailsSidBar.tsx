import Button from "@/components/_modules/button";
import FavoriteButton from "@/components/_modules/favoriteBtn";
import Bag from "@/public/icons/Bag";
import swal from "sweetalert";

import Share from "@/public/icons/share";
import SizeGuideModal from "@/components/_templates/productDetails/sizeGuide";
import React, { useEffect, useState } from "react";
import Check from "@/public/icons/check";
import Modal from "@/components/_modules/modal";
import GetCodeInputComponent from "@/components/_modules/get codeInputComponent";
import { usePathname } from "next/navigation";
import { BASE_URL } from "@/configs/api-constants";
import { useCart } from "@/libs/context/cart-shopping/CartContext";

export default function ProductDetailsSidBar({
  productDetails,
  handleSizeClick,
  selectedSize,
  handleColorClick,
  selectedColor,
  selectedColorData,
  packagingData,
  handleAddToWishList,
  selectedVariations,
  availableSizes,
  colors,
  sizeText,
}: any) {
  const [showModal, setShowModal] = useState(false);
  const pathName = usePathname();
  const [isAdded, setIsAdded] = useState(false);

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

  const { dispatch } = useCart();

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  const handleAddToCart = () => {
    if (
      (selectedVariations?.sku &&
        selectedVariations?.stock <= 0 &&
        !selectedVariations?.can_preorder) ||
      (productDetails?.product?.stock <= 0 && !selectedVariations?.can_preorder)
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
      is_preorder,
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
    };

    dispatch({ type: "ADD_ITEM", item: itemToAdd, dispatch });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  return (
    <>
      <div className="hidden flex-col bg-white p-6 xl:flex h-fit">
        <h1 className="font-peyda-500 text-xl text-blue-1050 lg:text-2xl">
          {selectedVariations?.name || selectedColorData?.name}
        </h1>

        <span className="font-peyda-500 text-sm text-slate-1000/50 lg:text-lg">
          جنس محصول:
          {productDetails?.product?.material}
        </span>

        <div className="flex flex-col gap-y-2 pt-6">
          <div className="my-6 space-y-2 lg:mb-10 lg:mt-6">
            <span className="font-peyda-500 text-lg text-blue-1050 lg:text-xl">
              {selectedColorData?.color_name
                ? "رنگ: " + selectedColorData?.color_name
                : ""}
            </span>
            <div className="flex items-center gap-x-2">
              {colors?.map((color: any, index: any) => (
                <button
                  key={`${color.value2}-${index}`}
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
            {availableSizes?.map((as: any, index: any) => {
              const size = as.attributes?.find(
                (attr: any) => attr.name === "سایز" || attr.name === "طول"
              );
              return (
                <button
                  className={`w-11 h-7 ${
                    selectedSize?.value === size?.value?.value
                      ? "text-white bg-primary"
                      : "bg-transparent text-neutral-1000 border border-neutral-1000"
                  }`}
                  key={`${size?.id}-${index}`}
                  onClick={() => handleSizeClick(size?.value?.id)}
                >
                  <span dir="ltr" className="inline-block">
                    {formatSizeValue(size?.value?.value)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="my-6 flex gap-x-1 lg:mb-6 lg:mt-10">
            <span className="font-peyda-400 text-xl text-blue-1050 lg:text-3xl">
              قیمت:{" "}
              {selectedVariations
                ? Number(selectedVariations?.price || 0).toLocaleString("fa-IR")
                : productDetails?.product?.price
                  ? Number(productDetails?.product?.price).toLocaleString(
                      "fa-IR"
                    )
                  : "ناموجود"}
              <span> تومان</span>
            </span> 
          </div>
          <div className="w-full mb-3 flex items-center gap-x-3">
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
      </div>
    </>
  );
}
