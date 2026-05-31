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
