import { SearchProps } from "../../../../libs/interface/search";
import React from "react";

export default function SearchInput({
  className,
  value,
  children,
  placeholder,
  inputStyle,
  onClick,
  onChange,
  onKeyDown,
}: SearchProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        style={inputStyle}
        value={value ?? ""}
        className={`h-full w-full border-none px-2 text-white outline-none`}
        onClick={onClick}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />

      {children}
    </div>
  );
}
