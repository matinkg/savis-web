import { icon } from "../../libs/interface/icon";
import React from "react";

export default function ArrowDown({
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
    >
      <svg
        className={className}
        style={style}
        viewBox="0 0 19 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.49996 12.6C8.94579 12.6 8.39162 12.3975 7.97204 12L2.81037 7.11001C2.58079 6.89251 2.58079 6.53251 2.81037 6.31501C3.03995 6.09751 3.41995 6.09751 3.64954 6.31501L8.8112 11.205C9.1912 11.565 9.8087 11.565 10.1887 11.205L15.3504 6.31501C15.58 6.09751 15.96 6.09751 16.1895 6.31501C16.4191 6.53251 16.4191 6.89251 16.1895 7.11001L11.0279 12C10.6083 12.3975 10.0541 12.6 9.49996 12.6Z"
          fill="currentColor"
          fillOpacity="0.4"
        />
      </svg>
    </div>
  );
}
