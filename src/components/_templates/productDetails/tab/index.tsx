"use client";

import React, { useState } from "react";
import ProductDetailsSidBar from "../details/ProductDetailsSidBar";
import TabHeading from "../tabHeading";
import ProductComments from "../comments";

export default function ProductDataTab({
  productDetails,
  handleSizeClick,
  selectedSize,
  handleColorClick,
  selectedColor,
  selectedColorData,
  handleAddItem,
  packagingData,
  handleAddToWishList,
  selectedVariations,
  colors,
  availableSizes,
  sizeText
}: any) {
  const SpecificationsArray = Object.entries(selectedVariations?.specifications ?? productDetails?.product?.specifications ?? {});

  const tabs = [
    {
      title: `مشخصات`,
      content: SpecificationsArray,
    },
    {
      title: `توضیحات تکمیلی`,
      content: productDetails?.product?.description?.replace(/\n/g, "<br>"),
    },
    {
      title: `نظرات کاربران
      `,
      content: productDetails?.comments,
    },
  ];

  const [activeTab, setActiveTab] = useState({
    index: 0,
  });
  return (
    <>
      <TabHeading
        tabs={tabs}
        setActiveTab={setActiveTab}
        activeTab={activeTab}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4">
        <div
          className={`${
            activeTab.index === 2
              ? "h-fit xl:col-span-3"
              : "borderBottom h-fit bg-gray-250 p-3 xl:col-span-3"
          }`}
        >
          {activeTab.index === 0 ? (
            <>
              {SpecificationsArray.map(([key, value], index) => (
                <div
                  className="grid grid-cols-2 gap-4 py-2 border-b"
                  key={index}
                >
                  <div className="font-peyda-500 text-sm text-slate-1000/50 lg:text-lg">
                    {key}
                  </div>
                  <div className="font-peyda-500 text-sm text-blue-1050 lg:text-lg">
                    {value ? String(value) : "-"}
                  </div>
                </div>
              ))}
            </>
          ) : activeTab.index === 1 ? (
            <>
              <div
                className="font-peyda-400 text-sm text-blue-1050 child:block child:py-1 lg:text-lg"
                dangerouslySetInnerHTML={{ __html: tabs[1]?.content }}
              />
            </>
          ) : activeTab.index === 2 ? (
            <ProductComments productDetails={productDetails} />
          ) : null}
        </div>
        <ProductDetailsSidBar
          productDetails={productDetails}
          handleSizeClick={handleSizeClick}
          handleColorClick={handleColorClick}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          selectedColorData={selectedColorData}
          handleAddItem={handleAddItem}
          packagingData={packagingData}
          handleAddToWishList={handleAddToWishList}
          selectedVariations={selectedVariations}
          colors={colors}
          availableSizes={availableSizes}
          sizeText={sizeText}
        />
      </div>
    </>
  );
}
