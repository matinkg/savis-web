import { icon } from "../../libs/interface/icon";
import Link from "next/link";
import React from "react";

export default function ArrowLeftlessLine({ className, style, href }: icon) {
  return (
    <Link href={href ? href : ""}>
      <svg
        className={className}
        style={style}
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.68172 15.5021C6.53922 15.5021 6.39672 15.4496 6.28422 15.3371C6.06672 15.1196 6.06672 14.7596 6.28422 14.5421L11.1742 9.65215C11.5342 9.29215 11.5342 8.70715 11.1742 8.34715L6.28422 3.45715C6.06672 3.23965 6.06672 2.87965 6.28422 2.66215C6.50172 2.44465 6.86172 2.44465 7.07922 2.66215L11.9692 7.55215C12.3517 7.93465 12.5692 8.45215 12.5692 8.99965C12.5692 9.54715 12.3592 10.0646 11.9692 10.4471L7.07922 15.3371C6.96672 15.4421 6.82422 15.5021 6.68172 15.5021Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
}
