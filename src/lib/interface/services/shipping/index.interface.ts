export interface ProvinceResponseProps {
  data: ProvinceProps[];
}

export interface ProvinceProps {
  id: number;
  title: string;
  slug: string;
}

export interface ProvinceCitiesResponseProps {
  data: ProvinceCitiesProps[];
}

export interface ProvinceCitiesProps {
  id: number;
  title: string;
  slug: string;
  province_id: number;
}

export interface ShippingOptionsResponseProps {
  data: ShippingOptionProps[];
  requires_shipping: boolean;
}

export interface ShippingOptionProps {
  code: string;
  title: string;
  price: number;
  base_price: number;
  is_free: boolean;
}
