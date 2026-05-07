"use client";

import React, { useEffect, useState } from "react";
import DeskLayout from "../userAccount/layout/desk";
import MobileLayout from "../userAccount/layout/mobile";

export default function UserPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {windowWidth > 768 ? (
        <>
          <DeskLayout>{children}</DeskLayout>
        </>
      ) : (
        <>
          <MobileLayout>{children}</MobileLayout>
        </>
      )}
    </>
  );
}
