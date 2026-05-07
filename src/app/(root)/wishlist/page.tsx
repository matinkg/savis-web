import InstagramPosts from "@/components/_modules/instagram";
import WishTemp from "@/components/_templates/wish";
import React from "react";

export default function wishlist() {
  return (
    <>
      {/* banner  */}
      <div className="wishlist_banner_mobile lg:wishlist_banner_desk mb-10 flex items-center lg:mb-[60px]">
        <div className="mx-auto w-[91.12%] lg:w-[91.67%] 4xl:w-[85%]">
          <h1 className="font-peyda-900 text-[44px] text-white lg:font-peyda-600 lg:text-[85px]">
            علاقه مندی ها
          </h1>
        </div>
      </div>
      {/* banner  */}

      <WishTemp />

      <InstagramPosts className="mx-auto my-10 w-[91.12%] lg:my-[60px] lg:w-[91.67%] 4xl:w-[85%]" />
    </>
  );
}
