interface Blog {
  id: string;
  name?: string;
  created_at?: Date;
}

interface BlogProps {
  initialBlogs: Blog[];
}

export type { Blog, BlogProps };
