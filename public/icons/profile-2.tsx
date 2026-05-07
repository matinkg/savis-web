import { icon } from "../../libs/interface/icon";
import Link from "next/link";
import React from "react";

export default function ProfileIcon({ className, style, href }: icon) {
  return (
    <Link href={href ? href : ""}>
      <svg
        className={className}
        style={style}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    </Link>
  );
}
