import { icon } from "../../libs/interface/icon";
import Link from "next/link";
import React from "react";

export default function Close({ className, style, onClick }: icon) {
  return (
    <div onClick={onClick}>
      <svg
        className={className}
        style={style}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.7726 8.28772L8.28728 16.773C7.99737 17.0629 7.51653 17.0629 7.22662 16.773C6.93671 16.4831 6.93671 16.0023 7.22662 15.7123L15.7119 7.22706C16.0018 6.93715 16.4826 6.93715 16.7726 7.22706C17.0625 7.51698 17.0625 7.99781 16.7726 8.28772Z"
          fill="currentColor"
        />
        <path
          d="M16.7726 16.7729C16.4826 17.0628 16.0018 17.0628 15.7119 16.7729L7.22662 8.28765C6.93671 7.99774 6.93671 7.51691 7.22662 7.22699C7.51653 6.93708 7.99737 6.93708 8.28728 7.22699L16.7726 15.7123C17.0625 16.0022 17.0625 16.483 16.7726 16.7729Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}
