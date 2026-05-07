import { icon } from "../../libs/interface/icon";
import React from "react";

export default function Minus({ className, style, onClick }: icon) {
  return (
    <svg
      onClick={onClick}
      className={className}
      style={style}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M0 10h24v4h-24z" fill="currentColor" />
    </svg>
  );
}
