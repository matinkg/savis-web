interface Category {
  id: number;
  name?: string;
  slug: string;
  parent_id: number | null;
  parent?: { name: string } | null;
  children?: Category[];
}

interface CategoryProps {
  initialCategories: Category[];
}

export type { Category, CategoryProps };
