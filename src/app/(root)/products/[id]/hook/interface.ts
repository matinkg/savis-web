export interface productDetailsType {
  id: string;
  sku: string;
  name: string;
  short_desc: string;
  full_desc: string;
  image: string;
  images: Image[];
  related_products: any[];
  cross_Sells: any[];
  cover_type: string;
  suitable_for: string;
  material: string;
  material_type: string;
  count: number;
  category_id: number;
  price: number;
  fixed_price: number;
  weight: number;
  wages: number;
  length: string;
  isFavorite: boolean;
  averageRating: number;
  created_at: string;
  updated_at: string;
  product_status: string;
  category: Category;
  variations: Variation[];
  productCollection: ProductCollection[];
  uniqueSizes: string[];
  uniqueColors: string[];
  sizeColorData: SizeColorDaum[];
}

export interface Image {
  fileUrl: string;
  fileName: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: any;
  isShowHome: boolean;
  image: string;
  image_title: string;
  created_at: string;
  updated_at: string;
}

export interface Variation {
  id: number;
  name: string;
  price: number;
  size: string;
  colors: Colors;
  product_status: ProductStatus;
  fixed_price: number;
  weight: number;
  wages: number;
  sku: string;
  stockQuantity: number;
}

export interface Colors {
  id: number;
  code: string;
  name: string;
}

export interface ProductStatus {
  id: number;
  key: string;
  name: string;
}

export interface ProductCollection {
  id: string;
  product_id: string;
  collection_id: string;
  created_at: string;
  updated_at: string;
  collection: Collection;
}

export interface Collection {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SizeColorDaum {
  size: string;
  colors: Color[];
}

export interface Color {
  color_name: string;
  color_code: string;
  name: string;
  price: number;
  product_status: ProductStatus2;
  fixed_price: number;
  weight: number;
  wages: number;
  sku: string;
  stockQuantity: number;
}

export interface ProductStatus2 {
  id: number;
  key: string;
  name: string;
}
