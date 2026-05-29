"use client";
import React from "react";
import Banner from "../banner";
import JewelryCategories from "../JewelryCategories";
import HomeAds from "../ads-home";
import HomeOffer from "../offer";
import HomeCategories_baseOnPrice from "../price-categories";
import CustomerClub from "../customerClub";
import GiftCardBanner from "../banner-giftCard";
import HomeGifts from "../gifts";
import InstagramPosts from "@/components/_modules/instagram";
import useSettingOperation from "./hook/setting/useOperation";
import HomePageSkeleton from "../../tailwind-css-skeleton/home-page";

export default function Index() {
  const {
    HomeBannerData,
    savisCats,
    HomeAdsData,
    HomeCategories_baseOnPriceData,
    customerClubHomeData,
    giftCardBannerData,
    loading,
    gifts,
    savisOffers
  } = useSettingOperation();

  return (
    <>
      {loading ? (
        <HomePageSkeleton />
      ) : (
        <>
          <Banner HomeBannerData={HomeBannerData} />
          <JewelryCategories savisCats={savisCats} />

          <HomeAds HomeAdsData={HomeAdsData} />
          <HomeOffer savisOffers={savisOffers} />
          <HomeCategories_baseOnPrice
            HomeCategories_baseOnPriceData={HomeCategories_baseOnPriceData}
          />
          <CustomerClub customerClubHomeData={customerClubHomeData} />
          <GiftCardBanner giftCardBannerData={giftCardBannerData} />
          <HomeGifts gifts={gifts} />
          <InstagramPosts className="hidden md:grid mx-auto my-10 w-[91.12%] lg:my-[60px] lg:w-[91.67%] 4xl:w-[85%]" />
        </>
      )}
    </>
  );
}
