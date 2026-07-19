"use client";
import BreadcrumbRoute from "@/components/_modules/breadcrumbRoute";
import InstagramPosts from "@/components/_modules/instagram";
import RelatedProducts from "@/components/_modules/relatedProducts";
import SetProducts from "@/components/_modules/setproduct";
import ProductDataDetails from "@/components/_templates/productDetails/details";
import ProductDataTab from "@/components/_templates/productDetails/tab";
import PrimaryLoading from "@/components/_templates/loading/primaryLoading";
import useFetchData from "./hook/useFetchData";
import { useCart } from "@/libs/context/cart-shopping/CartContext";
import { CartItem } from "@/libs/context/cart-shopping/interface";
import { showSwal } from "@/helper/swal";
import { useState } from "react";
import useOperation from "./hook/useOperation";
import Head from "next/head";

export default function ProductDetails() {
  const {
    data,
    loading,
    handleSizeClick,
    handleColorClick,
    selectedSize,
    selectedColor,
    selectedColorData,
    fetchDataFromServer,
    availableSizes,
    colors,
    selectedVariations,
    sizeText,
    availableChains,
    selectedChain,
    handleChainClick,
    selectedWeight,
    handleWeightClick,
  } = useFetchData();

  // -------------------------------------------------------------------------------
  const [packagingData, setPackingData] = useState<any>({});

  const { state, dispatch } = useCart();

  const handleAddItem = (item: CartItem) => {
    if (
      item?.stockQuantity &&
      item?.quantity &&
      item?.stockQuantity > item?.quantity
    ) {
      dispatch({
        type: "ADD_ITEM",
        item: {
          ...item,
          box: packagingData,
          box_id: (packagingData?.id ?? "") as string,
        },
      });
      showSwal("محصول با موفقیت به سبد خرید اضافه شد", "success", "بستن");
    } else {
      showSwal("موجودی این محصول به پایان رسیده است ", "error", "بستن");
    }
  };

  const { handleAddToWishList } = useOperation(fetchDataFromServer);

  // ----------------------------------------------------------------

  return (
    <>
      {loading ? (
        <PrimaryLoading />
      ) : (
        <>
          <Head>
            <title>{data?.product?.name || "جزئیات محصول"}</title>
            <meta
              name="description"
              content={data?.product?.description ?? "توضیحات محصول"}
            />
            <meta
              name="keywords"
              content={data?.tags?.map((t: any) => t.name).join(", ")}
            />
            <meta property="og:title" content={data?.product?.title} />
            <meta
              property="og:description"
              content={data?.product?.description ?? ""}
            />
            <meta
              property="og:image"
              content={data?.product?.image ?? "/default-image.jpg"}
            />
            <meta property="og:type" content="product" />
          </Head>
          <section className="mx-auto mt-48 w-[91.12%] lg:mt-32 lg:w-[91.67%] 4xl:w-[85%] overflow-x-hidden">
            <BreadcrumbRoute
              category="دسته بندی"
              productDetails={data}
              stepOne="خانه"
              className="mb-4 md:my-6"
            />

            <ProductDataDetails
              productDetails={data}
              handleSizeClick={handleSizeClick}
              handleColorClick={handleColorClick}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              selectedColorData={selectedColorData}
              setPackingData={setPackingData}
              packagingData={packagingData}
              handleAddToWishList={handleAddToWishList}
              availableSizes={availableSizes}
              colors={colors}
              selectedVariations={selectedVariations}
              sizeText={sizeText}
              availableChains={availableChains}
              selectedChain={selectedChain}
              handleChainClick={handleChainClick}
              selectedWeight={selectedWeight}
              handleWeightClick={handleWeightClick}
            />
            <ProductDataTab
              productDetails={data}
              handleSizeClick={handleSizeClick}
              availableSizes={availableSizes}
              handleColorClick={handleColorClick}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              selectedColorData={selectedColorData}
              handleAddItem={handleAddItem}
              packagingData={packagingData}
              handleAddToWishList={handleAddToWishList}
              selectedVariations={selectedVariations}
              colors={colors}
              sizeText={sizeText}
            />

            {/* =========================================================================== */}
            {data?.relatedProducts?.length > 0 && (
              <SetProducts
                RelatedProductsData={data?.relatedProducts}
                className="w-full"
              />
            )}
            {data?.relatedProducts?.length > 0 && (
              <RelatedProducts
                RelatedProductsData={data?.relatedProducts}
                className="w-full"
              />
            )}

            {/* =========================================================================== */}

            <InstagramPosts className="hidden md:grid my-10" />
          </section>
        </>
      )}
    </>
  );
}
