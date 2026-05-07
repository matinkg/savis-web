interface Tag {
  id: number;
  name?: string;
  created_at?: Date;
}

interface TagProps {
  initialTags: Tag[];
}

export type { Tag, TagProps };
