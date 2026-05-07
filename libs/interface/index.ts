export * from "./product";

type userInfoType = {
  phone: string;
  role: string;
  id: string;
  address: string;
  email: string;
  first_name: string;
  last_name: string;
  nickname: string;
  city: any;
  province: any;
  postal_code: string;
};

interface selectedColorDataType {
  color_name: string;
  color_code: string;
  name: string;
  product_status: ProductStatus;
  sku: string;
  price: number;
  fixed_price: number;
  weight: number;
  wages: number;
  stockQuantity: number;
}

interface ProductStatus {
  id: number;
  key: string;
  name: string;
}
export type { userInfoType, selectedColorDataType };
