import { ButtonProps } from "../../../../libs/interface/button";
import React from "react";

export default function Button({
  className,
  style,
  children,
  disabled,
  onClick,
  type,
}: ButtonProps) {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`capitalize outline-none ${className}`}
        style={style}
      >
        {children}
      </button>
    </>
  );
}
