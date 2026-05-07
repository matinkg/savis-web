"use client";
import React from "react";
import useOperation from "./hook/useOperation";
import Spinner from "@/components/_modules/loading/spinner";
import Wishlist from "./wishlist";
import RelatedProducts from "@/components/_modules/relatedProducts";
import WishlistEmpty from "./wishlist/wishlistEmpty";

export default function WishTemp() {
  const { loading, handelDeleteAllWishItem, productData } =
    useOperation();
  return (
    <>
      {loading ? (
        <div className="py-96">
          <Spinner className="w-8 h-8" />
        </div>
      ) : (
        <div className="mx-auto flex w-[91.12%] flex-col items-center lg:w-[91.67%] 4xl:w-[85%]">
          {productData.length > 0 ? (
            <>
              <Wishlist
                data={productData}
              />
              {productData && (
                <RelatedProducts
                  RelatedProductsData={productData}
                  className="hidden w-full lg:block"
                />
              )}
            </>
          ) : (
            <WishlistEmpty />
          )}
        </div>
      )}
    </>
  );
}
