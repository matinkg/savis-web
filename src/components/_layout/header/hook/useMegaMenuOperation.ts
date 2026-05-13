import { megaMenuProps } from "@/libs/interface/megaMenu";
import { useEffect, useRef, useState } from "react";

export default function useMegaMenuOperation() {
  const [bgColor, setBgColor] = useState(false);
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState<megaMenuProps>({
    status: false,
    data: [],
    ads: null,
  });

  // console.log(noFixed);

  const [showSearchModal, setShowSearchModal] = useState(false);
  // ----------------------------for close , when click out side of mega menu-----------------------------------
  const windowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // console.log("Window Ref:", windowRef.current);
      // console.log("Clicked Target:", target);
      if (windowRef.current && !windowRef.current.contains(target)) {
        // Click outside the window
        // Close the window
        setShowMegaMenu({
          status: false,
          data: [],
          ads: null,
        });
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // ----------------------------for close , when click out side of mega menu-----------------------------------

  useEffect(() => {
    function handleScroll() {
      if (document.documentElement.scrollTop === 0) {
        setBgColor(false);
      } else {
        setBgColor(true);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------------------------------------------------------------------------------

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      // Check if the click is outside of the operationStyle div
      if (!event.target.closest(".searchBox")) {
        // Set activeSetting.status to false
        setShowSearchModal(false);
      }
    };

    // Add event listener for click on the body
    document.body.addEventListener("click", handleClickOutside);

    // Remove event listener on cleanup
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [showSearchModal, setShowSearchModal]);
  // =================================== for handel overflow when open nav menu ==========================================

  useEffect(() => {
    if (showNavMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showNavMenu]);

  // console.log(noFixed);

  return {
    bgColor,
    setBgColor,
    showNavMenu,
    setShowNavMenu,
    showMegaMenu,
    setShowMegaMenu,
    windowRef,
    setShowSearchModal,
    showSearchModal,
  };
}
