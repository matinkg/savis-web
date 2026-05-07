import Link from "next/link";
import React from "react";

export default function SearchResult({ name, link }: { name: string, link: string }) {
  return (
    <Link className="bg-white/20 lg:bg-gray-250 h-10 flex items-center justify-between p-2.5 " href={link ?? ""}>
      <span className="font-peyda-400 text-base text-white lg:text-slate-1000">
        {name}
      </span>
      <svg
        className="text-white lg:text-slate-1000"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.5 22.75H20.5C20.91 22.75 21.25 22.41 21.25 22C21.25 21.59 20.91 21.25 20.5 21.25H3.5C3.09 21.25 2.75 21.59 2.75 22C2.75 22.41 3.09 22.75 3.5 22.75Z"
          fill="currentColor"
        />
        <path
          d="M5.00006 18.2499C5.19006 18.2499 5.38006 18.1799 5.53006 18.0299L19.5301 4.02994C19.8201 3.73994 19.8201 3.25994 19.5301 2.96994C19.2401 2.67994 18.7601 2.67994 18.4701 2.96994L4.47006 16.9699C4.18006 17.2599 4.18006 17.7399 4.47006 18.0299C4.62006 18.1799 4.81006 18.2499 5.00006 18.2499Z"
          fill="currentColor"
        />
        <path
          d="M19 14.52C19.41 14.52 19.75 14.18 19.75 13.77V3.5C19.75 3.09 19.41 2.75 19 2.75H8.73C8.32 2.75 7.98 3.09 7.98 3.5C7.98 3.91 8.32 4.25 8.73 4.25H18.25V13.77C18.25 14.18 18.59 14.52 19 14.52Z"
          fill="currentColor"
        />
      </svg>
    </Link>
  );
}
