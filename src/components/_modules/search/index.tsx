import { SearchProps } from "../../../../libs/interface/search";
import React from "react";

export default function SearchInput({
  className,

  children,
  placeholder,
  inputStyle,
  value,
  onClick,
  onChange,
  onKeyDown,
}: SearchProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        style={inputStyle}
        className={`h-full w-full border-none px-2 text-white outline-none`}
        onClick={onClick}
        placeholder={placeholder}
        value={value || ""}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {children}
    </div>
  );
}
