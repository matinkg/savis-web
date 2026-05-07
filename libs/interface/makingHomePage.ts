type propSettingType = {
  previousValue?: any;
  data?: any;
  id?: number;
};

interface SettingType {
  key: string;
  value: any;
  id?: number;
}
interface SivsOfferType {
  id: string;
  title: any;
  content: [];
}

type previousValuePropsType = {
  previousValue: any;
};

type JewelryTypes = {
  id: any;
  name?: string;
  image: string;
  svg: string;
  url_direct: string;
  parent_id: string | null;
  parent?: { name: string } | null;
  children?: JewelryTypes[];
};

type jewelryTypesProps = {
  initialJewelryTypes: any;
};
export type {
  propSettingType,
  SettingType,
  previousValuePropsType,
  jewelryTypesProps,
  JewelryTypes,
  SivsOfferType,
};
