export interface DataType {
  id: string;
  name: string;
  image: string;
  description: string;
  method: string;
  price: number;
  stock: number;
  gift_code: string;
  category_id: string;
  packaging_id: any;
  created_at: string;
  updated_at: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}
