import { icon } from "@/libs/interface/icon";
import React from "react";

export default function OutofStock({
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: icon) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    ></div>
  );
}
