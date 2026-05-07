interface Product {
  id: number;
  name: string;
  short_desc: string;
  full_desc: string;
  image?: string | null; // `image` is optional, as it's marked with `?` in the model
  images?: any; // Assuming `Json` from Prisma maps to `any`
  related_products?: any; // Assuming `Json` from Prisma maps to `any`
  cross_Sells?: any; // Assuming `Json` from Prisma maps to `any`
  sku?: string | null; // `sku` is optional
  weight: number; // Assuming `Decimal` maps to `number` or can be a custom type
  wages: number;
  fixed_price: number; // `Decimal(8, 2)` maps to `number` or can be a custom type
  collection?: string | null; // Optional
  cover_type: string;
  suitable_for: string;
  material: string;
  material_type: string;
  count: number;
  product_parent?: number | null; // `product_parent` is optional
  category_id?: number | null; // `category_id` is optional
  averageRating: number;
  status: string; // Assuming `Status` is an enum or a string
  ProductType: string; // Assuming `ProductType` is an enum or a string
  product_status: string; // Assuming `ProductStatus` is an enum or a string
  created_at: Date;
  updated_at: Date;
  attributes?: any; // Assuming `ProductAttribute[]` maps to an array of any or specific type
}

interface previousValueType {
  id: string;
  name: string;
  short_desc: string;
  full_desc: string;
  image?: string | null; // `image` is optional, as it's marked with `?` in the model

  count: number | string;
  averageRating: number | string;
  cover_type: string;
  suitable_for: string;
  // --------------------------
  material_type: string;
  material: string;
  category_id: number | null;

  fixed_price: string;
  // ------------Array----------------
  category: any;
  images?: any;
  cross_Sells: any;
  related_products: any;
  collection: any;
  tags: any;
  variations: any;
  productCollection: any;

  // --------------Date--------------
  created_at: string;
  updated_at: string;

  // ------------delte------------------
  product_status: string;
  sku?: string | null; // `sku` is optional
  wages: number | string;
  weight: string;
  price: string;
  length: string;
  color: string;
  size: string;
}

export type { Product, previousValueType };
