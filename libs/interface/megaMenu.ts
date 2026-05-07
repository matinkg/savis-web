interface MenuItem {
  id: string;
  name: string;
  link: string;
  subMenu: {
    categoryName: string;
    items: {
      name: string;
      link: string;
    }[];
  }[];
  ads?: {
    id: string;
    img: string;
    title: string;
    link: string;
  }[];
}

interface megaMenuProps {
  status: boolean;
  data: any;
  ads: any;
}

export type { MenuItem, megaMenuProps };
