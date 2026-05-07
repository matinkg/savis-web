import { ReactNode } from "react";

interface navMenuProps {
  showNavMenu: any;
  setShowNavMenu: React.Dispatch<React.SetStateAction<any>>;
  data: any;
}

interface ExtraSubMenuItem {
  title: string;
  href: string;
}

interface SubMenuItem {
  title: ReactNode;
  href: string;
  children: ExtraSubMenuItem[];
}

interface SubMenuData {
  id: string;
  title: string;
  href: string;
  children: SubMenuItem[];
}

interface SubMenuState {
  status: boolean;
  data: SubMenuData;
}

export type { navMenuProps, ExtraSubMenuItem, SubMenuState };
