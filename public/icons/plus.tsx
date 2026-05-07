import { icon } from "../../libs/interface/icon";
import React from "react";

export default function Plus({ className, style, onClick }: icon) {
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
      <path
        d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
        fill="currentColor"
      />
    </svg>
  );
}
