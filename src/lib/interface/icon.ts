import React, { MouseEvent } from "react";

export interface icon {
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
  onMouseEnter?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
}
