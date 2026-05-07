interface navMenuProps {
  showNavMenu: any;
  setShowNavMenu: React.Dispatch<React.SetStateAction<any>>;
}

interface ExtraSubMenuItem {
  name: string;
  link: string;
}

interface SubMenuItem {
  categoryName: string;
  items: any[]; // You can specify the type of items array
}

interface SubMenuData {
  id: string;
  name: string;
  link: string;
  subMenu: SubMenuItem[];
}

interface SubMenuState {
  status: boolean;
  data: SubMenuData;
}

export type { navMenuProps, ExtraSubMenuItem, SubMenuState };
