import { userInfoType } from "@/libs/interface";

type dataSettingType = settingType[];

interface settingType {
  id: number;
  key: string;
  value: ValueSetting;
  created_at: string;
  updated_at: string;
}

interface ValueSetting {
  "btn-banner-home"?: string;
  "link-banner-home"?: string;
  "btn-banner-home-1"?: string;
  "btn-banner-home-2"?: string;
  "image-banner-home"?: string;
  "title-banner-home"?: string;
  "link-banner-home-1"?: string;
  "subTitle-banner-home"?: string;
  "btn-link-banner-home-2"?: string;
  "btn-ads-home"?: string;
  "link-ads-home"?: string;
  "image-ads-home"?: string;
  "title-ads-home"?: string;
  "subTitle-ads-home"?: string;
  "btn-ads-top-left"?: string;
  "btn-ads-top-right"?: string;
  "link-ads-top-left"?: string;
  "image-ads-top-left"?: string;
  "link-ads-top-right"?: string;
  "title-ads-top-left"?: string;
  "btn-ads-bottom-left"?: string;
  "image-ads-top-right"?: string;
  "title-ads-top-right"?: string;
  "btn-ads-bottom-right"?: string;
  "link-ads-bottom-left"?: string;
  "btn-ads-bottom-center"?: string;
  "image-ads-bottom-left"?: string;
  "link-ads-bottom-right"?: string;
  "title-ads-bottom-left"?: string;
  "image-ads-bottom-right"?: string;
  "link-ads-bottom-center"?: string;
  "link-ads-category-left"?: string;
  "title-ads-bottom-right"?: string;
  "image-ads-bottom-center"?: string;
  "image-ads-category-left"?: string;
  "title-ads-bottom-center"?: string;
  "title-ads-category-left"?: string;
  "link-ads-category-bottom"?: string;
  "image-ads-category-bottom"?: string;
  "title-ads-category-bottom"?: string;
  "link-ads-category-top-left"?: string;
  "image-ads-category-top-left"?: string;
  "link-ads-category-top-right"?: string;
  "title-ads-category-top-left"?: string;
  "image-ads-category-top-right"?: string;
  "title-ads-category-top-right"?: string;
  "btn-customerClub-home"?: string;
  "link-customerClub-home"?: string;
  "image-customerClub-home"?: string;
  "title-customerClub-home"?: string;
  "subTitle-customerClub-home"?: string;
}

interface createContextType {
  userInfo: userInfoType;
  loading: boolean;
  fetchUserInfo: any;
}

export type { dataSettingType, ValueSetting, createContextType };
