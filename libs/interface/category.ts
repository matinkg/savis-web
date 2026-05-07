interface Category {
  id: any;
  name?: string;
  slug: string;
  parent_id: number | null;
  parent?: { name: string } | null;
  children?: Category[];
  isShowHome?: boolean;
  image?: string;
  image_title?: string;
}

interface CategoryProps {
  initialCategories: any;
}

export type { Category, CategoryProps };
