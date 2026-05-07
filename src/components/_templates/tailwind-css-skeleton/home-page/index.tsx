import React from "react";
import BannerSkeleton from "./banner";
import JewelryCategorSkeleton from "./jewelryCategor";
import HomeAdsSkeleton from "./homeAds";

import HomeOfferSkeleton from "./homeOffer";
import HomeCategories_baseOnPriceSkeleton from "./homeCategoriesBaseOnPrice";
import CustomerClubSkeleton from "./customerClub";
import GiftCardBannerSkeleton from "./giftCardBanner";
import HomeGiftsSkeleton from "./homeGifts";
import InstagramPostsSkeleteon from "./instagramPosts";

export default function HomePageSkeleton() {
  return (
    <>
      <BannerSkeleton />
      <JewelryCategorSkeleton />
      <HomeAdsSkeleton />
      <HomeOfferSkeleton />
      <HomeCategories_baseOnPriceSkeleton />
      <CustomerClubSkeleton />
      <GiftCardBannerSkeleton />
      <HomeGiftsSkeleton />
      <InstagramPostsSkeleteon />
    </>
  );
}
